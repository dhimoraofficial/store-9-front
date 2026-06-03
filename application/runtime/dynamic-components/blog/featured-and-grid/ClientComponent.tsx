"use client";

import React from 'react';
import { samplePosts, cx } from '../../_shared';

// Blog 3: featured + grid
export default function Blog3({ items = samplePosts, className = '' }) {
  const [featured, ...rest] = items;
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">From Our Blog</h2>
        <div className="mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img src={featured.image} alt={featured.title} className="rounded-lg shadow-lg w-full h-80 object-cover" />
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{featured.title}</h3>
              <p className="text-lg text-gray-600 mb-6">{featured.excerpt}</p>
              <a href="#" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700">
                Read Article
              </a>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {rest.slice(0, 3).map((post, i) => (
            <div key={i} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h4>
              <p className="text-sm text-gray-600">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
