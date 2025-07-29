"use client"
import React, { useEffect, useRef } from 'react';
import styles from './bg.module.css';

export default function BG() {
  const blobRef = useRef(null);
  
  useEffect(() => {
    const blob = blobRef.current;
    let animationFrameId;

    const maxMovement = 100;
    const maxMovementY=40; // Limit movement from the center
    
    const handlePointerMove = (event) => {
      const { clientX, clientY } = event;
      
      animationFrameId = requestAnimationFrame(() => {
        // Calculate position relative to center
        const posX = (clientX - window.innerWidth / 2) * 0.2; // Reduce effect
        const posY = (clientY - window.innerHeight / 2) * 0.2;
        
        // Constrain movement within max range
        const limitedX = Math.max(-maxMovement, Math.min(maxMovement, posX));
        const limitedY = Math.max(-maxMovementY, Math.min(maxMovementY, posY));
        
        // Update custom properties
        blob.style.setProperty('--translate-x', `${limitedX}px`);
        blob.style.setProperty('--translate-y', `${limitedY}px`);
      });
    };
    
    window.addEventListener('pointermove', handlePointerMove);
    
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);
  
  return (
    <div className={styles.blobContainer}>
      <div ref={blobRef} className={styles.blob}></div>
    </div>
  );
};