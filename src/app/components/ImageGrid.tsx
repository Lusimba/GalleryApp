"use client";

import React from 'react';
import Image from 'next/image';
import { useQuery, useIsFetching } from "@tanstack/react-query";
import axios from "axios";

interface Picture {
    id: string;
    url: string;
    title: string;
    description: string;
    likes: number;
    user: {
        id: string;
        name: string;
        email: string;
        image: string;
    };
}

const ImageGrid: React.FC = () => {
    const { data: images } = useQuery<Picture[]>(
        { queryKey: ["getAllPictures"] },
        async () => {
          const response = await axios.get("/api/getAllPictures");
          return response.data;
        }
    )
    
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Example image blocks */}
      {images?.map((image, index) => (
        <div key={index} className="bg-black h-48 flex items-center justify-center">
          <Image
            src={image.url}
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