"use client"
import React, { useEffect, useRef, useState } from 'react';

export default function BG() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Main background container */}
      <div 
        ref={containerRef}
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: -10 }}
      >
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black-900 via-gray-900 to-black-800" />
        
        {/* Animated grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(39, 41, 44, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(107, 114, 128, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.1}px)`,
            animation: 'gridFloat 15s ease-in-out infinite alternate'
          }}
        />
        
        {/* Dynamic mouse-following gradient */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-15 blur-3xl transition-all duration-700 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(156, 163, 175, 0.4) 0%, rgba(107, 114, 128, 0.2) 40%, transparent 70%)',
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        
        {/* Morphing blob similar to your original but enhanced */}
        <div 
          className="absolute w-96 h-96 opacity-25 blur-2xl"
          style={{
            left: '50%',
            top: '40%',
            transform: `translate(-50%, -50%) translate(${(mousePos.x - 50) * 0.3}px, ${(mousePos.y - 50) * 0.2}px)`,
            background: 'linear-gradient(45deg, #181819ff, #d2d3d6ff, #6b7280)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            animation: 'morphBlob 12s ease-in-out infinite alternate',
            transition: 'transform 2s ease-out'
          }}
        />
        
        {/* Secondary accent blobs */}
        <div 
          className="absolute w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #8c9098ff 0%, transparent 70%)',
            left: '20%',
            top: '60%',
            animation: 'floatSlow 20s ease-in-out infinite alternate',
            animationDelay: '2s'
          }}
        />
        
        <div 
          className="absolute w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #4b5563 0%, transparent 70%)',
            right: '20%',
            top: '20%',
            animation: 'floatSlow 18s ease-in-out infinite alternate-reverse',
            animationDelay: '4s'
          }}
        />
        
        {/* Floating code-like particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-gray-600/20 font-mono text-xs select-none"
            style={{
              left: `${20 + (i * 60) % 80}%`,
              top: `${10 + (i * 40) % 80}%`,
              animation: `floatCode ${8 + (i % 3) * 2}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            {['git push', 'npm run', 'docker build', 'kubectl apply', 'terraform plan'][i % 5]}
          </div>
        ))}
        
        {/* Subtle network connection lines */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-5"
          style={{ animation: 'fadeInOut 10s ease-in-out infinite alternate' }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6b7280" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#9ca3af" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6b7280" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1={`${i * 12.5}%`}
              y1="0%"
              x2={`${100 - i * 8}%`}
              y2="100%"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              opacity="0.3"
              style={{
                animation: `drawLine ${6 + i}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.8}s`
              }}
            />
          ))}
        </svg>
        
        {/* Terminal cursor blink */}
        <div 
          className="absolute w-2 h-4 bg-gray-400/30"
          style={{
            right: '10%',
            bottom: '20%',
            animation: 'blink 1.5s step-end infinite'
          }}
        />
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gridFloat {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 20px) scale(1.02); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes morphBlob {
          0% { 
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: translate(-50%, -50%) rotate(0deg);
          }
          25% { 
            border-radius: 50% 50% 20% 80% / 25% 80% 20% 75%;
            transform: translate(-50%, -50%) rotate(90deg);
          }
          50% { 
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            transform: translate(-50%, -50%) rotate(180deg);
          }
          75% { 
            border-radius: 80% 20% 50% 50% / 50% 40% 60% 50%;
            transform: translate(-50%, -50%) rotate(270deg);
          }
          100% { 
            border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%;
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        @keyframes floatSlow {
          0% { transform: translate(0, 0) scale(1); opacity: 0.1; }
          50% { transform: translate(20px, -30px) scale(1.1); opacity: 0.15; }
          100% { transform: translate(-10px, 20px) scale(0.9); opacity: 0.1; }
        }
        
        @keyframes floatCode {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-15px) rotate(2deg); opacity: 0.4; }
          100% { transform: translateY(10px) rotate(-1deg); opacity: 0.2; }
        }
        
        @keyframes fadeInOut {
          0% { opacity: 0.05; }
          50% { opacity: 0.1; }
          100% { opacity: 0.05; }
        }
        
        @keyframes drawLine {
          0% { stroke-dasharray: 0, 1000; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 500, 1000; stroke-dashoffset: -250; }
          100% { stroke-dasharray: 1000, 1000; stroke-dashoffset: -500; }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </>
  );
}