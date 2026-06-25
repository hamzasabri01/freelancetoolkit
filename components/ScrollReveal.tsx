"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade-up" | "fade-in" | "scale-in";
};

export function ScrollReveal({ children, className = "", delay = 0, variant = "fade-up" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!element || prefersReducedMotion || !("IntersectionObserver" in window)) {
      return;
    }

    const isInitiallyVisible = element.getBoundingClientRect().top < window.innerHeight * 0.92;
    let frame = 0;

    if (!isInitiallyVisible) {
      frame = window.requestAnimationFrame(() => setVisible(false));
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.14 },
    );

    observer.observe(element);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const style = { "--reveal-delay": `${delay}ms` } as CSSProperties;

  return (
    <div ref={ref} style={style} data-reveal={variant} className={`scroll-reveal ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}
