'use client'

import React, { useState } from 'react';
import Overlay from './Overlay';

interface ImageGridProps {
  selectedPage: string;
}

const GalleryHeader: React.FC<ImageGridProps> = ({ selectedPage }) => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const pageTitle = selectedPage === 'community' ? 'Gallery' : 'My Store';
    const subTitle = selectedPage === 'community' ? 'Community Gallery' : 'My recent uploads';

    const toggleOverlay = () => {
        setOverlayVisible(!isOverlayVisible);
    };

    return (
        <div className="relative flex justify-between items-center mb-6">
        <div>
            <h2 className="text-white text-3xl font-semibold">{pageTitle}</h2>
            <p className="text-[#606060]">{subTitle}</p>
        </div>
            <button className="bg-[#D927C7] text-white py-2 px-4 rounded" onClick={toggleOverlay}>Add Picture</button>
            <Overlay isVisible={isOverlayVisible} onClose={toggleOverlay} />
        </div>
    );
};

export default GalleryHeader;