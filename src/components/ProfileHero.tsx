"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  CheckCircle2,
  Copy,
  Check,
  QrCode,
  Download,
  Sparkles,
  Clock,
} from "lucide-react";
import { profileData } from "@/data/profileData";
import { downloadVCard } from "@/lib/utils";
import QRModal from "@/components/ui/QRModal";

interface ProfileHeroProps {
  isAntigravityActive: boolean;
  onToggleAntigravity: () => void;
  onShowToast: (message: string) => void;
}

export default function ProfileHero({
  isAntigravityActive,
  onToggleAntigravity,
  onShowToast,
}: ProfileHeroProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [tashkentTime, setTashkentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Tashkent",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTashkentTime(timeStr);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.email);
      setIsCopied(true);
      onShowToast("Email nusxalandi: " + profileData.email);
      setTimeout(() => setIsCopied(false), 2200);
    } catch {
      onShowToast("Email nusxalashda xatolik yuz berdi.");
    }
  };

  const handleDownloadVCard = () => {
    downloadVCard({
      fullName: profileData.name,
      role: profileData.role,
      email: profileData.email,
      location: profileData.location,
      url: profileData.websiteUrl,
      telegram: profileData.handle,
    });
    onShowToast("Akbarjon_Egamberdiyev.vcf yuklab olinmoqda...");
  };

  return (
    <section className="relative z-10 flex flex-col items-center text-center pt-8 pb-4 w-full">
      {/* 1. Holographic Avatar Container */}
      <div className="relative mb-6 group cursor-pointer">
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#00d2ff] via-[#7000FF] to-[#10B981] opacity-60 blur-xl group-hover:opacity-100 transition-opacity duration-500" />

        <div className="liquid-glass relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[2px]">
          <div className="w-full h-full rounded-full bg-[#0c0c0c]/80 flex items-center justify-center overflow-hidden border border-white/10 relative shadow-[inset_0_0_20px_rgba(0,210,255,0.3)]">
            <span className="relative font-mono text-3xl sm:text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-100 to-[#00d2ff]">
              AE
            </span>
          </div>
        </div>

        <div className="absolute bottom-1 right-1 p-1 rounded-full bg-[#0c0c0c] border border-[#00d2ff]/60 shadow-[0_0_15px_rgba(0,210,255,0.5)]">
          <div className="p-1 rounded-full bg-gradient-to-br from-[#00d2ff] to-[#7000FF] text-white">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 2. Identity & "Aura" Shiny Headline */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-white">
          <span>Akbarjon </span>
          <span className="animate-shiny">Egamberdiyev</span>
        </h1>

        <p className="mt-2 text-sm sm:text-base font-medium text-white/70 max-w-md mx-auto">
          {profileData.role}
        </p>

        {/* Location & Real-Time Tashkent Clock Widget */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-neutral-300">
            <MapPin className="w-3.5 h-3.5 text-[#00d2ff]" />
            <span>{profileData.location}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-xs font-mono text-[#00d2ff]">
            <Clock className="w-3.5 h-3.5" />
            <span>{tashkentTime || "12:00:00"} UZT</span>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className="mt-3 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-emerald-400 tracking-wide">
              {profileData.status}
            </span>
          </div>
        </div>

        <p className="mt-3.5 max-w-lg text-xs sm:text-sm text-white/60 leading-relaxed px-4">
          {profileData.bio}
        </p>
      </motion.div>

      {/* 3. Quick Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-2.5 px-2"
      >
        <button
          onClick={handleCopyEmail}
          className="liquid-glass group inline-flex items-center justify-center gap-2 rounded-full text-white text-xs font-medium px-4 py-2.5 transition-all hover:bg-white/10 active:scale-[0.98]"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Nusxalandi!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
              <span>Copy Email</span>
            </>
          )}
        </button>

        <button
          onClick={() => setIsQRModalOpen(true)}
          className="liquid-glass group inline-flex items-center justify-center gap-2 rounded-full text-white text-xs font-medium px-4 py-2.5 transition-all hover:bg-white/10 active:scale-[0.98]"
        >
          <QrCode className="w-3.5 h-3.5 text-[#00d2ff]" />
          <span>Pass QR</span>
        </button>

        <button
          onClick={handleDownloadVCard}
          className="liquid-glass group inline-flex items-center justify-center gap-2 rounded-full text-white text-xs font-medium px-4 py-2.5 transition-all hover:bg-white/10 active:scale-[0.98]"
        >
          <Download className="w-3.5 h-3.5 text-[#A4F4FD]" />
          <span>Save vCard</span>
        </button>

        <button
          onClick={onToggleAntigravity}
          className={`liquid-glass group inline-flex items-center justify-center gap-2 rounded-full text-xs font-medium px-4 py-2.5 transition-all active:scale-[0.98] ${
            isAntigravityActive ? "text-[#00d2ff] border-[#00d2ff]/40 bg-[#00d2ff]/10" : "text-white/60 hover:text-white"
          }`}
        >
          <Sparkles className={`w-3.5 h-3.5 ${isAntigravityActive ? "animate-spin text-[#00d2ff]" : ""}`} style={{ animationDuration: "6s" }} />
          <span>Antigravity: {isAntigravityActive ? "ON" : "OFF"}</span>
        </button>
      </motion.div>

      <QRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} url={profileData.websiteUrl} name={profileData.name} />
    </section>
  );
}
