"use client";

import React from 'react';
import { samplePosts, cx } from '../../_shared';

// Blog 4: minimal centered list
export default function Blog4({ items = samplePosts, className = '' }) {
  return (
    <section className={cx('bg-gray-100 py-16 px-4', className)}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Blog</h2>
        <div className="space-y-10">
          {items.map((post, i) => (
            <div key={i} className="border-b border-gray-300 pb-8">
              <p className="text-sm text-gray-500 mb-2">January {i + 1}, 2025</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h3>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <a href="#" className="text-blue-600 font-semibold hover:underline">
                Read more
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
