import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface MediaUploadProps {
  tributeId: string;
  currentUser: User | null;
  onUploadComplete: () => void;
}

const MediaUpload: React.FC<MediaUploadProps> = ({ tributeId, currentUser, onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size must be less than 10MB');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file || !currentUser) return;

    setLoading(true);
    setError(null);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${tributeId}/${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      // Save media record
      const { error: dbError } = await supabase
        .from('media')
        .insert([
          {
            tribute_id: tributeId,
            url: publicUrl,
            type: file.type.startsWith('image/') ? 'image' : 'video',
            user_id: currentUser.id,
          },
        ]);

      if (dbError) throw dbError;

      setFile(null);
      onUploadComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-medium mb-4">Share Photos or Videos</h3>

      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="mb-4 w-full"
      />

      {error && (
        <p className="text-red-600 text-sm mb-4">{error}</p>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="btn btn-primary w-full"
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default MediaUpload;