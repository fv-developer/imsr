"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const numParticles = Math.min(Math.floor((width * height) / 12000), 80);
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 188, 218, ${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw floating glowing particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(66, 211, 146, ${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(0, 188, 218, 0.8)";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-zinc-950 text-white flex flex-col justify-between items-center relative overflow-hidden font-sans select-none px-4 sm:px-6 py-8 sm:py-12">
      {/* CANVAS PARTICLE BACKGROUND */}
      <ParticleBackground />

      {/* WHITE LOGO CENTERED AT TOP */}
      <div className="w-full flex justify-center items-center z-10 pt-4">
        <Link href="/" className="relative h-12 w-52 sm:w-60">
          <Image
            src="/images/logo.png"
            alt="IMSR Logo"
            fill
            className="object-contain brightness-0 invert"
            priority
          />
        </Link>
      </div>

      {/* CENTRAL 404 CONTENT HERO */}
      <section className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center z-10 py-10">
        {/* BIG 404 HEADING (#fff, font-weight 500) */}
        <h1
          className="font-display text-[120px] sm:text-[180px] md:text-[230px] leading-none tracking-tight select-none mb-2"
          style={{ color: "#fff", fontWeight: 500 }}
        >
          404
        </h1>

        {/* SUBTITLE & DESCRIPTION */}
        <h2 className="font-display font-medium text-2xl sm:text-3xl md:text-4xl text-zinc-200 tracking-tight mb-4">
          Page Not Found
        </h2>
        <p className="font-sans text-zinc-400 font-light text-base sm:text-lg max-w-md sm:max-w-lg leading-relaxed mb-10 text-balance">
          The page you are looking for doesn&apos;t exist, has been moved, or is temporarily unavailable.
        </p>

        {/* BACK TO WEBSITE BUTTON (16px, weight 500) */}
        <Link
          href="/"
          className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white text-zinc-950 hover:bg-zinc-100 transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 cursor-pointer font-sans select-none"
          style={{ fontSize: "16px", fontWeight: 500 }}
        >
          <ArrowLeft className="w-5 h-5 text-zinc-950 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Website</span>
        </Link>
      </section>

      {/* FOOTER BAR */}
      <footer className="w-full max-w-7xl mx-auto text-center text-xs text-zinc-500 font-sans z-10 pt-6 border-t border-zinc-900">
        &copy; {new Date().getFullYear()} Institute of Management Studies and Research (IMSR). All rights reserved.
      </footer>
    </main>
  );
}
