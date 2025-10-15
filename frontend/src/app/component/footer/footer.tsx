"use client";

import Link from "next/link";
import styles from "./footer.module.css";
import { Github } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div className={styles.brand}>
            <img src="/logo.png" alt="Upblit logo" className={styles.logo} />
            <span className={styles.brandName}>Upblit</span>
          </div>
          <p className={styles.tagline}>
            Open-source auto-deployment and build orchestration for modern fullstack.
          </p>
        </div>

        <div className={styles.links}>
          <div className={styles.group}>
            <div className={styles.groupTitle}>Product</div>
            <Link href="/product" className={styles.link}>Overview</Link>
            <Link href="/pricing" className={styles.link}>Pricing</Link>
            <Link href="/faq" className={styles.link}>FAQ</Link>
          </div>

          <div className={styles.group}>
            <div className={styles.groupTitle}>Developer</div>
            <Link href="/developer" className={styles.link}>Docs</Link>
            <a href="https://github.com/Debashismitra01/Upblit" target="_blank" rel="noreferrer" className={styles.link}>GitHub</a>
            <Link href="/new" className={styles.link}>Start a Deploy</Link>
          </div>

          <div className={styles.group}>
            <div className={styles.groupTitle}>Company</div>
            <Link href="/company" className={styles.link}>About</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
            <Link href="/dashboard" className={styles.link}>Dashboard</Link>
          </div>

          <div className={styles.group}>
            <div className={styles.groupTitle}>Resources</div>
            <Link href="/login" className={styles.link}>Login</Link>
            <Link href="/settings" className={styles.link}>Settings</Link>
            <a href="/sitemap.xml" className={styles.link}>Sitemap</a>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.bottomMeta}>
            <span className={styles.legal}>© {year} Upblit. All rights reserved.</span>
            <Link href="/terms" className={styles.metaLink}>Terms</Link>
            <Link href="/privacy" className={styles.metaLink}>Privacy</Link>
            <Link href="/cookies" className={styles.metaLink}>Cookies</Link>
          </div>
          <div className={styles.socials}>
            <a href="https://github.com/Debashismitra01/Upblit" target="_blank" rel="noreferrer" aria-label="GitHub" className={styles.socialBtn}>
              <Github className={styles.socialIcon} />
            </a>
            <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X" className={styles.socialBtn}>
              <svg viewBox="0 0 24 24" className={styles.socialIcon} aria-hidden="true">
                <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </a>
            <a href="https://discord.gg/eucMQ4Bj" target="_blank" rel="noreferrer" aria-label="Discord" className={styles.socialBtn}>
              <svg viewBox="0 0 24 24" className={styles.socialIcon} aria-hidden="true">
                <path fill="currentColor" d="M20.317 4.369A19.791 19.791 0 0016.558 3c-.2.36-.43.848-.59 1.23a17.945 17.945 0 00-4.936 0c-.16-.382-.39-.87-.59-1.23A19.736 19.736 0 003.68 4.37C2.04 7.1 1.36 9.73 1.5 12.32a19.933 19.933 0 006.107 3.12c.25-.34.47-.704.66-1.09a12.9 12.9 0 01-1.03-.5c.09-.07.18-.15.27-.23a13.49 13.49 0 0011.01 0c.09.08.18.16.27.23-.33.2-.67.37-1.03.5.19.39.41.75.66 1.09a19.933 19.933 0 006.107-3.12c.17-3.2-.55-5.83-2.207-7.95zM9.12 12.98c-1.01 0-1.84-.93-1.84-2.07 0-1.13.82-2.06 1.84-2.06s1.85.93 1.84 2.06c0 1.14-.83 2.07-1.84 2.07zm5.76 0c-1.01 0-1.84-.93-1.84-2.07 0-1.13.82-2.06 1.84-2.06s1.84.93 1.84 2.06c0 1.14-.82 2.07-1.84 2.07z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
