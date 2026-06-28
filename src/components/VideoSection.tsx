import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
// @ts-ignore - Ignore TS complaining about mp4 import
import videoSource from '../assets/Initial_Scene_-_2026-06-27_202606272058.mp4';

const VideoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects for text and video
  const yText = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacityText = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const scaleVideo = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);

  return (
    <div ref={containerRef} style={{ height: '200vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
        {/* Video Background with Parallax Scale */}
        <motion.div style={{ position: 'absolute', inset: 0, scale: scaleVideo, overflow: 'hidden' }}>
          <video 
            src={videoSource}
            autoPlay 
            loop 
            muted 
            playsInline
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'brightness(0.7) contrast(1.1)'
            }} 
          />
          {/* Vignette overlays to blend the video smoothly into the dark theme */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle, transparent 40%, var(--bg-color) 100%)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, var(--bg-color) 0%, transparent 15%, transparent 85%, var(--bg-color) 100%)',
            pointerEvents: 'none'
          }} />
        </motion.div>

        {/* Floating Text with Parallax */}
        <motion.div style={{ 
          y: yText, 
          opacity: opacityText,
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 20px',
          background: 'rgba(13, 2, 8, 0.3)',
          backdropFilter: 'blur(5px)',
          borderRadius: '20px',
          paddingTop: '30px',
          paddingBottom: '30px',
          border: '1px solid rgba(255, 77, 109, 0.1)'
        }}>
           <h2 className="serif" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', color: 'var(--primary-color)', textShadow: '0 4px 20px rgba(0,0,0,0.8)', margin: 0 }}>
             Titil & Alok
           </h2>
           <p style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)', maxWidth: '600px', opacity: 0.9, marginTop: '15px', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
             Our beautiful journey in motion...
           </p>
        </motion.div>

      </div>
    </div>
  );
};

export default VideoSection;
