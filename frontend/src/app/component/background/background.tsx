"use client";
import React, { useEffect, useRef } from "react";
import styles from "./bg.module.css";
import { motion } from "framer-motion";

export default function BG() {
  const blobRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const blob = blobRef.current;
    const container = containerRef.current;
    if (!blob) return;

    let animationFrameId: number;
    const maxMovement = 100;
    const maxMovementY = 40;

    const handlePointerMove = (event: PointerEvent) => {
      const { clientX, clientY } = event;

      animationFrameId = requestAnimationFrame(() => {
        const posX = (clientX - window.innerWidth / 2) * 0.2;
        const posY = (clientY - window.innerHeight / 2) * 0.2;

        const limitedX = Math.max(-maxMovement, Math.min(maxMovement, posX));
        const limitedY = Math.max(-maxMovementY, Math.min(maxMovementY, posY));

        blob.style.setProperty("--translate-x", `${limitedX}px`);
        blob.style.setProperty("--translate-y", `${limitedY}px`);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    // Parallax on scroll: update CSS var --scroll-y
    const handleScroll = () => {
      const y = window.scrollY * 0.02; // subtle parallax
      if (container) {
        container.style.setProperty("--scroll-y", `${y}px`);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.blobContainer}>
      <div className={styles.gradientFlow}></div>
      <div className={styles.pulse}></div>
      <div className={styles.particles}></div>
      {/* Floating glowing orbs */}
      <motion.div
        className={styles.orb}
        initial={{ opacity: 0.2, x: -200, y: -50, scale: 0.8 }}
        animate={{ opacity: 0.45, x: 200, y: 40, scale: 1 }}
        transition={{ repeat: Infinity, repeatType: 'reverse', duration: 28, ease: 'easeInOut' }}
      />
      <motion.div
        className={styles.orb}
        initial={{ opacity: 0.15, x: 250, y: 120, scale: 0.7 }}
        animate={{ opacity: 0.4, x: -150, y: -60, scale: 1 }}
        transition={{ repeat: Infinity, repeatType: 'reverse', duration: 34, ease: 'easeInOut' }}
        style={{ filter: 'blur(50px)' }}
      />
      <div ref={blobRef} className={styles.blob}></div>
      <div className={styles.vignette}></div>
    </div>
  );
}
