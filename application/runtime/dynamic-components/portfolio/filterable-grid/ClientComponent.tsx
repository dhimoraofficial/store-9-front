"use client";

import React, { useState } from 'react';
import { samplePortfolio, cx } from '../../_shared';

// Portfolio 6: filterable grid
export default function Portfolio6({ items = samplePortfolio, className = '' }) {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Web', 'Design'];
  return (
    <section className={cx('bg-gray-50 py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">Our Work</h2>
        <div className="flex justify-center space-x-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-md font-semibold ${
                filter === cat ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.tags.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
