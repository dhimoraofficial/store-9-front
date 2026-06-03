"use client";

"use client";
import React, { useState, useEffect } from 'react';
import { sampleLinks, cx } from '../../_shared';

// Navbar 10: Animated gradient with particles effect and scroll transformation
export default function Navbar10({ logo = '🌈 Brand', links = sampleLinks, className = '' }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={cx(
      'sticky top-0 z-50 transition-all duration-500',
      scrolled ? 'bg-white/95 backdrop-blur-xl shadow-2xl' : 'bg-transparent',
      className
    )}>
      <div className={cx(
        'absolute inset-0 transition-opacity duration-500',
        scrolled ? 'opacity-0' : 'opacity-100'
      )}>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-cyan-500" style={{ backgroundSize: '200% 200%', animation: 'gradient 15s ease infinite' }} />
        {/* Particles effect */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 13) % 100}%`,
              animation: `float ${5 + (i % 5)}s linear infinite`,
              animationDelay: `${(i % 3)}s`,
              opacity: 0.6
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className={cx(
              'w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-500',
              scrolled
                ? 'bg-gradient-to-br from-pink-500 to-purple-600'
                : 'bg-white/20 backdrop-blur-xl border-2 border-white/30'
            )}>
              <span className="text-2xl">🌈</span>
            </div>
            <span className={cx(
              'text-2xl font-black transition-all duration-500',
              scrolled
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent'
                : 'text-white drop-shadow-lg'
            )}>
              {logo.replace('🌈 ', '')}
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {links.slice(0, 5).map((l) => (
              <a
                key={l}
                href="#"
                className={cx(
                  'px-5 py-2.5 rounded-xl font-semibold transition-all',
                  scrolled
                    ? 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                    : 'text-white hover:bg-white/20 backdrop-blur-sm'
                )}
              >
                {l}
              </a>
            ))}
            <a href="#" className={cx(
              'ml-4 px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105',
              scrolled
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-purple-500/50'
                : 'bg-white text-purple-600 shadow-white/50'
            )}>
              Get Started
            </a>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className={cx(
                'p-2.5 rounded-xl shadow-lg transition-all',
                scrolled
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/20 backdrop-blur-xl text-white border border-white/30'
              )}
            >
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
          <div className={cx(
            'md:hidden mt-2 mb-4 pb-6 space-y-2 rounded-2xl p-4 animate-in slide-in-from-top',
            scrolled ? 'bg-gray-50' : 'bg-white/20 backdrop-blur-xl border border-white/20'
          )}>
            {links.map((l) => (
              <a
                key={l}
                href="#"
                className={cx(
                  'block px-4 py-3 rounded-xl font-medium transition-all',
                  scrolled
                    ? 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                    : 'text-white hover:bg-white/20'
                )}
              >
                {l}
              </a>
            ))}
            <a href="#" className={cx(
              'block mt-4 px-6 py-3 rounded-xl font-bold text-center shadow-lg',
              scrolled
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
                : 'bg-white text-purple-600'
            )}>
              Get Started
            </a>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          25% { opacity: 0.8; }
          75% { opacity: 0.8; }
          100% { transform: translateY(-80px) translateX(30px); opacity: 0; }
        }
      `}</style>
    </nav>
  );
}
