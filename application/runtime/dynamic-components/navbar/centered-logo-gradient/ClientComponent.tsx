"use client";

"use client";
import React, { useState } from 'react';
import { sampleLinks, cx, NavbarSpacer } from '../../_shared';

// Navbar 2: Centered logo with gradient background and animated links
export default function Navbar2({ logo = 'BRAND', links = sampleLinks, className = '' }) {
  const [open, setOpen] = useState(false);
  const left = links.slice(0, Math.ceil(links.length / 2));
  const right = links.slice(Math.ceil(links.length / 2));
  return (
    <header className={cx('bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl relative overflow-hidden', className)}>
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          <nav className="hidden md:flex space-x-8 items-center">
            {left.map((l) => (
              <a key={l} href="#" className="text-white/90 hover:text-white font-medium transition-all hover:scale-110 relative group">
                {l}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center border-2 border-white/30 shadow-xl">
              <span className="text-2xl">💎</span>
            </div>
            <span className="text-2xl font-black text-white tracking-wider">{logo}</span>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center">
            {right.map((l) => (
              <a key={l} href="#" className="text-white/90 hover:text-white font-medium transition-all hover:scale-110 relative group">
                {l}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>
          
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="p-2 text-white">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {open && (
          <div className="md:hidden py-4 space-y-2 animate-in slide-in-from-top">
            {links.map((l) => (
              <a key={l} href="#" className="block px-4 py-3 rounded-xl text-base text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm font-medium transition-all">
                {l}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
