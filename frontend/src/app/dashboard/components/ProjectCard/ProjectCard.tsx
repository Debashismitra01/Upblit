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
    <Link href={`/project/${project.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.projectInfo}>
            {getProjectIcon(project.name)}
            <div className={styles.projectDetails}>
              <h3 className={styles.projectName}>{project.name}</h3>
            </div>
          </div>

          <div className={styles.cardActions}>
            <button className={styles.moreBtn} onClick={(e) => e.preventDefault()}>⋯</button>
          </div>
        </div>

        <div className={styles.cardContent}>
          <div className={styles.statusSection}>
            <div className={styles.statusRow}>
              <span className={styles.updateTime}>
                Last Updated on | {project.lastUpdate}
              </span>
            </div>
          </div>

          <div className={styles.projectLinks}>
            <div className={styles.linkRow}>
              <span className={styles.linkIcon}>📱</span>
              <span className={styles.linkText}>
                Debashismitra01/{project.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
