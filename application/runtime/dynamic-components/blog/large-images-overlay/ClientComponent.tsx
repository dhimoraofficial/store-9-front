"use client";

import React from 'react';
import { samplePosts, cx } from '../../_shared';

// Blog 8: large images with overlay text
export default function Blog8({ items = samplePosts, className = '' }) {
  return (
    <section className={cx('bg-gray-900 py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Stories</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {items.slice(0, 4).map((post, i) => (
            <div key={i} className="relative group overflow-hidden rounded-lg h-64">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-xl font-bold mb-1">{post.title}</h3>
                  <p className="text-gray-200 text-sm">{post.excerpt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
