"use client";

"use client";

import { useState } from 'react';
import { cx, sampleLinks } from '../../_shared';

// Navbar 5: Classic transparent overlay for hero sections
export default function Navbar5({ logo = 'Brand', links = sampleLinks, className = '' }) {
    const [open, setOpen] = useState(false);
    const [megaOpen, setMegaOpen] = useState(false);

    return (
        <>
            <div className={cx('absolute top-0 left-0 right-0 z-50', className)}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                    <div className="backdrop-blur-xl bg-white/95 border border-white/40 rounded-2xl shadow-2xl">
                        <div className="flex items-center justify-between px-6 py-5 h-20">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 rounded-xl bg-white border-2 border-indigo-200 flex items-center justify-center shadow-md">
                                    <span className="text-2xl font-black text-indigo-600">{logo.charAt(0)}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-gray-900 tracking-tight">{logo}</span>
                                    <span className="text-xs text-gray-500 font-medium">Premium Quality</span>
                                </div>
                            </div>

                            <div className="hidden md:flex items-center space-x-1">
                                {links.slice(0, 4).map((l) => (
                                    <a
                                        key={l}
                                        href="#"
                                        onMouseEnter={() => l === 'Services' && setMegaOpen(true)}
                                        onMouseLeave={() => setMegaOpen(false)}
                                        className="relative px-5 py-2.5 rounded-2xl text-white font-semibold hover:bg-white/20 transition-all group"
                                    >
                                        {l}
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 group-hover:w-3/4 transition-all duration-300" />
                                    </a>
                                ))}
                                <a href="#" className="ml-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold shadow-lg shadow-pink-500/50 hover:shadow-xl hover:shadow-pink-500/60 transition-all hover:scale-105">
                                    Sign Up
                                </a>
                            </div>

                            <div className="md:hidden">
                                <button onClick={() => setOpen(!open)} className="p-2.5 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-all">
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
                            <div className="md:hidden px-6 pb-6 space-y-2 border-t border-white/20 pt-4 animate-in slide-in-from-top">
                                {links.map((l) => (
                                    <a key={l} href="#" className="block px-4 py-3 rounded-xl text-white hover:bg-white/20 transition-all font-medium">
                                        {l}
                                    </a>
                                ))}
                                <a href="#" className="block mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold text-center shadow-lg">
                                    Sign Up
                                </a>
                            </div>
                        )}
                    </div>

                    {megaOpen && (
                        <div
                            onMouseEnter={() => setMegaOpen(true)}
                            onMouseLeave={() => setMegaOpen(false)}
                            className="absolute left-4 right-4 mt-2 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 animate-in fade-in slide-in-from-top-2"
                        >
                            <div className="grid grid-cols-3 gap-8">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-4">Design</h3>
                                    <div className="space-y-3">
                                        {['UI/UX', 'Graphics', 'Branding'].map((item) => (
                                            <a key={item} href="#" className="block text-white/80 hover:text-white hover:translate-x-1 transition-all">
                                                {item}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-4">Development</h3>
                                    <div className="space-y-3">
                                        {['Web Apps', 'Mobile', 'API'].map((item) => (
                                            <a key={item} href="#" className="block text-white/80 hover:text-white hover:translate-x-1 transition-all">
                                                {item}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-4">Marketing</h3>
                                    <div className="space-y-3">
                                        {['SEO', 'Content', 'Social Media'].map((item) => (
                                            <a key={item} href="#" className="block text-white/80 hover:text-white hover:translate-x-1 transition-all">
                                                {item}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
