'use client';
import React from 'react';
import Sidebar from './components/Sidebar';
import GalleryHeader from './components/GalleryHeader';
import ImageGrid from './components/ImageGrid';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#212121] flex flex-col">
      <main className="flex-1 flex">
        <div className="w-[23%] bg-[#3F3F3F] rounded-r-2xl">
          <div className=" px-6">
            <Sidebar />
          </div>
        </div>

        <div className="flex-1 p-20">
          <GalleryHeader />

          <ImageGrid /> 
        </div>
      </main>
    </div>
  );
}
