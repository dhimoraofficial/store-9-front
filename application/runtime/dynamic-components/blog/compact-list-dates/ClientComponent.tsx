"use client";

import React from 'react';
import { samplePosts, cx } from '../../_shared';

// Blog 9: compact list with dates
export default function Blog9({ items = samplePosts, className = '' }) {
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Press Releases</h2>
        <div className="space-y-6">
          {items.map((post, i) => (
            <div key={i} className="flex items-start space-x-6 pb-6 border-b">
              <div className="shrink-0 text-center">
                <p className="text-3xl font-bold text-indigo-600">{i + 10}</p>
                <p className="text-sm text-gray-500">Jan</p>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-2">{post.excerpt}</p>
                <a href="#" className="text-indigo-600 text-sm font-semibold hover:underline">
                  View Details →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
