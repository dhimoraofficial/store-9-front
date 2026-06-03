"use client";

import React from 'react';
import { placeholderImage, cx } from '../../_shared';

// About 7: full-width image with overlay text
export default function About7({ className = '' }) {
  return (
    <section className={cx('relative', className)}>
      <div
        className="bg-cover bg-center h-96 flex items-center justify-center"
        style={{ backgroundImage: `url(${placeholderImage(1920, 800, 'About Background')})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative text-center text-white px-4 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Driven by Innovation</h2>
          <p className="text-xl">
            We're on a mission to change the world, one product at a time.
          </p>
        </div>
      </div>
      <div className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-700">
            Our story began with a simple idea: make technology accessible to everyone. Today, we serve thousands of happy customers around the globe.
          </p>
        </div>
      </div>
    </section>
  );
}
