"use client"
import React from "react";
import styles from "./page.module.css";
import BG from "./component/background/background";
import Navbar from "./component/navbar/navbar";

export default function Hello() {
  return (
    <>
            <Navbar/>
      <div className={styles.page}>
        <BG/>

        <div className={styles.main}>
        <h1>Zero-Config Infrastructure for Developers</h1>
        <p>Deploy full-stack apps in seconds with GitHub integration, dynamic subdomains, and zero-config reverse proxying.</p>
        <div className={styles.action}>
          <a href="/new">Start Deploying</a>
          <a href="/demo">Documentation</a>
        </div>
        </div>
        <div className={styles.main}>
        <h1>Zero-Config Infrastructure for Developers</h1>
        <p>Deploy full-stack apps in seconds with GitHub integration, dynamic subdomains, and zero-config reverse proxying.</p>
        <div className={styles.action}>
          <a href="/new">Start Deploying</a>
          <a href="/demo">Documentation</a>
        </div>
        </div>
      </div>
      </>
  )
}