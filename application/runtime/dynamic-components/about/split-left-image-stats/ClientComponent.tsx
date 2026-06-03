"use client";

import React from 'react';
import { placeholderImage, cx } from '../../_shared';

// About 2: image left, text right with stats
export default function About2({ className = '' }) {
  return (
    <section className={cx('bg-gray-50 py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img src={placeholderImage(600, 500, 'Team')} alt="Team" className="rounded-lg shadow-xl w-full" />
        </div>
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Who We Are</h2>
          <p className="text-lg text-gray-700 mb-6">
            A passionate team building tools that make a difference. Our mission is to empower creators worldwide.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-3xl font-bold text-blue-600">1000+</p>
              <p className="text-sm text-gray-600">Clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">50+</p>
              <p className="text-sm text-gray-600">Countries</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">24/7</p>
              <p className="text-sm text-gray-600">Support</p>
            </div>
          </div>
          <a href="#" className="text-blue-600 font-semibold hover:underline">
            Read Our Story →
          </a>
        </div>
      </div>
    </section>
  );
}
