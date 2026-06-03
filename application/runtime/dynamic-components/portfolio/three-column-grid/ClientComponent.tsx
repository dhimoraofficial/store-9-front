"use client";

import React from 'react';
import { samplePortfolio, cx } from '../../_shared';

// Portfolio 1: 3-column grid
export default function Portfolio1({ items = samplePortfolio, className = '' }) {
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Our Portfolio</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <img src={item.image} alt={item.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-center p-4">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm">{item.tags.join(', ')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
