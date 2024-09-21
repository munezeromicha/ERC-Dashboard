import React from 'react';
import { FaPlus } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
const FloatingActions: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigate = () => { 
        navigate('/newArticles')
    }
  return (
    <div>
      <div className="fixed right-4 top-4 bg-blue-500 p-4 rounded-full shadow-lg">
        <button onClick={handleNavigate} className="text-white text-2xl"><FaPlus /></button>
      </div>
    </div>
  );
};

export default FloatingActions;
