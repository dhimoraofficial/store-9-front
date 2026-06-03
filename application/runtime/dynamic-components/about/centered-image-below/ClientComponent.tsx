"use client";

import React from 'react';
import { placeholderImage, cx } from '../../_shared';

// About 3: centered text with image below
export default function About3({ className = '' }) {
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <p className="text-xl text-gray-700 mb-8">
          To revolutionize the way businesses operate through cutting-edge technology and exceptional service.
        </p>
        <p className="text-lg text-gray-600 mb-12">
          We believe in transparency, innovation, and putting our customers first. Every decision we make is guided by these core values.
        </p>
        <img src={placeholderImage(800, 450, 'Mission')} alt="Mission" className="rounded-xl shadow-2xl w-full" />
      </div>
    </section>
  );
}
