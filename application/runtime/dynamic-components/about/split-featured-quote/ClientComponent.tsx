"use client";

import React from 'react';
import { placeholderImage, cx } from '../../_shared';

// About 10: split with featured quote
export default function About10({ className = '' }) {
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Empowering Innovation</h2>
          <p className="text-lg text-gray-700 mb-6">
            Since our founding, we've been committed to pushing the boundaries of what's possible. Our platform has helped thousands of teams work smarter and faster.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
            <p className="text-xl text-gray-800 italic">
              "This company transformed how we do business. Highly recommended!"
            </p>
            <p className="text-sm text-gray-600 mt-2">— CEO, Fortune 500 Company</p>
          </div>
          <a href="#" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700">
            Get in Touch
          </a>
        </div>
        <div>
          <img src={placeholderImage(600, 500, 'Innovation')} alt="Innovation" className="rounded-lg shadow-xl w-full" />
        </div>
      </div>
    </section>
  );
}
