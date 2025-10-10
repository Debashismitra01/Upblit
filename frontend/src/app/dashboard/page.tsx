'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProjectCard from './components/ProjectCard/ProjectCard';
import UsageStats from './components/UsageStats/UsageStats';
import RecentPreviews from './components/RecentPreviews//RecentPreviews';
import Header from './components/Header/Header';
import styles from './Dashboard.module.css';

interface Project {
  id: string;
  name: string;
  domain: string;
  deployed: boolean;
  port: number;
  lastUpdate: string;
  branch: string;
  status: 'active' | 'building' | 'error';
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const dashboarduri=`${process.env.NEXT_PUBLIC_API_URL}/dashboard`
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(dashboarduri, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        
        // Transform data to match our interface
        const transformedProjects = data.map((project: any) => ({
          ...project,
          domain: `${project.name}.vercel.app`,
          lastUpdate: new Date().toLocaleDateString(),
          branch: 'main',
          status: project.deployed ? 'active' : 'building'
        }));
        
        setProjects(transformedProjects);
      } catch (err) {
        console.error(err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <UsageStats />
          <RecentPreviews />
        </div>

        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <div className={styles.searchSection}>
              <input
                type="text"
                placeholder="Search Projects..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className={styles.viewControls}>
                <button className={styles.viewBtn}>☰</button>
                <button className={styles.viewBtn}>⊞</button>
                <button className={styles.viewBtn}>≡</button>
              </div>
            </div>
            
            <Link href="/new">
              <button className={styles.addButton}>Add New...</button>
            </Link>
          </div>

          <div className={styles.projectsSection}>
            <h2 className={styles.sectionTitle}>Projects</h2>
            
            {loading ? (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading projects...</p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📁</div>
                <p>No projects found.</p>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className={styles.clearSearch}
                  >
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              <div className={styles.projectGrid}>
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}