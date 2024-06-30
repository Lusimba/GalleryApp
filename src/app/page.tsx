'use client';
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import GalleryHeader from './components/GalleryHeader';
import ImageGrid from './components/ImageGrid';

export default function Home() {
  const [selectedPage, setSelectedPage] = useState<string>('');

  const handleButtonClick = (page: string) => {
    setSelectedPage(page);
  };
  return (
    <div className="min-h-screen bg-[#212121] flex flex-col">
      <main className="flex-1 flex">
        <div className="w-[23%] bg-[#3F3F3F] rounded-r-2xl">
          <div className=" px-6">
            <Sidebar onButtonClick={handleButtonClick} />
          </div>
        </div>

        <div className="flex-1 p-20">
          <GalleryHeader selectedPage={selectedPage} />

          <ImageGrid selectedPage={selectedPage} /> 
        </div>
      </main>
    </div>
  );
}
