
'use client'

import React, { useState } from 'react';
import { UploadDropzone } from '@uploadthing/react';
import { OurFileRouter } from "~/app/api/uploadthing/core";


interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [, setImageUrl] = useState<string>('');

  const handleUploadComplete = (res: { url?: string }[]) => {
    const url = res[0]?.url ?? '';
    setImageUrl(url);
    onImageUpload(url);
  };

  return (
    <div>
      <div className="text-[#606060] shadow-xl rounded-lg">
        <div className="flex flex-col items-center border-2 border-dashed border-[#606060] cursor-pointer mb-4">
          <UploadDropzone<OurFileRouter>
            endpoint="imageUploader"
            className='w-full'
              onClientUploadComplete={handleUploadComplete}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          <p className="text-center pb-6">Drag and Drop your picture here</p>
        </div>
      </div>
    </div>
  )
}

export default ImageUploader
