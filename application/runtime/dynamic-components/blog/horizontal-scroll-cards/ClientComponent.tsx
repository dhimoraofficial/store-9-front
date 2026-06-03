"use client";

import React from 'react';
import { samplePosts, cx } from '../../_shared';

// Blog 7: horizontal scroll cards
export default function Blog7({ items = samplePosts, className = '' }) {
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Trending Articles</h2>
        <div className="flex overflow-x-auto space-x-6 pb-4">
          {items.map((post, i) => (
            <div key={i} className="shrink-0 w-80 bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
