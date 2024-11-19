import { useState } from "react";
import Layout from "./Layout";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

function NewCard() {
  const { state } = useLocation();
  const editingCard = state?.card;
  const [title, setTitle] = useState(editingCard?.title || "");
  const [content, setContent] = useState(editingCard?.content || "");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const MAX_TITLE_LENGTH = 25;

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'link'
  ];

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    if (newTitle.length <= MAX_TITLE_LENGTH) {
      setTitle(newTitle);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in both title and content");
      return;
    }

    try {
      setIsLoading(true);
      if (editingCard) {
        await axios.put(
          `https://wizzy-africa-backend.onrender.com/api/expertise-cards/${editingCard._id}`,
          {
            title: title.trim(),
            content: content.trim(),
          }
        );
        toast.success("Card updated successfully!");
      } else {

        await axios.post("http://localhost:5000/api/expertise-cards", {
          title: title.trim(),
          content: content.trim(),
        });
        toast.success("Card created successfully!");
      }

      navigate("/expertCard");
    } catch (error) {
      console.error("Operation failed:", error);
      toast.error(
        `Failed to ${editingCard ? "update" : "create"} card. Please try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Toaster position="top-right" />
      <Layout />
      <div className="flex flex-col p-4 md:p-6 lg:p-10 w-full max-w-7xl mx-auto">
        <div className="mb-4 w-full">
          <label
            htmlFor="card-title"
            className="block text-sm md:text-base font-medium text-gray-700 mb-1"
          >
            Card Title
          </label>

          <span
            className={`text-xs ${
              title.length === MAX_TITLE_LENGTH
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            {title.length}/{MAX_TITLE_LENGTH}
          </span>

          <input
            id="card-title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            maxLength={MAX_TITLE_LENGTH}
            placeholder="Enter title..."
            className="w-full p-2 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
          />
        </div>
        <div className="mb-4 w-full">
          <label
            htmlFor="card-content"
            className="block text-sm md:text-base font-medium text-gray-700 mb-1"
          >
            Card Content
          </label>
          <div className="w-full">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              className="h-[300px] mb-12"
              placeholder="Enter content here..."
            />
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          <button
            onClick={handleSubmit}
            disabled={isLoading || !title.trim() || !content.trim()}
            className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 
                     text-white font-medium rounded-md shadow-sm 
                     transition duration-150 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Card..." : "Create Card"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewCard;
