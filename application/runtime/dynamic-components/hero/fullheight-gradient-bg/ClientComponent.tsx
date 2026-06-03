"use client";

import React from 'react';
import { placeholderImage, cx } from '../../_shared';

// Hero 9: full-height centered with gradient background
export default function Hero9({ className = '' }) {
  return (
    <section className={cx('min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4', className)}>
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
          The future is here
        </h1>
        <p className="text-xl md:text-2xl mb-10">
          Experience next-generation tools built for tomorrow.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#" className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100">
            Get Started
          </a>
          <a href="#" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
