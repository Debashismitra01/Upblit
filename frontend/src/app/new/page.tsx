'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../component/navbar/navbar';
import styles from './addon.module.css';

interface Repository {
  name: string;
  clone_url: string;
  private: boolean;
  description?: string;
  language?: string;
  updated_at?: string;
}

export default function NewDeployPage() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [projectName, setProjectName] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingRepos, setFetchingRepos] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const router = useRouter();
  const repouri=`${process.env.NEXT_PUBLIC_API_URL}/repos`;
  const deployxuri=`${process.env.NEXT_PUBLIC_API_URL}/deployx`;
  const jwt = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setFetchingRepos(true);
        const res = await fetch(repouri, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
        const data = await res.json();
        const privateRepos = data.filter((repo: Repository) => repo.private);
        setRepos(privateRepos);
      } catch (err) {
        console.error('Failed to fetch repos:', err);
        setMessage('Failed to fetch repositories');
        setMessageType('error');
      } finally {
        setFetchingRepos(false);
      }
    };

    if (jwt) {
      fetchRepos();
    }
  }, [jwt]);

  // Auto-generate project name when repo is selected
  useEffect(() => {
    if (selectedRepo && !projectName) {
      setProjectName(selectedRepo.name.toLowerCase().replace(/[^a-z0-9-]/g, '-'));
    }
  }, [selectedRepo, projectName]);

  const handleDeploy = async () => {
    if (!selectedRepo || !projectName) {
      setMessage('Please select a repository and enter a project name');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');
    
    try {
      const res = await fetch(deployxuri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`
        },
        body: JSON.stringify({
          name: projectName,
          clone_url: selectedRepo.clone_url,
          privacy: selectedRepo.private,
          port: 3024
        })
      });

      const result = await res.json();
      if (res.ok) {
        setMessage('Deployment started successfully! Redirecting to dashboard...');
        setMessageType('success');
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setMessage(result.message || 'Failed to deploy project');
        setMessageType('error');
      }
    } catch (err) {
      console.error('Error during deploy:', err);
      setMessage('Deployment failed. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const getLanguageIcon = (language: string) => {
    const icons: { [key: string]: string } = {
      'JavaScript': '🟨',
      'TypeScript': '🔵',
      'Python': '🐍',
      'Java': '☕',
      'React': '⚛️',
      'Vue': '💚',
      'Angular': '🔺',
      'Node.js': '💚',
      'HTML': '🌐',
      'CSS': '🎨',
      default: '📁'
    };
    return icons[language] || icons.default;
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
            <h1 className={styles.title}>Deploy New Project</h1>
            <p className={styles.subtitle}>
              Select a repository and deploy it to your infrastructure
            </p>
          </div>

          <div className={styles.deployForm}>
            <div className={styles.section}>
              <label className={styles.label}>
                <span className={styles.labelText}>Project Name</span>
                <span className={styles.labelSubtext}>
                  This will be used as your deployment URL
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
            <div className={styles.section}>
              <label className={styles.label}>
                <span className={styles.labelText}>Repository</span>
                <span className={styles.labelSubtext}>
                  Choose from your private repositories
                </span>
              </label>
              
              {fetchingRepos ? (
                <div className={styles.loading}>
                  <div className={styles.spinner}></div>
                  <span>Loading repositories...</span>
                </div>
              ) : (
                <div className={styles.repoGrid}>
                  {repos.length === 0 ? (
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>📦</div>
                      <p>No private repositories found</p>
                      <p className={styles.emptySubtext}>
                        Make sure you have private repositories in your GitHub account
                      </p>
                    </div>
                  ) : (
                    repos.map((repo) => (
                      <div
                        key={repo.clone_url}
                        className={`${styles.repoCard} ${
                          selectedRepo?.name === repo.name ? styles.selected : ''
                        }`}
                        onClick={() => setSelectedRepo(repo)}
                      >
                        <div className={styles.repoHeader}>
                          <span className={styles.repoIcon}>
                            {getLanguageIcon(repo.language || 'default')}
                          </span>
                          <div className={styles.repoInfo}>
                            <h3 className={styles.repoName}>{repo.name}</h3>
                            <p className={styles.repoDescription}>
                              {repo.description || 'No description available'}
                            </p>
                          </div>
                          <div className={styles.repoMeta}>
                            {repo.language && (
                              <span className={styles.language}>{repo.language}</span>
                            )}
                            {repo.private == "true" && (
                                <span className={styles.privacy}>🔒 Private</span>
                          )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            

            <div className={styles.actions}>
              <button
                onClick={handleDeploy}
                className={`${styles.deployBtn} ${
                  loading ? styles.loading : ''
                }`}
                disabled={loading || !selectedRepo || !projectName}
              >
                {loading ? (
                  <>
                    <div className={styles.spinner}></div>
                    Deploying...
                  </>
                ) : (
                  <>
                    <span className={styles.deployIcon}>🚀</span>
                    Deploy Project
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