"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  duration?: number;
  onComplete?: () => void;
}

export default function AnimatedBackground({
  duration = 3000,
  onComplete,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isRunning = useRef(true);
  // 添加状态来控制 canvas 的显示/隐藏
  const [showCanvas, setShowCanvas] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    const d = canvasRef.current;
    const ctx = d.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = (d.width = window.innerWidth);
    let h = (d.height = window.innerHeight);

    const total = (w / 8) | 0;
    const acceleration = 0.05;
    const lineAlpha = 0.05;
    const range = 25;

    const size = w / total;
    const occupation = w / total;
    const colors: number[] = [];
    const dots: number[] = [];
    const dotsVel: number[] = [];

    const portion = 360 / total;
    for (let i = 0; i < total; ++i) {
      colors[i] = portion * i;
      dots[i] = h;
      dotsVel[i] = 10;
    }

    let animationFrameId: number;
    function anim() {
      if (!ctx || !isRunning.current) return;

      animationFrameId = window.requestAnimationFrame(anim);

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < total; ++i) {
        dots[i] += dotsVel[i] += acceleration;

        for (let j = i + 1; j < i + range && j < total; ++j) {
          if (Math.abs(dots[i] - dots[j]) <= range * size) {
            ctx.strokeStyle = `hsla(${
              (colors[i] + colors[j] + 360) / 2 - 180
            }, 80%, 50%, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(i * occupation, dots[i]);
            ctx.lineTo(j * occupation, dots[j]);
            ctx.stroke();
          }
        }

        if (dots[i] > h && Math.random() < 0.01) {
          dots[i] = dotsVel[i] = 0;
        }
      }
    }

    const handleResize = () => {
      w = d.width = window.innerWidth;
      h = d.height = window.innerHeight;
    };

    anim();

    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => {
      isRunning.current = false;
      if (onComplete) {
        onComplete();
      }
      ctx.clearRect(0, 0, w, h);
      // 动画完成后，设置 showCanvas 为 false，从而移除 canvas 元素
      setShowCanvas(false);
    }, duration);

    return () => {
      isRunning.current = false;
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
      if (ctx) {
        ctx.clearRect(0, 0, w, h);
      }
    };
  }, [duration, onComplete]);

  // 只在 showCanvas 为 true 时渲染 canvas 元素
  return showCanvas ? (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[0]"
    />
  ) : null;
}
