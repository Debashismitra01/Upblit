import styles from './UsageStats.module.css';

export default function UsageStats() {
  const usageData = [
    {
      name: 'Edge Requests',
      current: '19K',
      total: '1M',
      percentage: 19
    },
    {
      name: 'Image Optimization - Transformations',
      current: '91',
      total: '5K',
      percentage: 1.8
    },
    {
      name: 'Fast Data Transfer',
      current: '762.19 MB',
      total: '100 GB',
      percentage: 0.76
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Usage</h3>
        <span className={styles.period}>Last 30 days</span>
        <button className={styles.upgradeBtn}>Upgrade</button>
      </div>

      <div className={styles.usageList}>
        {usageData.map((item, index) => (
          <div key={index} className={styles.usageItem}>
            <div className={styles.itemHeader}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemValues}>
                {item.current} / {item.total}
              </span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.expandBtn}>⌄</button>
    </div>
  );
}