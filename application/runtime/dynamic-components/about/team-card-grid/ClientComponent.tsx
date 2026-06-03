"use client";

import React from 'react';
import { placeholderImage, cx } from '../../_shared';

// About 5: card grid with team photos
export default function About5({ className = '' }) {
  const team = ['Alice', 'Bob', 'Charlie'];
  return (
    <section className={cx('bg-white py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600">Talented individuals driving innovation.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {team.map((name, i) => (
            <div key={i} className="text-center">
              <img src={placeholderImage(300, 300, name)} alt={name} className="rounded-full w-48 h-48 mx-auto mb-4 shadow-lg" />
              <h3 className="text-xl font-bold text-gray-900">{name}</h3>
              <p className="text-gray-600">Co-Founder</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a href="#" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-indigo-700">
            Join Our Team
          </a>
        </div>
      </div>
    </section>
  );
}
