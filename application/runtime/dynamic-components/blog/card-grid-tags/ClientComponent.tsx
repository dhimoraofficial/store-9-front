"use client";

import React from 'react';
import { samplePosts, cx } from '../../_shared';

// Blog 6: card grid with tags
export default function Blog6({ items = samplePosts, className = '' }) {
  return (
    <section className={cx('bg-gray-50 py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">News & Insights</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((post, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
              <div className="p-6">
                <div className="flex space-x-2 mb-3">
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">News</span>
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">Tech</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                <a href="#" className="text-blue-600 text-sm font-semibold hover:underline">
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
