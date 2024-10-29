import React, { useState } from 'react';
import { Button } from '@mui/material';
import imageCompression from 'browser-image-compression';

const PhotoUpload = ({ setPhoto }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 500,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          setImagePreview(base64String);
          setPhoto(base64String);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <input
        accept="image/*"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="photo-upload"
      />
      <label htmlFor="photo-upload">
        <Button variant="contained" component="span">
          Upload Photo
        </Button>
      </label>
      {imagePreview && (
        <img 
          src={imagePreview} 
          alt="Preview" 
          style={{ marginTop: '10px', maxWidth: '100px' }} 
        />
      )}
    </div>
  );
};

export default PhotoUpload;
