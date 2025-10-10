import styles from './RecentPreviews.module.css';

export default function RecentPreviews() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Recent Previews</h3>
      
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>👁</div>
        <p className={styles.emptyText}>
          Preview deployments that you have recently visited or created will appear here.
        </p>
      </div>
    </div>
  );
}