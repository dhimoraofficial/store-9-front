"use client";

import React from 'react';
import { placeholderImage, cx } from '../../_shared';

// Hero 1: full-width centered text with CTA buttons
export default function Hero1({ className = '' }) {
  return (
    <section className={cx('bg-gray-50 py-20 px-4', className)}>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Build amazing websites faster
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Create stunning, responsive components with Tailwind CSS.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#" className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700">
            Get Started
          </a>
          <a href="#" className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-indigo-50">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
