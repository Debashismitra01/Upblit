'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './page.module.css';

const POPULAR_FRAMEWORKS = [
    // Backend Frameworks
    { value: 'spring-boot', label: 'Spring Boot (Java)', category: 'Backend' },
    { value: 'nodejs', label: 'Node.js', category: 'Backend' },
    { value: 'express', label: 'Express.js', category: 'Backend' },
    { value: 'nestjs', label: 'NestJS', category: 'Backend' },
    { value: 'django', label: 'Django (Python)', category: 'Backend' },
    { value: 'flask', label: 'Flask (Python)', category: 'Backend' },
    { value: 'fastapi', label: 'FastAPI (Python)', category: 'Backend' },
    { value: 'laravel', label: 'Laravel (PHP)', category: 'Backend' },
    { value: 'ruby-on-rails', label: 'Ruby on Rails', category: 'Backend' },
    { value: 'aspnet', label: 'ASP.NET Core', category: 'Backend' },
    { value: 'go-gin', label: 'Gin (Go)', category: 'Backend' },

    // Frontend Frameworks
    { value: 'react', label: 'React', category: 'Frontend' },
    { value: 'nextjs', label: 'Next.js', category: 'Frontend' },
    { value: 'vue', label: 'Vue.js', category: 'Frontend' },
    { value: 'nuxt', label: 'Nuxt.js', category: 'Frontend' },
    { value: 'angular', label: 'Angular', category: 'Frontend' },
    { value: 'svelte', label: 'Svelte', category: 'Frontend' },
    { value: 'sveltekit', label: 'SvelteKit', category: 'Frontend' },
    { value: 'vite', label: 'Vite', category: 'Frontend' },
    { value: 'gatsby', label: 'Gatsby', category: 'Frontend' },
    { value: 'remix', label: 'Remix', category: 'Frontend' },
];

export default function NewApplicationPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id as string;

    const [applicationName, setApplicationName] = useState('');
    const [description, setDescription] = useState('');
    const [environment, setEnvironment] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');

    const applicationUri = `${process.env.NEXT_PUBLIC_API_URL}/applications`;
    const jwt = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

    const handleCreate = async () => {
        if (!applicationName) {
            setMessage('Please enter an application name');
            setMessageType('error');
            return;
        }

        if (!environment) {
            setMessage('Please select a framework/environment');
            setMessageType('error');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const applicationDTO = {
                name: applicationName,
                description: description || '',
                environment: environment,
                projectId: parseInt(projectId)
            };

            const res = await fetch(applicationUri, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                },
                body: JSON.stringify(applicationDTO)
            });

            const result = await res.json();
            if (res.ok) {
                setMessage('Application created successfully! Redirecting...');
                setMessageType('success');
                setTimeout(() => {
                    router.push(`/project/${projectId}`);
                }, 1500);
            } else {
                setMessage(result.message || 'Failed to create application');
                setMessageType('error');
            }
        } catch (err) {
            console.error('Error during application creation:', err);
            setMessage('Application creation failed. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    // Group frameworks by category
    const backendFrameworks = POPULAR_FRAMEWORKS.filter(f => f.category === 'Backend');
    const frontendFrameworks = POPULAR_FRAMEWORKS.filter(f => f.category === 'Frontend');

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <button
                        onClick={() => router.back()}
                        className={styles.backBtn}
                    >
                        ← Back
                    </button>
                    <h1 className={styles.title}>Create New Application</h1>
                    <p className={styles.subtitle}>
                        Add a new application to your project
                    </p>
                </div>

                <div className={styles.form}>
                    <div className={styles.section}>
                        <label className={styles.label}>
                            <span className={styles.labelText}>Application Name</span>
                            <span className={styles.labelSubtext}>
                                Choose a unique name for your application
                            </span>
                        </label>

                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                placeholder="my-awesome-app"
                                className={styles.input}
                                value={applicationName}
                                onChange={(e) => setApplicationName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.section}>
                        <label className={styles.label}>
                            <span className={styles.labelText}>Description (Optional)</span>
                            <span className={styles.labelSubtext}>
                                Brief description of what this application does
                            </span>
                        </label>

                        <div className={styles.inputGroup}>
                            <textarea
                                placeholder="A brief description of your application..."
                                className={styles.textarea}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                            />
                        </div>
                    </div>

                    <div className={styles.section}>
                        <label className={styles.label}>
                            <span className={styles.labelText}>Framework / Environment</span>
                            <span className={styles.labelSubtext}>
                                Select the framework or environment for your application
                            </span>
                        </label>

                        <div className={styles.inputGroup}>
                            <select
                                className={styles.select}
                                value={environment}
                                onChange={(e) => setEnvironment(e.target.value)}
                            >
                                <option value="">-- Select Framework --</option>

                                <optgroup label="Backend Frameworks">
                                    {backendFrameworks.map((framework) => (
                                        <option key={framework.value} value={framework.value}>
                                            {framework.label}
                                        </option>
                                    ))}
                                </optgroup>

                                <optgroup label="Frontend Frameworks">
                                    {frontendFrameworks.map((framework) => (
                                        <option key={framework.value} value={framework.value}>
                                            {framework.label}
                                        </option>
                                    ))}
                                </optgroup>
                            </select>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button
                            onClick={handleCreate}
                            className={`${styles.createBtn} ${loading ? styles.loading : ''
                                }`}
                            disabled={loading || !applicationName || !environment}
                        >
                            {loading ? (
                                <>
                                    <div className={styles.spinner}></div>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <span className={styles.createIcon}>🚀</span>
                                    Create Application
                                </>
                            )}
                        </button>
                    </div>

                    {message && (
                        <div className={`${styles.message} ${styles[messageType]}`}>
                            <span className={styles.messageIcon}>
                                {messageType === 'success' ? '✅' :
                                    messageType === 'error' ? '❌' : 'ℹ️'}
                            </span>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
