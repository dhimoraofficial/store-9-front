"use client";

"use client";
import React, { useState } from 'react';
import { sampleLinks, cx } from '../../_shared';

// Navbar 4: Sidebar with gradient and icons
export default function Navbar4({ logo = '🎯 Brand', links = sampleLinks, className = '' }) {
  const [open, setOpen] = useState(false);
  const icons = ['🏠', '👤', '⚙️', '📊', '💼', '📧'];
  
  return (
    <div className={cx('md:flex', className)}>
      <aside className="hidden md:flex md:flex-col md:w-72 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 min-h-screen p-6 shadow-2xl relative overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 shadow-xl">
              <span className="text-2xl">🎯</span>
            </div>
            <span className="text-2xl font-black text-white">{logo.replace('🎯 ', '')}</span>
          </div>
          
          <nav className="space-y-2">
            {links.map((l, i) => (
              <a
                key={l}
                href="#"
                className="group flex items-center space-x-4 px-5 py-4 rounded-2xl text-white/90 hover:bg-white/20 hover:text-white transition-all backdrop-blur-sm border border-transparent hover:border-white/20 shadow-lg hover:shadow-xl"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{icons[i] || '📄'}</span>
                <span className="font-semibold text-lg">{l}</span>
              </a>
            ))}
          </nav>
          
          <div className="mt-auto pt-12">
            <a href="#" className="block w-full px-6 py-4 rounded-2xl bg-white text-purple-600 font-bold text-center shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              Upgrade Pro
            </a>
          </div>
        </div>
      </aside>
      
      <div className="flex-1 min-h-screen bg-gray-50">
        <div className="flex items-center justify-between px-6 py-5 md:hidden bg-white shadow-lg sticky top-0 z-40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg">
              <span className="text-xl">🎯</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">{logo.replace('🎯 ', '')}</span>
          </div>
          <button onClick={() => setOpen(!open)} className="p-2.5 rounded-xl bg-violet-50 text-violet-600 hover:bg-violet-100 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {open && (
          <div className="md:hidden px-6 py-4 bg-white shadow-lg animate-in slide-in-from-top">
            {links.map((l, i) => (
              <a key={l} href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-all my-1">
                <span className="text-xl">{icons[i] || '📄'}</span>
                <span className="font-medium">{l}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
