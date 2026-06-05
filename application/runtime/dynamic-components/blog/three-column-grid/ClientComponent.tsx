"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cx } from '../../_shared';

// Laptop SVG Fallback for Post 1 and 3
const LaptopSvg = () => (
  <div className="w-full h-48 bg-gradient-to-br from-slate-900 to-indigo-950 flex items-center justify-center relative overflow-hidden rounded-t-2xl">
    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]"></div>
    <div className="absolute w-36 h-36 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
    <div className="relative w-44 flex flex-col items-center select-none transform hover:scale-105 transition-transform duration-300">
      <div className="w-36 h-24 bg-slate-800 rounded-t-lg border-2 border-slate-600 shadow-2xl relative flex items-center justify-center overflow-hidden">
        <div className="absolute w-24 h-24 bg-cyan-500/25 rounded-full blur-xl"></div>
        <div className="w-full h-full p-1 bg-slate-950 flex items-center justify-center">
          <svg className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
      <div className="w-44 h-2 bg-slate-600 rounded-b-md relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-0.5 bg-slate-500"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-slate-700 rounded-b-sm"></div>
      </div>
      <div className="w-44 h-1.5 bg-slate-700 rounded-b-lg shadow-lg"></div>
    </div>
  </div>
);

// Banana Techi x Dhimora Branding SVG Fallback for Post 2
const BrandingSvg = () => (
  <div className="w-full h-48 bg-[#fdfbf7] dark:bg-slate-900 flex items-center justify-center relative overflow-hidden rounded-t-2xl border-b border-border">
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-1.5">
        <span className="text-3.5xl animate-bounce">🍌</span>
        <div className="flex flex-col">
          <span className="font-extrabold text-sm tracking-tight text-slate-800 dark:text-slate-200 leading-none">banana</span>
          <span className="font-bold text-xs text-yellow-500 leading-none">Techi</span>
        </div>
      </div>
      <span className="text-slate-400 font-medium text-sm">x</span>
      <div className="flex items-center space-x-1.5">
        <div className="w-7 h-7 rounded bg-slate-950 flex items-center justify-center text-white font-black text-sm shadow-md">
          d
        </div>
        <span className="font-extrabold text-xs tracking-tight text-slate-800 dark:text-slate-200 leading-none">dhimora</span>
      </div>
    </div>
  </div>
);

export default function BlogThreeColumnGrid({
  title = "Banana Tech Hub",
  subtitle = "Expert reviews, buying guides, and technical insights to help you choose the right gear.",
  post1_category = "BUYING GUIDE",
  post1_title = "Best Budget Laptops Under 50000 in Nepal",
  post1_excerpt = "Looking for a laptop that serves you well and doesn't cost you a fortune? Here are the best laptops under 50k...",
  post1_image = "",

  post2_category = "EXPERT REVIEW",
  post2_title = "Best ASUS Laptops for Students in Nepal",
  post2_excerpt = "Choosing the right model depends on your workload, budget, and long-term goals for students in Nepal.",
  post2_image = "",

  post3_category = "BUYING GUIDE",
  post3_title = "Best Budget Laptops Under 50000 in Nepal",
  post3_excerpt = "Looking for a laptop that serves you well and doesn't cost you a fortune? Here are the best laptops under 50k...",
  post3_image = "",

  className = ""
}) {
  return (
    <section className={cx("py-20 px-6 md:px-12 bg-background text-foreground", className)}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="text-muted text-sm md:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Post 1 Card */}
          <div className="bg-card text-card-foreground border border-border/80 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group">
            <div className="shrink-0">
              {post1_image ? (
                <img src={post1_image} alt={post1_title} className="w-full h-48 object-cover rounded-t-2xl" />
              ) : (
                <LaptopSvg />
              )}
            </div>
            <div className="p-6 flex flex-col flex-1">
              <span className="text-primary uppercase font-extrabold text-[10px] tracking-widest mb-3 block">
                {post1_category}
              </span>
              <h3 className="text-foreground font-extrabold text-lg md:text-xl mb-3 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {post1_title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                {post1_excerpt}
              </p>
              <div className="flex items-center text-primary font-bold text-sm hover:underline cursor-pointer mt-auto shrink-0">
                <span>Read More</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Post 2 Card */}
          <div className="bg-card text-card-foreground border border-border/80 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group">
            <div className="shrink-0">
              {post2_image ? (
                <img src={post2_image} alt={post2_title} className="w-full h-48 object-cover rounded-t-2xl" />
              ) : (
                <BrandingSvg />
              )}
            </div>
            <div className="p-6 flex flex-col flex-1">
              <span className="text-primary uppercase font-extrabold text-[10px] tracking-widest mb-3 block">
                {post2_category}
              </span>
              <h3 className="text-foreground font-extrabold text-lg md:text-xl mb-3 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {post2_title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                {post2_excerpt}
              </p>
              <div className="flex items-center text-primary font-bold text-sm hover:underline cursor-pointer mt-auto shrink-0">
                <span>Read More</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Post 3 Card */}
          <div className="bg-card text-card-foreground border border-border/80 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group">
            <div className="shrink-0">
              {post3_image ? (
                <img src={post3_image} alt={post3_title} className="w-full h-48 object-cover rounded-t-2xl" />
              ) : (
                <LaptopSvg />
              )}
            </div>
            <div className="p-6 flex flex-col flex-1">
              <span className="text-primary uppercase font-extrabold text-[10px] tracking-widest mb-3 block">
                {post3_category}
              </span>
              <h3 className="text-foreground font-extrabold text-lg md:text-xl mb-3 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {post3_title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                {post3_excerpt}
              </p>
              <div className="flex items-center text-primary font-bold text-sm hover:underline cursor-pointer mt-auto shrink-0">
                <span>Read More</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
