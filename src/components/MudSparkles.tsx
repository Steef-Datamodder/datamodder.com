"use client";

import { useEffect, useRef } from "react";

interface Sparkle {
  x: number;
  y: number;
  size: number;
  weight: number;
  opacity: number;
  phase: "in" | "hold" | "out" | "wait";
  timer: number;
  waitDuration: number;
  holdDuration: number;
  fadeDuration: number;
}

export default function MudSparkles() {
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
    window.addEventListener("resize", resize);

    const newSparkle = (): Sparkle => ({
      x: 0.05 + Math.random() * 0.9,
      y: 0.05 + Math.random() * 0.9,
      size: 0,
      weight: 0,
      opacity: 0,
      phase: "in",
      timer: 0,
      waitDuration: 1000 + Math.random() * 3000,
      holdDuration: 150 + Math.random() * 250,
      fadeDuration: 400 + Math.random() * 400,
    });

    // Één actieve sparkle tegelijk
    let current: Sparkle = { ...newSparkle(), phase: "wait", timer: 0 };
    const sparkles = [current];

    function drawSparkle(x: number, y: number, size: number, weight: number, opacity: number) {
      if (!ctx) return;
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(x, y);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = weight;
      ctx.lineCap = "round";

      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
        ctx.stroke();
      }

      ctx.restore();
    }

    let last = performance.now();
    let animId: number;

    function animate(now: number) {
      if (!ctx || !canvas) return;
      const dt = now - last;
      last = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const s = sparkles[0];
      s.timer += dt;

      if (s.phase === "wait") {
        if (s.timer >= s.waitDuration) {
          const next = newSparkle();
          sparkles[0] = next;
        }
      } else if (s.phase === "in") {
        const t = Math.min(1, s.timer / s.fadeDuration);
        s.opacity = t;
        s.size = t * 1.5;
        s.weight = t * 0.6;
        if (s.timer >= s.fadeDuration) { s.timer = 0; s.phase = "hold"; }
      } else if (s.phase === "hold") {
        s.opacity = 1; s.size = 1.5; s.weight = 0.6;
        if (s.timer >= s.holdDuration) { s.timer = 0; s.phase = "out"; }
      } else if (s.phase === "out") {
        const t = Math.max(0, 1 - s.timer / s.fadeDuration);
        s.opacity = t;
        s.size = t * 1.5;
        s.weight = t * 0.6;
        if (s.timer >= s.fadeDuration) {
          // Start pauze voor volgende
          sparkles[0] = {
            ...newSparkle(),
            phase: "wait",
            timer: 0,
            waitDuration: 1000 + Math.random() * 3000,
            opacity: 0,
          };
        }
      }

      if (s.opacity > 0) {
        drawSparkle(s.x * canvas.width, s.y * canvas.height, s.size, s.weight, s.opacity * 0.9);
      }

      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
}
