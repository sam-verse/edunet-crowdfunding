import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, Loader } from 'lucide-react';

export default function CreateCampaign() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    goalAmount: '',
    endDate: '',
    imageUrl: '',
  });

  React.useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
    }
  }

  const onDrop = React.useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      setLoading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `campaign-images/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('campaign-images')
        .upload(filePath, file, {
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('campaign-images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, imageUrl: publicUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('campaigns')
        .insert({
          title: formData.title,
          description: formData.description,
          goal_amount: parseFloat(formData.goalAmount),
          end_date: formData.endDate,
          image_url: formData.imageUrl,
          created_by: session.user.id,
        });

      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error('Error creating campaign:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6">
          <h1 className="text-3xl font-bold text-white">Create Campaign</h1>
          <p className="text-white/80 mt-2">Share your cause with the world</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Campaign Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring focus:ring-rose-200"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring focus:ring-rose-200"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="goalAmount" className="block text-sm font-medium text-gray-700">
                Goal Amount ($)
              </label>
              <input
                type="number"
                id="goalAmount"
                name="goalAmount"
                value={formData.goalAmount}
                onChange={handleChange}
                min="1"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring focus:ring-rose-200"
                required
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring focus:ring-rose-200"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaign Image
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragActive ? 'border-rose-500 bg-rose-50' : 'border-gray-300 hover:border-rose-500'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              {formData.imageUrl ? (
                <div className="space-y-2">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="max-h-40 mx-auto rounded-lg"
                  />
                  <p className="text-sm text-gray-500">Click or drag to replace image</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-gray-600">Drag and drop your image here, or click to select</p>
                  <p className="text-sm text-gray-500">
                    Supports: JPG, PNG, GIF (max 10MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-4 rounded-md hover:from-rose-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                <span>Creating Campaign...</span>
              </>
            ) : (
              <span>Create Campaign</span>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}