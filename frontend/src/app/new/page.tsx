'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../component/navbar/navbar';
import styles from './addon.module.css';

export default function NewDeployPage() {
  const [projectName, setProjectName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const router = useRouter();
  const deployxuri = `${process.env.NEXT_PUBLIC_API_URL}/project`;
  const jwt = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const handleDeploy = async () => {
    if (!projectName) {
      setMessage('Please enter a project name');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(deployxuri, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          Authorization: `Bearer ${jwt}`
        },
        body: projectName
      });

      const result = await res.json();
      if (res.ok) {
        setMessage('Project created successfully! Redirecting to dashboard...');
        setMessageType('success');
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setMessage(result.message || 'Failed to create project');
        setMessageType('error');
      }
    } catch (err) {
      console.error('Error during project creation:', err);
      setMessage('Project creation failed. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.header}>
            <button
              onClick={() => router.back()}
              className={styles.backBtn}
            >
              ← Back
            </button>
            <h1 className={styles.title}>Create New Project</h1>
            <p className={styles.subtitle}>
              Enter a project name to create your new deployment
            </p>
          </div>

          <div className={styles.deployForm}>
            <div className={styles.section}>
              <label className={styles.label}>
                <span className={styles.labelText}>Project Name</span>
                <span className={styles.labelSubtext}>
                  Choose a unique name for your project
                </span>
              </label>

              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="my-awesome-project"
                  className={styles.input}
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <div className={styles.urlPreview}>
                  {projectName && (
                    <span className={styles.previewText}>
                      Will be available at: <strong>{projectName}.deployx.cloud</strong>
                    </span>
                  )}
                </div>
              </div>
            </div>



            <div className={styles.actions}>
              <button
                onClick={handleDeploy}
                className={`${styles.deployBtn} ${loading ? styles.loading : ''
                  }`}
                disabled={loading || !projectName}
              >
                {loading ? (
                  <>
                    <div className={styles.spinner}></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <span className={styles.deployIcon}>🚀</span>
                    Create Project
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
      </main>
    </div>
  );
}