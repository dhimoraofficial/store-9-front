"use client";

import React from 'react';
import { samplePosts, cx } from '../../_shared';

// Blog 10: zigzag layout (alternating image sides)
export default function Blog10({ items = samplePosts, className = '' }) {
  return (
    <section className={cx('bg-gray-50 py-16 px-4', className)}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Featured Articles</h2>
        <div className="space-y-12">
          {items.slice(0, 4).map((post, i) => (
            <div key={i} className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
              <div className={i % 2 === 0 ? 'order-1' : 'order-2'}>
                <img src={post.image} alt={post.title} className="rounded-lg shadow-lg w-full" />
              </div>
              <div className={i % 2 === 0 ? 'order-2' : 'order-1'}>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{post.title}</h3>
                <p className="text-gray-700 mb-6">{post.excerpt}</p>
                <a href="#" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800">
                  Read Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
