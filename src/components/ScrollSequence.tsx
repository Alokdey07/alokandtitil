import React, { useRef, useEffect, useState } from 'react';

interface ScrollSequenceProps {
  frameCount: number;
  imageResolver: (index: number) => string;
}

const ScrollSequence: React.FC<ScrollSequenceProps> = ({ frameCount, imageResolver }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = imageResolver(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };
      // Fallback if image fails to load
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };
      imgArray.push(img);
    }
    setImages(imgArray);
  }, [frameCount, imageResolver]);

  useEffect(() => {
    if (!loaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderFrame = (index: number) => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const img = images[index];
      if (img && img.complete && img.naturalWidth > 0) {
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      } else {
        // Placeholder drawing
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#1a050f');
        gradient.addColorStop(1, '#0d0208');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff4d6d';
        ctx.font = 'bold 48px "Playfair Display"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`Frame ${index + 1} / ${frameCount}`, canvas.width / 2, canvas.height / 2 - 20);
        
        ctx.font = '24px Poppins';
        ctx.fillStyle = '#fdf0d5';
        ctx.fillText('(Waiting for your PNGs)', canvas.width / 2, canvas.height / 2 + 30);
      }
    };

    renderFrame(0);

    const handleScroll = () => {
      const { top, height } = containerRef.current!.getBoundingClientRect();
      const scrollY = -top;
      const scrollableHeight = height - window.innerHeight;
      
      let progress = scrollY / scrollableHeight;
      progress = Math.max(0, Math.min(1, progress));
      
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(progress * frameCount)
      );
      
      requestAnimationFrame(() => renderFrame(frameIndex));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [loaded, images, frameCount]);

  return (
    <div ref={containerRef} style={{ height: '400vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '10vh 5vw', background: 'linear-gradient(to top, rgba(13,2,8,0.9), transparent 40%)' }}>
           <h2 className="serif" style={{ fontSize: 'clamp(2rem, 8vw, 4rem)', color: 'var(--primary-color)', textShadow: '0 4px 20px rgba(255,77,109,0.4)', margin: 0 }}>
             Titil & Alok
           </h2>
           <p style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', maxWidth: '600px', opacity: 0.9, marginTop: '10px' }}>
             Scroll to reveal the memories frame by frame, leading to the perfect moment.
           </p>
        </div>
      </div>
    </div>
  );
};

export default ScrollSequence;
