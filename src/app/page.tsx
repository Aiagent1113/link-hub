"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import ProfileHero from "@/components/ProfileHero";
import BentoGrid from "@/components/BentoGrid";
import { profileData } from "@/data/profileData";

export default function Home() {
  const [isAntigravityActive, setIsAntigravityActive] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3000);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between px-4 sm:px-6 overflow-x-hidden bg-[#0c0c0c] text-white">
      {/* 1. "Aura" Global Kinematik Video Fon (Uzluksiz aylanuvchi HD video) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none opacity-45"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />
        {/* Kontrast va o'qiluvchanlikni oshiruvchi yumshoq qora qatlam */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c]/50 via-[#0c0c0c]/80 to-[#0c0c0c]" />
      </div>

      {/* 2. Windows uchun Luxury Vertikal Yo'naltiruvchi Chiziqlar */}
      <div className="hidden lg:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[calc(50%+25rem)] w-px bg-white/10 z-[5]" />
      <div className="hidden lg:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[calc(-50%+25rem)] w-px bg-white/10 z-[5]" />

      {/* 3. Markaziy Spatial Konteyner (Max-Width 720px) */}
      <div className="relative z-10 w-full max-w-[720px] mx-auto flex flex-col items-center">
        <ProfileHero
          isAntigravityActive={isAntigravityActive}
          onToggleAntigravity={() => setIsAntigravityActive((prev) => !prev)}
          onShowToast={showToast}
        />

        <BentoGrid isAntigravityActive={isAntigravityActive} />

        <footer className="w-full pb-12 text-center">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/15 to-transparent mb-6" />
          <p className="text-xs font-mono text-white/50">
            © 2026 {profileData.name} • Spatial Antigravity Engine
          </p>
          <p className="text-[11px] text-white/40 mt-1 font-mono">
            Crafted with Next.js 15, Liquid-Glass & Cinematic Background
          </p>
        </footer>
      </div>

      {/* 4. Animated Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full liquid-glass border border-white/20 text-xs font-medium text-white shadow-2xl"
          >
            <div className="p-1 rounded-full bg-[#00d2ff]/20 text-[#00d2ff]">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
