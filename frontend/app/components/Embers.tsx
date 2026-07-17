"use client";

import { useEffect, useState } from "react";

interface Ember {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
  drift: number;
}

const COLORS = ["#f0810f", "#ff6a00", "#ffaa33", "#ff8c00", "#ffd700"];

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function Embers({ count = 30 }: { count?: number }) {
  const [embers, setEmbers] = useState<Ember[]>([]);

  useEffect(() => {
    setEmbers(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${random(0, 100)}%`,
        size: random(2, 5),
        duration: random(4, 9),
        delay: random(0, 7),
        opacity: random(0.4, 0.9),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        drift: random(-30, 30),
      }))
    );
  }, [count]);

  return (
    <>
      <style>{`
        @keyframes float-ember {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: var(--ember-opacity);
          }
          40% {
            opacity: var(--ember-opacity);
          }
          80% {
            transform: translateY(-340px) translateX(var(--ember-drift)) scale(0.4);
            opacity: 0.1;
          }
          100% {
            transform: translateY(-420px) translateX(var(--ember-drift)) scale(0);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ember-particle { animation: none !important; opacity: 0 !important; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {embers.map((e) => (
          <div
            key={e.id}
            className="ember-particle"
            style={
              {
                position: "absolute",
                bottom: `${random(0, 30)}%`,
                left: e.left,
                width: `${e.size}px`,
                height: `${e.size}px`,
                borderRadius: "50%",
                backgroundColor: e.color,
                boxShadow: `0 0 ${e.size * 2}px ${e.color}, 0 0 ${e.size * 4}px ${e.color}80`,
                animationName: "float-ember",
                animationDuration: `${e.duration}s`,
                animationDelay: `${e.delay}s`,
                animationTimingFunction: "ease-out",
                animationIterationCount: "infinite",
                animationFillMode: "both",
                "--ember-opacity": e.opacity,
                "--ember-drift": `${e.drift}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </>
  );
}
