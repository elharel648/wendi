"use client";

import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

type Props = {
  src: string;
  size?: number;
  /** Target full-loop duration in seconds — speed auto-derives so every icon loops at the same calm pace. */
  targetDuration?: number;
  className?: string;
};

export function LottieIcon({
  src,
  size = 56,
  targetDuration = 8,
  className,
}: Props) {
  const [data, setData] = useState<{ fr?: number; op?: number; ip?: number } | null>(null);
  const ref = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    let alive = true;
    fetch(src)
      .then((r) => r.json())
      .then((j) => alive && setData(j))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [src]);

  useEffect(() => {
    if (!data || !ref.current) return;
    const fr = data.fr ?? 30;
    const frames = (data.op ?? fr) - (data.ip ?? 0);
    const nativeDuration = frames / fr;
    const speed = Math.min(1, nativeDuration / targetDuration);
    ref.current.setSpeed(speed);
  }, [data, targetDuration]);

  if (!data) {
    return (
      <div
        aria-hidden="true"
        style={{ width: size, height: size }}
        className={className}
      />
    );
  }

  return (
    <div style={{ width: size, height: size }} className={className}>
      <Lottie
        lottieRef={ref}
        animationData={data}
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
