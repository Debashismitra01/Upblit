export interface DashboardProject {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: "active" | "building" | "error";
}

export interface DashboardApplication {
  id: number | string;
  name: string;
  description: string;
  environment: string;
  createdAt: string;
}

export interface OrganizationSummary {
  id: number;
  name: string;
  description: string;
}

class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
const ENV_ORGANIZATION_ID = process.env.NEXT_PUBLIC_ORGANIZATION_ID ?? "";

function readStoredValue(key: string) {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(key);
}

export function getOrganizationId() {
  const fromStorage =
    readStoredValue("organizationId") ??
    readStoredValue("OrganizationId") ??
    readStoredValue("orgId");

  const value = fromStorage || ENV_ORGANIZATION_ID;
  return value ? Number(value) : null;
}

export function setActiveOrganizationId(id: number) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem("organizationId", String(id));
}

export function getAuthHeaders() {
  const token = readStoredValue("token");

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);

  Object.entries(getAuthHeaders()).forEach(([key, value]) => {
    headers.set(key, value);
  });

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new ApiError(response.status, message || `Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function toArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) {
    return value as T[];
  }

  if (value && typeof value === "object") {
    const maybeArray = Object.values(value).find(Array.isArray);
    if (Array.isArray(maybeArray)) {
      return maybeArray as T[];
    }
  }

  return [];
}

export function normalizeProject(project: Record<string, unknown>): DashboardProject {
  const id = Number(project.id ?? project.projectId ?? 0);
  const name = String(project.name ?? project.projectName ?? `Project ${id || ""}`.trim());
  const description = String(project.description ?? project.summary ?? "");
  const createdAt = String(
    project.createdAt ?? project.createdDate ?? project.updatedAt ?? new Date().toISOString()
  );
  const updatedAt = String(project.updatedAt ?? project.createdAt ?? createdAt);

  return {
    id,
    name,
    description,
    createdAt,
    updatedAt,
    status: "active",
  };
}

export function normalizeApplication(application: Record<string, unknown>): DashboardApplication {
  const id = (application.id as string | number | undefined) ?? "";
  const name = String(application.name ?? application.applicationName ?? "Untitled application");
  const description = String(application.description ?? "");
  const environment = String(application.environment ?? application.framework ?? "Unknown");
  const createdAt = String(
    application.createdAt ??
      application.createdDate ??
      application.updatedAt ??
      new Date().toISOString()
  );

  return {
    id,
    name,
    description,
    environment,
    createdAt,
  };
}

export function normalizeOrganization(
  organization: Record<string, unknown>
): OrganizationSummary {
  return {
    id: Number(organization.id ?? 0),
    name: String(organization.name ?? "Organization"),
    description: String(organization.description ?? ""),
  };
}

export async function fetchProjects(organizationId: number) {
  const result = await request<unknown>(`/project?OrganizationId=${organizationId}`);
  return toArray<Record<string, unknown>>(result).map(normalizeProject);
}

export async function fetchOrganizations() {
  let result: unknown;

  try {
    result = await request<unknown>("/org");
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return [];
    }

    throw error;
  }

  const organizations = toArray<Record<string, unknown>>(result);

  if (organizations.length > 0) {
    return organizations.map(normalizeOrganization);
  }

  if (result && typeof result === "object") {
    return [normalizeOrganization(result as Record<string, unknown>)];
  }

  return [];
}

export async function resolveOrganizationId() {
  const existingId = getOrganizationId();

  if (existingId) {
    return existingId;
  }

  const organizations = await fetchOrganizations();
  const resolvedId = organizations[0]?.id ?? null;

  if (resolvedId) {
    setActiveOrganizationId(resolvedId);
  }

  return resolvedId;
}

export async function createOrganization(payload: {
  name: string;
  description: string;
  file: File;
}) {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("description", payload.description);
  formData.append("file", payload.file);

  const result = await request<Record<string, unknown>>("/org", {
    method: "POST",
    body: formData,
  });

  const organization = normalizeOrganization(result);

  if (organization.id) {
    setActiveOrganizationId(organization.id);
  }

  return organization;
}

export async function fetchApplications(projectId: number) {
  const result = await request<unknown>(`/applications?projectId=${projectId}`);
  return toArray<Record<string, unknown>>(result).map(normalizeApplication);
}

export async function createProject(name: string, organizationId: number) {
  return request<Record<string, unknown>>(`/project?OrganizationId=${organizationId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(name),
  });
}

export async function createApplication(payload: {
  name: string;
  description: string;
  environment: string;
  organizationId: number;
  projectId: number;
}) {
  return request<Record<string, unknown>>("/applications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
