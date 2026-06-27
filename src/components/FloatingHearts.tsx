import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; duration: number; size: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((current) => [
        ...current,
        {
          id: Date.now(),
          left: Math.random() * 100,
          duration: 10 + Math.random() * 15,
          size: 10 + Math.random() * 20,
        },
      ].slice(-20));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '100vh', opacity: 0, x: `${heart.left}vw` }}
          animate={{ y: '-10vh', opacity: [0, 0.4, 0] }}
          transition={{ duration: heart.duration, ease: 'linear' }}
          style={{
            position: 'absolute',
            color: 'var(--primary-color)',
            fontSize: heart.size,
            filter: 'blur(1px)',
            userSelect: 'none'
          }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
