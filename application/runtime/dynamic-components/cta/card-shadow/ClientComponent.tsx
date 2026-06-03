"use client";

import React from 'react';
import { cx } from '../../_shared';

// CTA 4: card-style with shadow
export default function CTA4({ className = '' }) {
  return (
    <section className={cx('bg-gray-100 py-16 px-4', className)}>
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl p-8 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Join our community</h2>
          <p className="text-lg md:text-xl mb-8">Connect with like-minded professionals.</p>
          <a href="#" className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100">
            Join Now
          </a>
        </div>
      </div>
    </section>
  );
}
