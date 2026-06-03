"use client";

import React from 'react';
import { placeholderImage, cx } from '../../_shared';

// About 6: timeline layout
export default function About6({ className = '' }) {
  const milestones = [
    { year: '2020', event: 'Company founded' },
    { year: '2021', event: 'Reached 100 customers' },
    { year: '2023', event: 'Expanded globally' },
  ];
  return (
    <section className={cx('bg-gray-50 py-16 px-4', className)}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Journey</h2>
        <div className="space-y-8">
          {milestones.map((m, i) => (
            <div key={i} className="flex items-start space-x-4">
              <div className="shrink-0 w-20 text-right">
                <p className="text-2xl font-bold text-indigo-600">{m.year}</p>
              </div>
              <div className="border-l-4 border-indigo-600 pl-6 flex-1">
                <p className="text-xl text-gray-900">{m.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
