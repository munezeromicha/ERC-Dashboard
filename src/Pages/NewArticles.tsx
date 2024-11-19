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
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Layout />
      <Toaster position="top-right" />
      <div className="flex flex-col pb-4 md:p-6 lg:p-10 w-full max-w-7xl mx-auto">
        <div className="mb-4 w-full pb-6">
          <label htmlFor="card-title" className="block text-sm md:text-base font-medium text-gray-700 mb-1">Title</label>
          <input
            id="card-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
            className="w-full p-2 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
          />
          <span className={`text-xs ${title.length === MAX_TITLE_LENGTH ? "text-red-500" : "text-gray-500"}`}>
            {title.length}/{MAX_TITLE_LENGTH}
          </span>
        </div>

    <div className="max-w-md pb-10">
      <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
        Featured Image
      </label>
      <input
        type="file"
        id="image"
        accept="image/jpeg,image/jpg,image/png"
        onChange={handleImageChange}
        className="hidden"
      />
      <label
        htmlFor="image"
        className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
      >
        Choose Image
      </label>
      {image && (
        <div className="mt-2">
          {typeof image === 'string' ? (
            <div>
              <img
                src={image}
                alt="Current"
                className="w-32 h-32 object-cover rounded"
              />
              <span className="text-sm text-gray-500">Current Image</span>
            </div>
          ) : (
            <div>
              <img
                src={URL.createObjectURL(image)}
                alt="Selected"
                className="w-32 h-32 object-cover rounded"
              />
              <span className="text-sm text-gray-500">New Image: {image.name}</span>
            </div>
          )}
        </div>
      )}
    </div>

        <div className="mb-4 w-full">
          <label htmlFor="card-content" className="block text-sm md:text-base font-medium text-gray-700 mb-1">Content</label>
          <ReactQuill value={content} onChange={setContent} className="h-60 mb-4" theme="snow" />
        </div>

        <div className="mt-6 md:mt-8">
          <button
            onClick={handleSubmit}
            className={`w-full md:w-auto px-6 py-3 ${isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white font-medium rounded-md shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            disabled={isLoading}
          >
            {isLoading ? `${cardData ? 'Updating' : 'Creating'} Card...` : `${cardData ? 'Update' : 'Create'} Card`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicationCard;