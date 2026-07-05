"use client";

import { useEffect, useRef } from "react";

export default function MudBubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const bubbles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 200,
      r: 4 + Math.random() * 20,
      speed: 0.3 + Math.random() * 0.8,
      opacity: 0.1 + Math.random() * 0.4,
    }));

    let animId: number;
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const b of bubbles) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(249,115,22,${b.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        b.y -= b.speed;
        b.x += Math.sin(b.y * 0.01) * 0.5;
        if (b.y + b.r < 0) {
          b.y = canvas.height + b.r;
          b.x = Math.random() * canvas.width;
        }
      }
      animId = requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
