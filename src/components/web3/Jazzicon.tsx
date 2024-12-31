import { useEffect, useRef } from "react";
import jazzicon from "@metamask/jazzicon";
interface JazziconProps {
  address?: string;
  size?: number;
  className?: string;
}

export default function Jazzicon({
  address,
  size = 40,
  className = "",
}: JazziconProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!address || !ref.current) return;

    // 清除之前的内容
    ref.current.innerHTML = "";

    // 从地址创建一个数字种子
    const seed = parseInt(address.slice(2, 10), 16);

    // 创建 jazzicon 元素
    const jazziconElement = jazzicon(size, seed);

    // 添加到容器中
    ref.current.appendChild(jazziconElement);
  }, [address, size]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ width: size, height: size, borderRadius: "50%" }}
    />
  );
}
