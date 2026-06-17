'use client';
import { useEffect, useRef } from 'react';

// Renders an image to canvas, starts pixelated, sharpens to full-res on view.
export default function PixelPortrait({ src, size = 420 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    let raf, steps = 0;
    const maxSteps = 36;
    img.onload = () => {
      const draw = () => {
        const t = Math.min(1, steps / maxSteps);
        const px = Math.max(1, Math.floor((1 - t) * 60) + 1); // 60px blocks -> 1px
        const w = Math.max(1, Math.floor(size / px));
        const h = Math.max(1, Math.floor(size / px));
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, w, h);
        ctx.drawImage(canvas, 0, 0, w, h, 0, 0, size, size);
        if (steps++ < maxSteps) raf = requestAnimationFrame(draw);
      };
      const io = new IntersectionObserver((es) => {
        if (es[0].isIntersecting) { steps = 0; draw(); }
      }, { threshold: 0.5 });
      io.observe(canvas);
    };
    return () => cancelAnimationFrame(raf);
  }, [src, size]);
  return <canvas ref={canvasRef} width={size} height={size}
    style={{ width: '100%', maxWidth: size, aspectRatio: '1', filter: 'contrast(1.05)' }} />;
}
