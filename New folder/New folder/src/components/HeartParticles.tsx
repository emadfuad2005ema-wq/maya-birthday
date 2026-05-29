import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  colorClass: string;
}

const HEART_COLORS = [
  "text-rose-500",
  "text-pink-500",
  "text-rose-400",
  "text-pink-400",
  "text-rose-300",
  "text-rose-600",
  "text-pink-600"
];

export function HeartParticles({ burstTrigger = 0 }: { burstTrigger?: number }) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  // Generate initial drift particles
  useEffect(() => {
    const initialHearts = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage x
      y: Math.random() * 100 + 100, // start below viewport
      size: Math.random() * 14 + 10,  // 10px to 24px
      delay: Math.random() * 6,
      duration: Math.random() * 6 + 9, // 9s to 15s rise time
      opacity: Math.random() * 0.4 + 0.3,
      colorClass: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
    }));
    setHearts(initialHearts);
  }, []);

  // Handle explosion of massive cute hearts when button is clicked
  useEffect(() => {
    if (burstTrigger > 0) {
      // Create a gorgeous massive explosion of 240 colorful hearts!
      const explosionHearts = Array.from({ length: 240 }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        // Speeds ranging from gentle to fast outwards
        const speed = Math.random() * 55 + 20; 
        const startX = 50; // Central anchor
        const startY = 50;

        return {
          id: Date.now() + i,
          // Propagate outwards
          x: startX + Math.cos(angle) * speed,
          y: startY + Math.sin(angle) * speed - 15, // float elegantly
          size: Math.random() * 32 + 12, // varying cute sizes
          delay: Math.random() * 0.3,
          duration: Math.random() * 3.0 + 1.2,
          opacity: Math.random() * 0.7 + 0.3,
          colorClass: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        };
      });

      // Add bursts and filter to keep performance perfect
      setHearts((prev) => [...prev, ...explosionHearts].slice(-400));
    }
  }, [burstTrigger]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[99999]">
      {hearts.map((heart) => {
        const isBurst = heart.id > 1000; // Exploded hearts have timestamp IDs
        const randomRot = Math.sin(heart.id) * 45;
        return (
          <motion.div
            key={heart.id}
            initial={{
              x: isBurst ? "50vw" : `${heart.x}vw`,
              y: isBurst ? "50vh" : "110vh",
              scale: isBurst ? 0.1 : 1,
              rotate: isBurst ? 0 : randomRot,
              opacity: 0,
            }}
            animate={{
              y: isBurst ? `${heart.y}vh` : "-10vh",
              scale: isBurst ? [0.1, 1.8, 1.2, 0] : 1,
              rotate: isBurst ? [0, randomRot * 2, randomRot * 4] : [-25, 25],
              opacity: [0, heart.opacity, heart.opacity, 0],
              x: isBurst 
                ? ["50vw", `${heart.x}vw`] 
                : [`${heart.x}vw`, `${heart.x + Math.sin(heart.id) * 3}vw`],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: isBurst ? 0 : Infinity,
              ease: isBurst ? "easeOut" : "easeInOut",
            }}
            className="absolute rounded-full"
            style={{ width: heart.size, height: heart.size }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`${heart.colorClass} opacity-90 w-full h-full filter drop-shadow-md`}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}
