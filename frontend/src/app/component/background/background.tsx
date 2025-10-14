"use client";
import React, { useEffect, useRef } from "react";
import styles from "./bg.module.css";

export default function BG() {
  const blobRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const blob = blobRef.current;
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

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={styles.blobContainer}>
      <div ref={blobRef} className={styles.blob}></div>
    </div>
  );
}
