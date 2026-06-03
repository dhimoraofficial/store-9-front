"use client";

import React from 'react';
import { samplePortfolio, cx } from '../../_shared';

// Portfolio 10: split screen layout
export default function Portfolio10({ items = samplePortfolio, className = '' }) {
  return (
    <section className={cx('bg-gray-100 py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Portfolio Highlights</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {items.slice(0, 6).map((item, i) => (
            <div key={i} className="relative group overflow-hidden rounded-lg shadow-lg h-64">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-gray-200 text-sm">{item.tags.join(' • ')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
