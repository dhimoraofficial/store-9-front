"use client";

import React from 'react';
import { placeholderImage, cx } from '../../_shared';

// Hero 5: asymmetric layout (image left, text right)
export default function Hero5({ className = '' }) {
  return (
    <section className={cx('bg-gradient-to-br from-purple-50 to-pink-50 py-16', className)}>
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-5 gap-8 items-center">
        <div className="md:col-span-2">
          <img src={placeholderImage(500, 600, 'Hero')} alt="Hero" className="rounded-xl shadow-2xl w-full" />
        </div>
        <div className="md:col-span-3">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Experience innovation
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Cutting-edge technology to help you stay ahead.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700">
              Learn More
            </a>
            <a href="#" className="bg-white text-purple-600 border border-purple-600 px-6 py-3 rounded-md font-medium hover:bg-purple-50">
              Watch Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
