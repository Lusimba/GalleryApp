'use client'

import React, { useState } from 'react';
import Overlay from './Overlay';

const GalleryHeader: React.FC = () => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);

    const toggleOverlay = () => {
        setOverlayVisible(!isOverlayVisible);
    };

    return (
        <div className="flex justify-between items-center mb-6">
        <div>
            <h2 className="text-white text-3xl font-semibold">Gallery</h2>
            <p className="text-[#606060]">Community Gallery</p>
        </div>
            <button className="bg-[#D927C7] text-white py-2 px-4 rounded" onClick={toggleOverlay}>Add Picture</button>
            <Overlay isVisible={isOverlayVisible} onClose={toggleOverlay} />
        </div>
    );
};

export default GalleryHeader;