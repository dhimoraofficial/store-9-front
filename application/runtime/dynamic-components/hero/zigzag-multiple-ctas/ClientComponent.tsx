"use client";

import React from 'react';
import { placeholderImage, cx } from '../../_shared';

// Hero 10: zigzag layout with multiple CTAs
export default function Hero10({ className = '' }) {
  return (
    <section className={cx('bg-yellow-50 py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="order-2 md:order-1">
            <img src={placeholderImage(600, 400, 'Feature 1')} alt="Feature 1" className="rounded-lg shadow-md w-full" />
          </div>
          <div className="order-1 md:order-2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Transform your workflow
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Powerful integrations and seamless collaboration.
            </p>
            <a href="#" className="inline-block bg-yellow-500 text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-yellow-600">
              Try it Free
            </a>
          </div>
        </div>
        <div className="text-center">
          <p className="text-gray-600 mb-4">Trusted by 10,000+ companies worldwide</p>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="text-2xl font-semibold text-gray-400">Company A</span>
            <span className="text-2xl font-semibold text-gray-400">Company B</span>
            <span className="text-2xl font-semibold text-gray-400">Company C</span>
          </div>
        </div>
      </div>
    </section>
  );
}
