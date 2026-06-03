"use client";

"use client";
import React, { useState } from 'react';
import { sampleLinks, cx, NavbarSpacer } from '../../_shared';

// Navbar 3: Classic corporate with search and clear sections
export default function Navbar3({ logo = 'Corporation', links = sampleLinks, className = '' }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  return (
    <>
      <div className={cx('bg-white border-b-2 border-gray-200 shadow-md', className)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center shadow-lg border-2 border-slate-200">
                  <span className="text-2xl font-black text-white">{logo.charAt(0)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900 tracking-tight uppercase">{logo}</span>
                  <span className="text-xs text-gray-500 font-semibold tracking-wider">SOLUTIONS</span>
                </div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {links.slice(0, 5).map((l) => (
                <a
                  key={l}
                  href="#"
                  className="group px-5 py-2.5 rounded-lg text-sm font-bold text-gray-700 hover:text-slate-900 hover:bg-slate-100 transition-all relative"
                >
                  <span>{l}</span>
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 bg-slate-700 group-hover:w-8 transition-all duration-300 rounded-full" />
                </a>
              ))}
            </nav>
            
            {/* Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-lg text-gray-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              <button className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 border border-gray-300 transition-all">
                Sign In
              </button>
              
              <button className="px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-slate-800 hover:bg-slate-900 shadow-md hover:shadow-lg transition-all">
                Get Started
              </button>
            </div>
            
            {/* Mobile Menu Button */}
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
          
          {/* Search Bar */}
          {searchOpen && (
            <div className="hidden md:block py-4 border-t border-gray-200 animate-in slide-in-from-top">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search our services, products, or resources..."
                  className="w-full px-5 py-3 pl-12 pr-12 rounded-xl border-2 border-gray-300 focus:border-slate-500 focus:outline-none text-sm font-medium"
                  autoFocus
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-3 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          {/* Mobile Menu */}
          {open && (
            <div className="md:hidden py-4 space-y-1 border-t border-gray-200">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-slate-500 focus:outline-none text-sm"
                />
              </div>
              {links.map((l) => (
                <a
                  key={l}
                  href="#"
                  className="block px-4 py-3 rounded-lg text-sm font-bold text-gray-700 hover:text-slate-900 hover:bg-slate-100 transition-all"
                >
                  {l}
                </a>
              ))}
              <div className="pt-4 space-y-2">
                <a href="#" className="block px-4 py-3 rounded-lg text-sm font-semibold text-center text-gray-700 hover:bg-gray-100 border border-gray-300 transition-all">
                  Sign In
                </a>
                <a href="#" className="block px-4 py-3 rounded-lg text-sm font-bold text-center text-white bg-slate-800 shadow-md">
                  Get Started
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <NavbarSpacer height="h-20" />
    </>
  );
}
