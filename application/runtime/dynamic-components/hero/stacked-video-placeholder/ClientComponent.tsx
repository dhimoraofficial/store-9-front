"use client";

import React from 'react';
import { placeholderImage, cx } from '../../_shared';

// Hero 6: stacked layout with video embed placeholder
export default function Hero6({ className = '' }) {
  return (
    <section className={cx('bg-gray-900 text-white py-16 px-4', className)}>
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Watch our story unfold
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Discover how we help thousands of businesses succeed.
        </p>
        <div className="relative w-full aspect-video bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
          <img src={placeholderImage(1200, 675, 'Video Thumbnail')} alt="Video" className="w-full h-full object-cover" />
          <button className="absolute inset-0 flex items-center justify-center text-6xl hover:text-gray-300">
            ▶️
          </button>
        </div>
      </div>
    </section>
  );
}
