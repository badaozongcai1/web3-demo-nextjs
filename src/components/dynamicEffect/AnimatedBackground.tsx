"use client";
import { useEffect, useRef } from "react";

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

  useEffect(() => {
    if (!canvasRef.current) return;

    const d = canvasRef.current;
    const ctx = d.getContext("2d", { alpha: true }); // 启用 alpha 通道
    if (!ctx) return;

    // 初始化设置
    let w = (d.width = window.innerWidth);
    let h = (d.height = window.innerHeight);

    // 参数设置
    const total = (w / 8) | 0;
    const acceleration = 0.05;
    const lineAlpha = 0.05; // 稍微增加线条透明度
    const range = 25;

    // 计算和数组初始化
    const size = w / total;
    const occupation = w / total;
    const colors: number[] = [];
    const dots: number[] = [];
    const dotsVel: number[] = [];

    // 初始化点的属性
    const portion = 360 / total;
    for (let i = 0; i < total; ++i) {
      colors[i] = portion * i;
      dots[i] = h;
      dotsVel[i] = 10;
    }

    // 动画函数
    let animationFrameId: number;
    function anim() {
      if (!ctx || !isRunning.current) return;

      animationFrameId = window.requestAnimationFrame(anim);

      // 使用完全透明的背景清除画布
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

    // 处理窗口大小变化
    const handleResize = () => {
      w = d.width = window.innerWidth;
      h = d.height = window.innerHeight;
    };

    // 开始动画
    anim();

    // 添加窗口大小变化监听
    window.addEventListener("resize", handleResize);

    // 设置定时器在指定时间后停止动画并调用完成回调
    const timer = setTimeout(() => {
      isRunning.current = false;
      if (onComplete) {
        onComplete();
      }
      ctx.clearRect(0, 0, w, h);
    }, duration);

    // 清理函数
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

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[0]"
    />
  );
}
