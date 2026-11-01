"use client";

import React, { useMemo } from "react";
import {
  ArrowUpRight,
  GitBranch,
  GitCommit,
  Send,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  FileText,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { profileData } from "@/data/profileData";

interface BentoGridProps {
  isAntigravityActive: boolean;
}

export default function BentoGrid({ isAntigravityActive }: BentoGridProps) {
  const commitMatrix = useMemo(() => {
    const cols = profileData.githubMetrics.matrixCols;
    const rows = profileData.githubMetrics.matrixRows;
    const levels = ["bg-white/[0.05]", "bg-emerald-500/30", "bg-emerald-400/60", "bg-[#00d2ff]/90"];

    return Array.from({ length: cols * rows }, (_, idx) => {
      const intensity = ((idx * 37) % 7 === 0 || (idx * 13) % 5 === 0) ? 3 : (idx * 23) % 4 === 0 ? 2 : (idx * 17) % 3 === 0 ? 1 : 0;
      return levels[intensity];
    });
  }, []);

  const getSocialIcon = (id: string) => {
    switch (id) {
      case "instagram": return <Instagram className="w-5 h-5 text-[#E1306C]" />;
      case "linkedin": return <Linkedin className="w-5 h-5 text-[#0A66C2]" />;
      case "twitter": return <Twitter className="w-5 h-5 text-white" />;
      case "youtube": return <Youtube className="w-5 h-5 text-[#FF0000]" />;
      default: return <ExternalLink className="w-5 h-5 text-white" />;
    }
  };

  const getRichIcon = (type: string) => {
    switch (type) {
      case "telegram": return <Send className="w-5 h-5 text-[#229ED9]" />;
      case "file-text": return <FileText className="w-5 h-5 text-[#00d2ff]" />;
      case "sparkles": return <Sparkles className="w-5 h-5 text-[#A4F4FD]" />;
      default: return <ExternalLink className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section className="relative z-10 w-full pt-4 pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 auto-rows-[minmax(115px,auto)]">
        
        {/* 1. Flagship Showcase (Col-Span 4) */}
        <TiltCard
          as="a"
          href={profileData.featuredProject.url}
          target="_blank"
          rel="noopener noreferrer"
          className="sm:col-span-4 cursor-pointer"
          spotlightColor="#00d2ff"
          isAntigravityActive={isAntigravityActive}
          floatDelay={0}
        >
          <div className="p-6 sm:p-7 flex flex-col justify-between h-full min-h-[175px]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[10px] font-mono font-bold tracking-wider text-[#00d2ff] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-pulse" />
                  {profileData.featuredProject.badge}
                </div>
                <h3 className="mt-3 text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  {profileData.featuredProject.title}
                </h3>
              </div>
              <div className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 group-hover:text-white group-hover:bg-white/15 transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/60 mt-2 line-clamp-2 leading-relaxed">
              {profileData.featuredProject.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {profileData.featuredProject.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-white/80">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-[11px] font-mono text-[#00d2ff]">
                {profileData.featuredProject.stats}
              </span>
            </div>
          </div>
        </TiltCard>

        {/* 2. GitHub Activity (Col-Span 2) */}
        <TiltCard
          as="a"
          href={profileData.githubMetrics.url}
          target="_blank"
          rel="noopener noreferrer"
          className="sm:col-span-2 cursor-pointer"
          spotlightColor="#10B981"
          isAntigravityActive={isAntigravityActive}
          floatDelay={0.4}
        >
          <div className="p-5 sm:p-6 flex flex-col justify-between h-full min-h-[160px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <GitBranch className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide">GitHub Pulse</h4>
                  <p className="text-[11px] text-white/50">{profileData.githubMetrics.publicRepos} Public Repos</p>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                {profileData.githubMetrics.commitsThisYear}
              </span>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-white/50 flex items-center gap-1.5">
                  <GitCommit className="w-3.5 h-3.5 text-emerald-400" />
                  Activity Matrix
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  {profileData.githubMetrics.activeStreakDays}d Streak
                </span>
              </div>
              <div className="grid grid-cols-14 gap-1 p-2 rounded-xl bg-black/40 border border-white/5">
                {commitMatrix.map((cls, i) => (
                  <div key={i} className={`h-2 rounded-[2px] ${cls}`} />
                ))}
              </div>
            </div>
          </div>
        </TiltCard>

        {/* 3. Telegram VIP Channel (Col-Span 2) */}
        <TiltCard
          as="a"
          href={profileData.telegramCommunity.url}
          target="_blank"
          rel="noopener noreferrer"
          className="sm:col-span-2 cursor-pointer"
          spotlightColor="#229ED9"
          isAntigravityActive={isAntigravityActive}
          floatDelay={0.8}
        >
          <div className="p-5 sm:p-6 flex flex-col justify-between h-full min-h-[160px]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#229ED9]/20 text-[#229ED9] border border-[#229ED9]/40 shadow-[0_0_20px_rgba(34,158,217,0.3)]">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{profileData.telegramCommunity.channelName}</h4>
                  <p className="text-[11px] font-mono text-white/50">{profileData.telegramCommunity.handle}</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/50" />
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#229ED9] animate-pulse" />
                <span className="text-white/80 font-medium">{profileData.telegramCommunity.memberCount}</span>
              </div>
              <span className="text-[11px] text-white/50 font-mono">{profileData.telegramCommunity.activityStatus}</span>
            </div>
          </div>
        </TiltCard>

        {/* 4. Social Magnetic Tiles (Col-Span 1 Each) */}
        {profileData.socials.map((social, index) => (
          <TiltCard
            key={social.id}
            as="a"
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:col-span-1 cursor-pointer"
            spotlightColor={social.spotlightColor}
            isAntigravityActive={isAntigravityActive}
            floatDelay={1 + index * 0.2}
          >
            <div className="p-4 flex flex-col justify-between h-full min-h-[115px]">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl border border-white/10" style={{ backgroundColor: social.accentBg }}>
                  {getSocialIcon(social.id)}
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white tracking-wide">{social.platform}</h5>
                <p className="text-[10px] text-white/50 truncate mt-0.5">{social.handle}</p>
              </div>
            </div>
          </TiltCard>
        ))}

        {/* 5. Rich Link Rows (Col-Span 4 Each) */}
        {profileData.richLinks.map((link, idx) => (
          <TiltCard
            key={link.id}
            as="a"
            href={link.url}
            target={link.isExternal ? "_blank" : undefined}
            rel={link.isExternal ? "noopener noreferrer" : undefined}
            className="sm:col-span-4 cursor-pointer"
            spotlightColor={link.spotlightColor}
            isAntigravityActive={isAntigravityActive}
            floatDelay={1.8 + idx * 0.25}
          >
            <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl border border-white/10 shrink-0" style={{ backgroundColor: `${link.spotlightColor}18` }}>
                  {getRichIcon(link.iconType)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">{link.title}</h4>
                    {link.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/10 border border-white/15 text-[#00d2ff]">
                        {link.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/60 mt-0.5 line-clamp-1">{link.subtitle}</p>
                </div>
              </div>
              <div className="p-2 rounded-full bg-white/5 text-white/50 group-hover:text-white transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
