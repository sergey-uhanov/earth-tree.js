'use client';
import { useEffect, useRef } from 'react';

export default function StarrySky() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Указываем тип HTMLCanvasElement

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return; // Проверяем, что canvas существует.

    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Проверяем, что контекст существует.

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
    }));

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'white';
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function animate() {
      drawStars();
      requestAnimationFrame(animate);
    }

    animate();

    // Обработчик изменения размера окна
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block', position: "absolute", zIndex: -1, top: 0, left: 0, width: "100%", height: "100%" }} />;
}
