"use client";

import { motion } from "framer-motion";
import {
  Star,
  Download,
  Gift,
  ArrowRight,
  Share2,
  MessageCircle,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { rummyApps } from "@/data/rummyApps";
import { useState,useRef,useEffect, memo } from "react";
import { RummyApp } from "@/types/rummyApps";

interface AppCardProps {
  app: RummyApp;
  index: number;
}

const socialLinks = (appName: string, slug: string) => {
  const url = `https://yourdomain.com/app/${slug}`;

  return [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(
        `🔥 Play ${appName} & Win Real Cash 💰\nDownload 👉 ${url}`
      )}`,
      color: "bg-green-500",
    },
    {
      icon: Send,
      label: "Telegram",
      href: `https://t.me/share/url?url=${url}&text=${appName}`,
      color: "bg-sky-500",
    },
  ];
};



const AppCard = ({ app, index }: AppCardProps) => {
  const [showShare, setShowShare] = useState(false);
  const shareRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
        setShowShare(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group relative bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-border hover:border-primary/20"
    >
      {/* 🔥 MAIN IMAGE - USING app.image */}
      <div className="relative h-40 w-full overflow-hidden">
        <img
         src={app.images?.[0] || app.image}// ✅ Fixed: using app.image instead of hardcoded path
          alt={app.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = "https://source.unsplash.com/400x300/?cards";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {app.featured && (
          <span className="absolute top-3 right-3 px-2 py-1 text-[10px] font-bold bg-yellow-400 text-black rounded-full">
            Featured
          </span>
        )}
      </div>

      <div className={`h-1.5 bg-gradient-to-r ${app.color}`} />

      <div className="p-5">
        {/* HEADER */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden border bg-white shadow-sm flex-shrink-0">
            <img
              src={app.logo}
              alt={app.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "https://source.unsplash.com/100x100/?app,logo";
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <Link
              to={`/${app.slug}`}
              className="font-bold text-foreground text-base truncate hover:text-primary block"
            >
              {app.name}
            </Link>

            <p className="text-muted-foreground text-xs mt-0.5 truncate">
              {app.tagline}
            </p>

            <div className="flex items-center gap-1.5 mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(app.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>

              <span className="text-xs font-semibold">{app.rating}</span>
              <span className="text-[10px] text-muted-foreground">
                ({app.reviews})
              </span>
            </div>

            <p className="text-[10px] text-green-500 mt-1">
              ✔ Safe • Instant Withdrawal
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div className="bg-muted/60 rounded-xl p-2.5 text-center">
            <div className="flex justify-center gap-1 mb-1">
              <Gift className="w-3 h-3 text-yellow-500" />
              <span className="text-[10px] uppercase">Bonus</span>
            </div>
            <span className="text-sm font-bold">{app.bonus}</span>
          </div>

          <div className="bg-muted/60 rounded-xl p-2.5 text-center">
            <div className="flex justify-center gap-1 mb-1">
              <ArrowRight className="w-3 h-3 text-blue-500" />
              <span className="text-[10px] uppercase">Min</span>
            </div>
            <span className="text-sm font-bold">{app.minWithdraw}</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2">
          <a
            href={app.downloadUrl} // ✅ Fixed: using downloadUrl instead of slug
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-11 rounded-xl bg-red-600 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </a>

          <div className="relative" ref={shareRef}>
            <button
              onClick={() => setShowShare(!showShare)}
              className="h-11 w-11 rounded-xl bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {showShare && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute bottom-full right-0 mb-2 flex gap-1.5 bg-card border rounded-xl p-2 shadow-lg z-50"
              >
                {socialLinks(app.name, app.slug).map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 rounded-lg ${s.color} flex items-center justify-center text-white hover:opacity-80 transition-opacity`}
                  >
                    <s.icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(AppCard);
