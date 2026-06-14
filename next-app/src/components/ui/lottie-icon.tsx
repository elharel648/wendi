"use client";

import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

type Props = {
  src: string;
  size?: number;
  /** Target full-loop duration in seconds — speed auto-derives so every icon loops at the same calm pace. */
  targetDuration?: number;
  /** Render a single still frame (no playback). */
  staticFrame?: boolean;
  /** Frame to freeze on when staticFrame is true. Defaults to the animation's last frame. */
  frame?: number;
  /** Stay frozen on frame 0 until the parent element is hovered; play once on hover, reset on leave. */
  playOnHover?: boolean;
  /** CSS selector or element the hover listens on. Defaults to the immediate parent. */
  hoverTarget?: "parent" | "self";
  className?: string;
};

export function LottieIcon({
  src,
  size = 56,
  targetDuration = 8,
  staticFrame = false,
  frame,
  playOnHover = false,
  hoverTarget = "parent",
  className,
}: Props) {
  const [data, setData] = useState<{ fr?: number; op?: number; ip?: number } | null>(null);
  const ref = useRef<LottieRefCurrentProps>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    // force-cache: these JSON icons are static assets and many render at once;
    // the browser serves repeats from cache instead of refetching each one.
    fetch(src, { cache: "force-cache" })
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
    const ip = data.ip ?? 0;
    const op = data.op ?? fr;

    if (staticFrame) {
      const lastFrame = op - 1;
      const target = frame ?? lastFrame;
      ref.current.goToAndStop(target, true);
      return;
    }

    if (playOnHover) {
      ref.current.goToAndStop(ip, true);
      return;
    }

    const frames = op - ip;
    const nativeDuration = frames / fr;
    const speed = nativeDuration / targetDuration;
    ref.current.setSpeed(speed);
  }, [data, targetDuration, staticFrame, frame, playOnHover]);

  useEffect(() => {
    if (!playOnHover || !data) return;
    const el =
      hoverTarget === "self"
        ? wrapRef.current
        : wrapRef.current?.parentElement;
    if (!el) return;

    const onEnter = () => {
      const fr = data.fr ?? 30;
      const ip = data.ip ?? 0;
      const op = data.op ?? fr;
      const frames = op - ip;
      const nativeDuration = frames / fr;
      const speed = nativeDuration / targetDuration;
      ref.current?.setSpeed(speed);
      ref.current?.goToAndPlay(ip, true);
    };
    const onLeave = () => {
      const ip = data.ip ?? 0;
      ref.current?.goToAndStop(ip, true);
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [playOnHover, data, hoverTarget, targetDuration]);

  if (!data) {
    return (
      <div
        ref={wrapRef}
        aria-hidden="true"
        style={{ width: size, height: size }}
        className={className}
      />
    );
  }

  const isStatic = staticFrame || playOnHover;

  return (
    <div ref={wrapRef} style={{ width: size, height: size }} className={className}>
      <Lottie
        lottieRef={ref}
        animationData={data}
        loop={!isStatic}
        autoplay={!isStatic}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
