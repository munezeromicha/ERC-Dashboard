import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Layout from '../Pages/Layout';
const MAX_TITLE_LENGTH = 50;

const PublicationCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cardData = location.state?.cardData;

  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cardData) {
      setTitle(cardData.title);
      setContent(cardData.content);
      if (cardData.image) {
        setImage(cardData.image);
      }
    }
  }, [cardData]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error("Title and content are required!");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      
      if (image instanceof File) {
        formData.append('image', image);
      }

      const url = cardData
        ? `https://wizzy-africa-backend.onrender.com/api/publication-cards/${cardData._id}`
        : 'https://wizzy-africa-backend.onrender.com/api/publication-cards';
      
      const method = cardData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${cardData ? 'update' : 'create'} publication card`);
      }

      toast.success(`Publication card ${cardData ? 'updated' : 'created'} successfully!`);
      navigate('/articles'); 
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <div className="lg:sticky lg:top-0 lg:h-screen">
        <Layout />
      </div>
      
      <div className="flex-1 w-full">
        <Toaster position="top-right" />
        
        <div className="px-4 py-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              {cardData ? 'Edit Publication' : 'New Publication'}
            </h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            <div className="space-y-1">
              <label htmlFor="card-title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                id="card-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title..."
                className="w-full p-2 sm:p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                maxLength={MAX_TITLE_LENGTH}
              />
              <p className={`text-xs ${title.length === MAX_TITLE_LENGTH ? "text-red-500" : "text-gray-500"}`}>
                {title.length}/{MAX_TITLE_LENGTH}
              </p>
            </div>

            <div className="space-y-1">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Featured Image
              </label>
              <div className="mt-1 flex flex-wrap items-center gap-4">
                <input
                  type="file"
                  id="image"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="image"
                  className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 inline-flex items-center text-sm font-medium text-gray-700"
                >
                  Choose Image
                </label>
                {image && (
                  <div className="relative">
                    <img
                      src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded-md"
                    />
                    <button
                      onClick={() => setImage(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="card-content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <div className="h-[300px] sm:h-[400px] lg:h-[500px]">
                <ReactQuill
                  value={content}
                  onChange={setContent}
                  className="h-[250px] sm:h-[350px] lg:h-[450px]"
                  theme="snow"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="reference-link" className="block text-sm font-medium text-gray-700">
                Reference Link
              </label>
              <input
                type="url"
                id="reference-link"
                placeholder="https://example.com"
                className="w-full p-2 sm:p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              />
            </div>

            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 
                  `${cardData ? 'Updating' : 'Creating'} Publication...` : 
                  `${cardData ? 'Update' : 'Create'} Publication`
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationCard;