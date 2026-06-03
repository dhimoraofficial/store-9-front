"use client";

"use client";
import React, { useState } from 'react';
import { sampleLinks, cx } from '../../_shared';

// Navbar 7: Centered stacked with gradient background and animation
export default function Navbar7({ logo = '🌟 Brand', links = sampleLinks, className = '' }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={cx('relative bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border-b-4 border-gradient-to-r from-amber-400 via-orange-500 to-rose-500 shadow-xl overflow-hidden', className)}>
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-500 to-rose-500 rounded-full blur-3xl animate-pulse delay-75" />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-rose-500 blur-xl opacity-60 rounded-full" />
            <div className="relative w-16 h-16 rounded-3xl bg-white shadow-2xl flex items-center justify-center border-2 border-amber-200">
              <span className="text-3xl">🌟</span>
            </div>
          </div>
          <h1 className="mt-4 text-4xl font-black bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
            {logo.replace('🌟 ', '')}
          </h1>
        </div>
        
        <nav className="hidden md:flex justify-center items-center space-x-2 flex-wrap gap-2">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="relative px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-sm text-gray-800 font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:bg-white border border-amber-200/50 group"
            >
              {l}
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-500 opacity-0 group-hover:opacity-10 transition-opacity" />
            </a>
          ))}
        </nav>
        
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-sm text-gray-800 font-bold shadow-lg hover:shadow-xl transition-all border border-amber-200">
            {open ? 'Close Menu' : 'Open Menu'}
          </button>
        </div>
        
        {open && (
          <div className="mt-6 space-y-2 animate-in fade-in slide-in-from-top">
            {links.map((l) => (
              <a key={l} href="#" className="block px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-sm text-gray-800 font-semibold shadow-lg hover:shadow-xl transition-all border border-amber-200/50">
                {l}
              </a>
            ))}
          </div>
        )}
      </div>
      
      <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500" />
    </header>
  );
}
