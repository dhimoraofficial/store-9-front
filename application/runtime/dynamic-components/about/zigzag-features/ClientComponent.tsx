"use client";

import React from 'react';
import { placeholderImage, cx } from '../../_shared';

// About 4: zigzag multi-section layout
export default function About4({ className = '' }) {
  const sections = [
    { title: 'Our Vision', desc: 'Building a better tomorrow through technology.' },
    { title: 'Our Values', desc: 'Integrity, innovation, and customer success.' },
  ];
  return (
    <section className={cx('bg-gray-100 py-16 px-4', className)}>
      <div className="max-w-6xl mx-auto space-y-16">
        {sections.map((sec, i) => (
          <div key={i} className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
            <div className={i % 2 === 0 ? 'order-1' : 'order-2'}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{sec.title}</h2>
              <p className="text-lg text-gray-700">{sec.desc}</p>
            </div>
            <div className={i % 2 === 0 ? 'order-2' : 'order-1'}>
              <img src={placeholderImage(600, 400, sec.title)} alt={sec.title} className="rounded-lg shadow-lg w-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
