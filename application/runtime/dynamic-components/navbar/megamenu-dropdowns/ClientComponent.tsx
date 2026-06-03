"use client";

"use client";
import React, { useState } from 'react';
import { sampleLinks, cx } from '../../_shared';

// Navbar 6: Mega-menu with gradient hover and premium dropdowns
export default function Navbar6({ logo = '💎 Brand', links = sampleLinks, className = '' }) {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  return (
    <nav className={cx('bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white shadow-2xl', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
              <span className="text-2xl">💎</span>
            </div>
            <span className="text-2xl font-black">{logo.replace('💎 ', '')}</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {links.map((l) => (
              <div key={l} className="relative group">
                <button
                  onMouseEnter={() => setDropdown(l)}
                  onMouseLeave={() => setDropdown(null)}
                  className="px-5 py-2.5 rounded-xl hover:bg-white/10 font-semibold transition-all flex items-center space-x-1"
                >
                  <span>{l}</span>
                  <svg className="w-4 h-4 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdown === l && (
                  <div
                    onMouseEnter={() => setDropdown(l)}
                    onMouseLeave={() => setDropdown(null)}
                    className="absolute left-0 top-full mt-2 w-64 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2"
                  >
                    <div className="space-y-1">
                      {['Premium', 'Enterprise', 'Solutions'].map((item) => (
                        <a key={item} href="#" className="group/item flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/10 transition-all">
                          <span className="font-medium">{item}</span>
                          <svg className="w-4 h-4 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <a href="#" className="ml-4 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 font-bold shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 transition-all hover:scale-105">
              Contact Us
            </a>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
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
      </div>
      {open && (
        <div className="md:hidden px-4 pb-6 space-y-2 border-t border-white/10 pt-4 animate-in slide-in-from-top">
          {links.map((l) => (
            <a key={l} href="#" className="block px-4 py-3 rounded-xl hover:bg-white/10 transition-all font-medium">
              {l}
            </a>
          ))}
          <a href="#" className="block mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 font-bold text-center shadow-lg">
            Contact Us
          </a>
        </div>
      )}
    </nav>
  );
}
