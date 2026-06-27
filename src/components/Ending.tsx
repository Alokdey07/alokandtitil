import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Ending: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div ref={ref} style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      textAlign: 'center',
      padding: '50px 20px',
      background: 'radial-gradient(circle at bottom, #260914 0%, var(--bg-color) 80%)'
    }}>
      <motion.div
        style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,77,109,0.2)',
          padding: '4rem 2rem',
          borderRadius: '30px',
          maxWidth: '800px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,77,109,0.1)'
        }}
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <h2 className="serif" style={{ 
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
          color: '#fdf0d5',
          marginBottom: '2rem'
        }}>
          Titil, will you marry me?
        </h2>
        
        <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '3rem', lineHeight: 1.8 }}>
          Every frame of my life is better when you're in it. <br/>
          I want to keep making memories with you, forever. <br/>
          <span style={{ fontStyle: 'italic', color: 'var(--accent-color)' }}>- Yours, Alok</span>
        </p>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', minHeight: '120px', alignItems: 'center' }}>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,77,109,0.6)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: 'clamp(10px, 3vw, 15px) clamp(20px, 5vw, 40px)',
              fontSize: 'clamp(1rem, 3.5vw, 1.2rem)',
              fontWeight: 600,
              background: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontFamily: 'Poppins',
              zIndex: 2,
              flexShrink: 0
            }}
            onClick={() => alert("She said YES! 🎉❤️")}
          >
            Yes, a million times yes!
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 0.95 }}
            style={{
              padding: 'clamp(10px, 3vw, 15px) clamp(20px, 5vw, 40px)',
              fontSize: 'clamp(1rem, 3.5vw, 1.2rem)',
              fontWeight: 600,
              background: 'transparent',
              color: 'var(--text-color)',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '50px',
              cursor: 'pointer',
              fontFamily: 'Poppins',
              zIndex: 1,
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              target.style.position = 'absolute';
              target.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              const target = e.currentTarget;
              target.style.position = 'absolute';
              target.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
            }}
          >
            No
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Ending;
