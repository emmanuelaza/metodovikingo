"use client";

import { useEffect, useRef } from "react";

/**
 * Brasas flotando de fondo (canvas, fixed, detrás de todo). Se pausan fuera
 * de pantalla y respetan prefers-reduced-motion — no se dibuja nada si está
 * activo. 30 fps a propósito: no necesita más para verse bien y ahorra batería.
 */
export function Embers({ count = 45 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, raf = 0, last = 0, visible = true;
    const fit = () => { w = cv.width = window.innerWidth; h = cv.height = window.innerHeight; };
    fit();
    window.addEventListener("resize", fit);

    const ps = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1 + Math.random() * 3,
      v: 12 + Math.random() * 28,
      ph: Math.random() * 6,
    }));

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(cv);

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || t - last < 33) return;
      last = t;
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.y -= p.v / 30;
        p.x += Math.sin(t / 900 + p.ph) * 0.3;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        ctx.globalAlpha = 0.2 + 0.4 * Math.abs(Math.sin(t / 500 + p.ph));
        ctx.fillStyle = "#ff8a30";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
      io.disconnect();
    };
  }, [count]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-60" />;
}
