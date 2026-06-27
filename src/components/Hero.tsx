import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import InteractiveHeart from './InteractiveHeart';

const Hero: React.FC = () => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      textAlign: 'center',
      padding: '0 20px',
      background: 'radial-gradient(circle at center, #260914 0%, var(--bg-color) 100%)'
    }}>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, type: 'spring', bounce: 0.4 }}
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <Suspense fallback={<div style={{ height: '300px', display: 'flex', alignItems: 'center' }}>Loading 3D Heart...</div>}>
          <InteractiveHeart />
        </Suspense>
      </motion.div>
      
      <motion.h1
        className="serif"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          marginBottom: '10px',
          background: 'linear-gradient(45deg, #fdf0d5, #ff4d6d)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.1,
          letterSpacing: '2px'
        }}
      >
        Alok & Titil
      </motion.h1>
      
      <motion.p
        className="serif"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        style={{
          fontSize: '1.8rem',
          color: 'var(--accent-color)',
          fontStyle: 'italic',
          marginBottom: '30px',
          textShadow: '0 2px 10px rgba(255,117,143,0.3)'
        }}
      >
        A Love Story
      </motion.p>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        style={{
          fontSize: '1.2rem',
          maxWidth: '600px',
          opacity: 0.8,
          marginBottom: '50px'
        }}
      >
        Every beautiful moment has led up to this one. Scroll down to relive the magic frame by frame.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <span style={{ fontSize: '0.9rem', opacity: 0.6, letterSpacing: '2px', textTransform: 'uppercase' }}>Scroll to Begin</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            width: '2px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--primary-color), transparent)'
          }}
        />
      </motion.div>
    </div>
  );
};

export default Hero;
