'use client';
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      {/* Header */}
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Selamat Datang
          </p>
        </div>
    </div>
  );
}