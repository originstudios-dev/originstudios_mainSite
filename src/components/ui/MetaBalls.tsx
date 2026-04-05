"use client";

import { useRef, useEffect, useCallback } from "react";

interface MetaBallsProps {
  color?: string;
  cursorBallColor?: string;
  cursorBallSize?: number;
  ballCount?: number;
  animationSize?: number;
  enableMouseInteraction?: boolean;
  enableTransparency?: boolean;
  hoverSmoothness?: number;
  clumpFactor?: number;
  speed?: number;
}

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export default function MetaBalls({
  color = "#D8CFBC",
  cursorBallColor = "#D8CFBC",
  cursorBallSize = 2,
  ballCount = 15,
  animationSize = 30,
  enableMouseInteraction = true,
  enableTransparency = true,
  hoverSmoothness = 0.15,
  clumpFactor = 1,
  speed = 0.3,
}: MetaBallsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const smoothMouseRef = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef<number>(0);

  const hexToRgb = useCallback((hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 255, g: 255, b: 255 };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Init balls
    const balls: Ball[] = [];
    for (let i = 0; i < ballCount; i++) {
      balls.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed * 2,
        vy: (Math.random() - 0.5) * speed * 2,
        r: animationSize * (0.5 + Math.random() * 0.5),
      });
    }

    const rgb = hexToRgb(color);
    const cursorRgb = hexToRgb(cursorBallColor);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse
      smoothMouseRef.current.x +=
        (mouseRef.current.x - smoothMouseRef.current.x) * hoverSmoothness;
      smoothMouseRef.current.y +=
        (mouseRef.current.y - smoothMouseRef.current.y) * hoverSmoothness;

      // Move balls
      for (const ball of balls) {
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Clump towards center
        const cx = width / 2;
        const cy = height / 2;
        ball.vx += (cx - ball.x) * clumpFactor * 0.00005;
        ball.vy += (cy - ball.y) * clumpFactor * 0.00005;

        // Bounce off edges
        if (ball.x < -ball.r) ball.x = width + ball.r;
        if (ball.x > width + ball.r) ball.x = -ball.r;
        if (ball.y < -ball.r) ball.y = height + ball.r;
        if (ball.y > height + ball.r) ball.y = -ball.r;

        // Dampen
        ball.vx *= 0.999;
        ball.vy *= 0.999;
      }

      // Draw metaballs using radial gradients & composite
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      const dpr = Math.min(window.devicePixelRatio, 2);
      tempCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Draw each ball as radial gradient
      for (const ball of balls) {
        const gradient = tempCtx.createRadialGradient(
          ball.x,
          ball.y,
          0,
          ball.x,
          ball.y,
          ball.r
        );
        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`);
        gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        tempCtx.fillStyle = gradient;
        tempCtx.beginPath();
        tempCtx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        tempCtx.fill();
      }

      // Cursor ball
      if (enableMouseInteraction && smoothMouseRef.current.x > -9000) {
        const cursorR = animationSize * cursorBallSize;
        const gradient = tempCtx.createRadialGradient(
          smoothMouseRef.current.x,
          smoothMouseRef.current.y,
          0,
          smoothMouseRef.current.x,
          smoothMouseRef.current.y,
          cursorR
        );
        gradient.addColorStop(
          0,
          `rgba(${cursorRgb.r}, ${cursorRgb.g}, ${cursorRgb.b}, 1)`
        );
        gradient.addColorStop(
          1,
          `rgba(${cursorRgb.r}, ${cursorRgb.g}, ${cursorRgb.b}, 0)`
        );
        tempCtx.fillStyle = gradient;
        tempCtx.beginPath();
        tempCtx.arc(
          smoothMouseRef.current.x,
          smoothMouseRef.current.y,
          cursorR,
          0,
          Math.PI * 2
        );
        tempCtx.fill();
      }

      // Apply threshold to create metaball effect
      const imageData = tempCtx.getImageData(
        0,
        0,
        tempCanvas.width,
        tempCanvas.height
      );
      const data = imageData.data;
      const threshold = enableTransparency ? 128 : 200;

      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        if (alpha > threshold) {
          data[i + 3] = enableTransparency
            ? Math.min(255, (alpha - threshold) * 3)
            : 255;
        } else {
          data[i + 3] = 0;
        }
      }

      tempCtx.putImageData(imageData, 0, 0);
      ctx.drawImage(
        tempCanvas,
        0,
        0,
        tempCanvas.width,
        tempCanvas.height,
        0,
        0,
        width,
        height
      );

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [
    color,
    cursorBallColor,
    cursorBallSize,
    ballCount,
    animationSize,
    enableMouseInteraction,
    enableTransparency,
    hoverSmoothness,
    clumpFactor,
    speed,
    hexToRgb,
  ]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!enableMouseInteraction) return;
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    },
    [enableMouseInteraction]
  );

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full"
    />
  );
}
