"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  isAntigravityActive?: boolean;
  floatDelay?: number;
  onClick?: () => void;
  as?: "div" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export default function TiltCard({
  children,
  className,
  spotlightColor = "#00d2ff",
  isAntigravityActive = true,
  floatDelay = 0,
  onClick,
  as = "div",
  href,
  target,
  rel,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 260, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({ x, y });
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const MotionComponent = motion[as as "div"];

  return (
    <MotionComponent
      ref={cardRef as any}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      animate={
        isAntigravityActive && !isHovered
          ? {
              y: [-3.5, 3.5, -3.5],
              transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: floatDelay,
              },
            }
          : {
              y: 0,
              transition: { duration: 0.35, ease: "easeOut" },
            }
      }
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group liquid-glass relative rounded-2xl transition-all duration-400",
        isHovered
          ? "shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(0,210,255,0.25)] scale-[1.015]"
          : "shadow-[0_8px_25px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      {/* Dynamic Cursor Spotlight Following Mouse inside the Card */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.35 : 0,
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}60, transparent 70%)`,
        }}
      />

      {/* Spatial 3D Elevation Layer for Content */}
      <div
        className="relative z-10 h-full w-full transition-transform duration-300"
        style={{
          transform: isHovered ? "translateZ(26px)" : "translateZ(0px)",
        }}
      >
        {children}
      </div>
    </MotionComponent>
  );
}
