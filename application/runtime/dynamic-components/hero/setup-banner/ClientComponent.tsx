"use client";

import React from 'react';
import { cx } from '../../_shared';

export default function SetupBanner({
  title = "Shop The Latest Tech",
  subtitle = "ELEVATE YOUR SETUP",
  buttonText = "Explore Collection",
  bgImage = "",
  className = ""
}) {
  const finalBgImage = bgImage || "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1600";

  return (
    <section 
      className={cx("relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-slate-900 text-white", className)}
      style={{
        backgroundImage: `url("${finalBgImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-950/45 z-10"></div>

      {/* Content Container */}
      <div className="relative max-w-4xl mx-auto px-6 text-center space-y-6 z-20">
        <span className="text-white/90 uppercase font-extrabold text-xs md:text-sm tracking-[0.2em] block drop-shadow-md">
          {subtitle}
        </span>
        <h2 className="text-3.5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-lg">
          {title}
        </h2>
        <div className="pt-2">
          <button className="px-8 py-3 bg-[#eab308] hover:bg-[#ca8a04] active:scale-[0.98] text-slate-950 font-extrabold text-sm rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
