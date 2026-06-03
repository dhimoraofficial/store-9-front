"use client";

import React from 'react';
import { placeholderImage, cx } from '../../_shared';

// Hero 8: dual CTA with feature list
export default function Hero8({ className = '' }) {
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Build, deploy, scale
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Everything you need in one powerful platform.
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-gray-700">Fast deployment</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-gray-700">Auto scaling</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-gray-700">24/7 support</span>
            </li>
          </ul>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700">
              Start Now
            </a>
            <a href="#" className="text-blue-600 underline font-medium hover:text-blue-700">
              View Documentation
            </a>
          </div>
        </div>
        <div>
          <img src={placeholderImage(600, 500, 'Dashboard')} alt="Dashboard" className="rounded-lg shadow-lg w-full" />
        </div>
      </div>
    </section>
  );
}
