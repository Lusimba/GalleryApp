"use client";

import React from 'react';
import Image from 'next/image';
import { api } from '../../trpc/react';

interface ImageType {
    imageUrl: string;
    title: string;
}

interface ImageGridProps {
  selectedPage: string;
}


const ImageGrid: React.FC<ImageGridProps> = ({ selectedPage }) => {
    const { data: allImages } = api.gallery.getAllPictures.useQuery();
    const { data: myImages } = api.gallery.getMyPictures.useQuery();

    const images = selectedPage === 'community' ? allImages : myImages;
    
    return (
        <div className="grid grid-cols-3 gap-4">
        {/* Example image blocks */}
        {images?.map((image: ImageType, index) => (
            <div key={index} className="bg-black h-48 flex items-center justify-center">
            <Image
                src={image.imageUrl}
                alt={image.title}
                    className="h-full object-cover"
                width={300}
                height={300}
            />
            </div>
        ))}
        </div>
    );
};

export default ImageGrid;