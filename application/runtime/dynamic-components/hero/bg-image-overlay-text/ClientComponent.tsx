"use client";

import React from 'react';
import { placeholderImage, cx } from '../../_shared';

// Hero 3: background image with overlay text
export default function Hero3({ className = '' }) {
  return (
    <section
      className={cx('relative bg-cover bg-center py-32 px-4', className)}
      style={{ backgroundImage: `url(${placeholderImage(1920, 1080, 'Background')})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative max-w-3xl mx-auto text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to our platform</h1>
        <p className="text-lg md:text-xl mb-8">
          Transform your ideas into reality with cutting-edge tools.
        </p>
        <a href="#" className="bg-white text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-gray-100">
          Explore Now
        </a>
      </div>
    </section>
  );
}
