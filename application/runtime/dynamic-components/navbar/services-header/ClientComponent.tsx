"use client";

    import { useEffect, useState } from 'react';
import { cx, NavbarSpacer, sampleLinks } from '../../_shared';

// Navbar 1: Classic professional with subtle glassmorphism
export default function Navbar1({ logo = 'Brand', links = sampleLinks, className = '' }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={cx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'backdrop-blur-xl bg-white/95 shadow-lg border-b border-gray-200' : 'bg-white/90 backdrop-blur-md border-b border-gray-100',
        className
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className={cx(
                  'w-12 h-12 rounded-xl flex items-center justify-center font-black text-2xl transition-all duration-300',
                  scrolled 
                    ? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-lg' 
                    : 'bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-md'
                )}>
                  {logo.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900 tracking-tight">
                    {logo}
                  </span>
                  <span className="text-xs text-gray-500 font-medium tracking-wide">Professional Services</span>
                </div>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-1">
              {links.map((l, i) => (
                <a
                  key={l}
                  href="#"
                  className={cx(
                    'px-5 py-2.5 rounded-lg text-sm font-semibold transition-all group relative',
                    'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                  )}
                >
                  <span className="relative z-10">{l}</span>
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-indigo-600 group-hover:w-8 transition-all duration-300 rounded-full" />
                </a>
              ))}
            </nav>
            
            <div className="hidden md:flex items-center space-x-3">
              <button className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all">
                Sign In
              </button>
              <button className={cx(
                'px-6 py-2.5 rounded-lg text-sm font-bold text-white transition-all shadow-md hover:shadow-lg',
                'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700'
              )}>
                Get Started →
              </button>
            </div>
            
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
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
          
          {open && (
            <div className="md:hidden py-4 space-y-1 border-t border-gray-200 mt-4">
              {links.map((l) => (
                <a
                  key={l}
                  href="#"
                  className="block px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                >
                  {l}
                </a>
              ))}
              <div className="pt-4 space-y-2">
                <a
                  href="#"
                  className="block px-4 py-3 rounded-lg text-sm font-semibold text-center text-gray-700 hover:bg-gray-100 transition-all"
                >
                  Sign In
                </a>
                <a
                  href="#"
                  className="block px-4 py-3 rounded-lg text-sm font-bold text-center text-white bg-gradient-to-r from-indigo-600 to-blue-600 shadow-md"
                >
                  Get Started →
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
      <NavbarSpacer height="h-20" />
    </>
  );
}
