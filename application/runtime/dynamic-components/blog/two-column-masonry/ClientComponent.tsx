"use client";

import React from 'react';
import { samplePosts, cx } from '../../_shared';

// Blog 5: 2-column masonry style
export default function Blog5({ items = samplePosts, className = '' }) {
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Latest Updates</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {items.map((post, i) => (
            <div key={i} className={`bg-gray-50 rounded-lg overflow-hidden shadow-md ${i === 0 ? 'md:row-span-2' : ''}`}>
              <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
