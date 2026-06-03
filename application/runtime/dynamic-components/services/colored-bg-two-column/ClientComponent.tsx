"use client";

import React from 'react';
import { sampleServices, cx } from '../../_shared';

// Services 4: colored background cards in 2 columns
export default function Services4({ items = sampleServices, className = '' }) {
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500'];
  return (
    <section className={cx('bg-gray-900 py-16 px-4', className)}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <div key={i} className={`${colors[i % colors.length]} text-white rounded-lg p-8`}>
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-blue-50">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
