import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <div className={styles.logo}>
          <img src="/mascot.png" alt="logo" className={styles.logoIcon}/>
          <span className={styles.userName}>Debashis' projects</span>
          <span className={styles.plan}>Hobby</span>
        </div>


        <div className={styles.userSection}>
          <div className="relative flex items-center">
  <input
    placeholder="Search..."
    className="input shadow-lg text-xm focus:border-0.1 border-gray-300 px-5 py-1 rounded-xl w-56 transition-all focus:w-64 outline-none"
    name="search"
    type="search"
  />
  <svg
    className="size-6 text-gray-500 pb-0"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      strokeLinejoin="round"
      strokeLinecap="round"
    ></path>
  </svg>
</div>
          <button className={styles.feedbackBtn}>Feedback</button>
          <button className={styles.notificationBtn}>
   <svg viewBox="0 0 448 512" className={styles.bell}><path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path></svg>
</button>
          <div className={styles.userAvatar}>D</div>
        </div>
      </div>
      <div className={styles.navLinks}>
          <Link href="/overview" className={`${styles.navLink} ${styles.active}`}>
            Overview
          </Link>
          <Link href="/integrations" className={styles.navLink}>
            Integrations
          </Link>
          <Link href="/deployments" className={styles.navLink}>
            Deployments
          </Link>
          <Link href="/activity" className={styles.navLink}>
            Activity
          </Link>
          <Link href="/domains" className={styles.navLink}>
            Domains
          </Link>
          <Link href="/usage" className={styles.navLink}>
            Usage
          </Link>
          <Link href="/observability" className={styles.navLink}>
            Observability
          </Link>
          <Link href="/storage" className={styles.navLink}>
            Storage
          </Link>
          <Link href="/flags" className={styles.navLink}>
            Flags
          </Link>
          <Link href="/ai-gateway" className={styles.navLink}>
            AI Gateway
          </Link>
          <Link href="/support" className={styles.navLink}>
            Support
          </Link>
          <Link href="/settings" className={styles.navLink}>
            Settings
          </Link>
        </div>
    </header>
  );
}