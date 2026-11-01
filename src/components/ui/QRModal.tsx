"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, QrCode } from "lucide-react";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  name: string;
}

export default function QRModal({ isOpen, onClose, url, name }: QRModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="liquid-glass relative w-full max-w-sm rounded-3xl p-6 border border-white/20 text-center z-10"
          >
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-neutral-300 hover:text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="p-2 rounded-xl bg-[#00d2ff]/20 text-[#00d2ff]">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white tracking-wide text-lg">
                Spatial Pass QR
              </h3>
            </div>
            <p className="text-xs text-neutral-300 mb-6">
              Scan with any smartphone camera to instantly access {name}&apos;s hub.
            </p>

            <div className="relative mx-auto w-52 h-52 rounded-2xl bg-white p-4 shadow-[0_0_40px_rgba(0,210,255,0.3)] flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full text-black fill-current" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="26" height="26" rx="4" />
                <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
                <rect x="13" y="13" width="10" height="10" rx="1.5" />

                <rect x="69" y="5" width="26" height="26" rx="4" />
                <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
                <rect x="77" y="13" width="10" height="10" rx="1.5" />

                <rect x="5" y="69" width="26" height="26" rx="4" />
                <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
                <rect x="13" y="77" width="10" height="10" rx="1.5" />

                <rect x="36" y="36" width="28" height="28" rx="3" fill="#0c0c0c" />
                <text x="50" y="55" fontSize="13" fontWeight="bold" fill="#00d2ff" textAnchor="middle" fontFamily="monospace">
                  AE
                </text>
                <rect x="36" y="8" width="6" height="6" rx="1" />
                <rect x="52" y="8" width="6" height="6" rx="1" />
                <rect x="8" y="36" width="6" height="6" rx="1" />
                <rect x="85" y="36" width="6" height="6" rx="1" />
                <rect x="52" y="85" width="6" height="6" rx="1" />
                <rect x="85" y="85" width="6" height="6" rx="1" />
              </svg>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs text-neutral-300">
              <span className="truncate max-w-[200px] font-mono">{url}</span>
              <button onClick={handleCopy} className="flex items-center gap-1 text-[#00d2ff] hover:text-white transition-colors">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
