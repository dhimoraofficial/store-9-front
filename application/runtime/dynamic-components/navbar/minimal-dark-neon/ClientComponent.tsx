"use client";

"use client";
import React, { useState } from 'react';
import { sampleLinks, cx } from '../../_shared';

// Navbar 9: Minimal dark with neon CTA
export default function Navbar9({ logo = '⚫ Brand', links = sampleLinks, className = '' }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className={cx('bg-black text-white shadow-2xl relative overflow-hidden', className)}>
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />
      
      <div className="relative z-10 flex items-center justify-between px-6 lg:px-12 h-16">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/50">
            <span className="text-lg">⚫</span>
          </div>
          <span className="font-black text-xl">{logo.replace('⚫ ', '')}</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          {links.map((l) => (
            <a key={l} href="#" className="text-gray-300 hover:text-white text-sm font-medium transition-colors relative group">
              {l}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a href="#" className="relative ml-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-sm overflow-hidden group">
            <span className="relative z-10">Sign up</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 blur-xl opacity-50" />
          </a>
        </div>
        
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {open && (
        <div className="md:hidden px-6 pb-6 space-y-2 border-t border-white/10 pt-4 animate-in slide-in-from-top">
          {links.map((l) => (
            <a key={l} href="#" className="block py-3 text-gray-300 hover:text-white transition-colors font-medium">
              {l}
            </a>
          ))}
          <a href="#" className="block mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-center">
            Sign up
          </a>
        </div>
      )}
    </nav>
  );
}
