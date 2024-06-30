"use client";

import React, { useEffect } from 'react';
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
    const { data: allImages, refetch: refetchAll } = api.gallery.getAllPictures.useQuery();
    const { data: myImages, refetch: refetchMine } = api.gallery.getMyPictures.useQuery();

    useEffect(() => {
        if (selectedPage === 'community') {
        refetchAll();
        } else {
        refetchMine();
        }
    }, [selectedPage, refetchAll, refetchMine]);

    const images = selectedPage === 'community' ? allImages : myImages;
    
    return (
        <div className="grid grid-cols-3 gap-4">
        {/* Example image blocks */}
        {images?.map((image: ImageType, index) => (
            <div key={index} className="bg-black h-48 flex items-center justify-center rounded-[1.2rem] overflow-hidden">
            <Image
                src={image.imageUrl}
                alt={image.title}
                    className="h-full w-full object-cover"
                width={200}
                height={300}
            />
            </div>
        ))}
        </div>
    );
};

export default ImageGrid;