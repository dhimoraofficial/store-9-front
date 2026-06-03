"use client";

import React from 'react';
import { samplePosts, cx } from '../../_shared';

// Blog 2: list layout with side images
export default function Blog2({ items = samplePosts, className = '' }) {
  return (
    <section className={cx('bg-gray-50 py-16 px-4', className)}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Recent Posts</h2>
        <div className="space-y-8">
          {items.map((post, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow-md overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full md:w-48 h-48 object-cover" />
              <div className="p-6 flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <a href="#" className="text-indigo-600 font-semibold hover:underline">
                  Continue Reading →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
