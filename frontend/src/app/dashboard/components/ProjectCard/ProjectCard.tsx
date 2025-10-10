import Link from 'next/link';
import styles from './ProjectCard.module.css';

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

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#00d9ff';
      case 'building':
        return '#f59e0b';
      case 'error':
        return '#ef4444';
      default:
        return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ready';
      case 'building':
        return 'Building';
      case 'error':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  const getProjectIcon = (name: string) => {
    // Simple icon generation based on first letter
    const firstLetter = name.charAt(0).toUpperCase();
    const colors = [
      '#6366f1', '#8b5cf6', '#ec4899', '#ef4444',
      '#f59e0b', '#10b981', '#06b6d4', '#3b82f6'
    ];
    const colorIndex = name.length % colors.length;
    
    return (
      <div 
        className={styles.projectIcon}
        style={{ backgroundColor: colors[colorIndex] }}
      >
        {firstLetter}
      </div>
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.projectInfo}>
          {getProjectIcon(project.name)}
          <div className={styles.projectDetails}>
            <h3 className={styles.projectName}>{project.name}</h3>
            <p className={styles.projectDomain}>{project.domain}</p>
          </div>
        </div>
        
        <div className={styles.cardActions}>
          <Link 
            href={`${process.env.NEXT_PUBLIC_URL}:${project.port}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.visitBtn}
          >
            ↗
          </Link>
          <button className={styles.moreBtn}>⋯</button>
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.statusSection}>
          <div className={styles.statusRow}>
            <span 
              className={styles.statusDot}
              style={{ backgroundColor: getStatusColor(project.status) }}
            ></span>
            <span className={styles.statusText}>
              {getStatusText(project.status)}
            </span>
            <span className={styles.updateTime}>
              {project.lastUpdate} on 
              <span className={styles.branch}> 🌿 {project.branch}</span>
            </span>
          </div>
        </div>

        <div className={styles.projectLinks}>
          <div className={styles.linkRow}>
            <span className={styles.linkIcon}>📱</span>
            <span className={styles.linkText}>
              Debashismitra01/{project.name}
            </span>
            <button className={styles.linkAction}>↗</button>
          </div>
        </div>
      </div>
    </div>
  );
}