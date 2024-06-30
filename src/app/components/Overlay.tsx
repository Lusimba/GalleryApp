'use client'

import React, { useEffect, useRef, useState } from 'react';
import ImageUploader from './image-uploader';

interface OverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ isVisible, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div ref={overlayRef} className="bg-[#212121] p-6 rounded-lg w-full max-w-5xl mx-4 lg:mx-auto shadow-2xl shadow-black/80">
        <OverlayHeader />
        <ImageUploaderSection onImageUpload={setUploadedImageUrl} />
        <InputField
          label="Title"
          type="text"
          placeholder="Enter the picture title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputField
          label="Description"
          type="textarea"
          placeholder="Describe your picture here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
      </div>
    </div>
  );
};

const OverlayHeader: React.FC = () => (
  <div>
    <h2 className="text-white text-3xl font-semibold">Add Picture</h2>
    <p className="text-[#606060]">Share your moment with the community</p>
  </div>
);

interface ImageUploaderSectionProps {
  onImageUpload: (url: string) => void;
}

const ImageUploaderSection: React.FC<ImageUploaderSectionProps> = ({ onImageUpload }) => (
  <div className="my-4 w-full">
    <ImageUploader onImageUpload={onImageUpload} />
  </div>
);

interface InputFieldProps {
  label: string;
  type: 'text' | 'textarea';
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  rows?: number;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, placeholder, value, onChange, rows }) => (
  <div className="mb-4">
    <label className="text-white font-bold block mb-2">{label}</label>
    {type === 'text' ? (
      <input
        type="text"
        className="w-full p-2 rounded bg-white text-black mb-1"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    ) : (
      <textarea
        className="w-full p-2 rounded bg-white text-black mb-1"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
      />
    )}
    <p className="text-[#606060]">{placeholder}</p>
  </div>
);

export default Overlay;
