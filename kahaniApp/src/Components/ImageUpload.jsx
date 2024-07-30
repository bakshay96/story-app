import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) {
        toast.error('Please select a file to upload');
        return;
      }
  
      const formData = new FormData();
      formData.append('image', file);
      console.log("form data",formData)
  
      try {
        setUploading(true);
        const res = await fetch('http://localhost:5050/api/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (!res.ok) {
          throw new Error('Failed to upload image');
        }
  
        const data = await res.json();
        
        toast.success('Image uploaded successfully');
        console.log(data);
      } catch (err) {
        toast.error('Failed to upload image');
        console.error(err);
      } finally {
        setUploading(false);
      }
    };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Image</h1>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      {preview && <img src={preview} alt="preview" className="mb-4 max-w-xs" />}
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default ImageUpload;
