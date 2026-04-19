'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

interface Owner {
    id: number;
    githubId: string;
    username: string;
    email: string;
    avatarUrl: string;
    accessToken: string;
    lastLogin: string;
}

interface Project {
    id: number;
    name: string;
    createdAt: string;
    owner: Owner;
}

interface Application {
    id: string;
    name: string;
    createdAt: string;
}

export default function ProjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id as string;

    const [project, setProject] = useState<Project | null>(null);
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const projectUri = `${process.env.NEXT_PUBLIC_API_URL}/project/id?ProjectId=${projectId}`;
    const jwt = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                setLoading(true);
                const res = await fetch(projectUri, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });

                if (!res.ok) throw new Error('Failed to fetch project data');

                const data = await res.json();

                // Set project data
                setProject(data);

                // For now, applications array is empty until you have an endpoint for it
                // You can add applications endpoint later: /project/${projectId}/applications
                setApplications([]);
            } catch (err) {
                console.error('Failed to fetch project data:', err);
                setError('Failed to load project data');
            } finally {
                setLoading(false);
            }
        };

        if (jwt && projectId) {
            fetchProjectData();
        }
    }, [jwt, projectId]);

    const getAppIcon = (name: string) => {
        const firstLetter = name.charAt(0).toUpperCase();
        const colors = [
            '#6366f1', '#8b5cf6', '#ec4899', '#ef4444',
            '#f59e0b', '#10b981', '#06b6d4', '#3b82f6'
        ];
        const colorIndex = name.length % colors.length;

        return (
            <div
                className={styles.appIcon}
                style={{ backgroundColor: colors[colorIndex] }}
            >
                {firstLetter}
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button
                    onClick={() => router.push('/dashboard')}
                    className={styles.backBtn}
                >
                    ← Back to Dashboard
                </button>
                <h1 className={styles.title}>
                    {project ? project.name : 'Project Applications'}
                </h1>
                <p className={styles.subtitle}>
                    {project ? (
                        <>
                            Created on {new Date(project.createdAt).toLocaleDateString()} by{' '}
                            <strong>{project.owner.username}</strong>
                        </>
                    ) : (
                        <>Loading project information...</>
                    )}
                </p>
            </div>

            <div className={styles.content}>
                <div className={styles.contentHeader}>
                    <h2 className={styles.sectionTitle}>Applications</h2>
                    <Link href={`/project/${projectId}/new-application`}>
                        <button className={styles.createBtn}>
                            <span className={styles.createIcon}>+</span>
                            Create New Application
                        </button>
                    </Link>
                </div>

                {loading ? (
                    <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        <p>Loading applications...</p>
                    </div>
                ) : error ? (
                    <div className={styles.error}>
                        <p>{error}</p>
                    </div>
                ) : applications.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>📱</div>
                        <h3>No applications yet</h3>
                        <p>Create your first application to get started</p>
                        <Link href={`/project/${projectId}/new-application`}>
                            <button className={styles.emptyCreateBtn}>
                                Create Application
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className={styles.appGrid}>
                        {applications.map((app) => (
                            <div key={app.id} className={styles.appCard}>
                                <div className={styles.appCardHeader}>
                                    <div className={styles.appInfo}>
                                        {getAppIcon(app.name)}
                                        <div className={styles.appDetails}>
                                            <h3 className={styles.appName}>{app.name}</h3>
                                            <p className={styles.appUpdate}>
                                                Created: {new Date(app.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <button className={styles.moreBtn}>⋯</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
