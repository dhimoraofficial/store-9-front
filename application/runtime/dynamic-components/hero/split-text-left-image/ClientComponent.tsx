"use client";

import React from 'react';
import { placeholderImage, cx } from '../../_shared';

// Hero 2: split layout (text left, image right)
export default function Hero2({ className = '' }) {
  return (
    <section className={cx('bg-white py-12 md:py-20', className)}>
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Grow your business with us
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Reliable solutions to scale your company and reach more customers.
          </p>
          <a href="#" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700">
            Start Free Trial
          </a>
        </div>
        <div>
          <img src={placeholderImage(600, 400, 'Hero')} alt="Hero" className="rounded-lg shadow-lg w-full" />
        </div>
      </div>
    </section>
  );
}
