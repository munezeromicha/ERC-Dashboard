import React from 'react';
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";

interface CardProps {
  title: string;
  description: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, description, link }) => {
  return (
    <div className="flex flex-col max-w-sm p-4 m-4 bg-white border border-blue-300 rounded-lg shadow-lg gap-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-700">{description}</p>
      <a href={link} className="mt-4 text-blue-500 hover:text-blue-600">
        Read More
      </a>
      <div className='flex'>
      <button type="button" className="flex items-center justify-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-1/2"><MdDeleteForever size="20px"/>Delete</button>
      <button type="button" className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-1/2"><MdEdit size="20px" />Edit</button>
      </div>
    </div>
  );
};

export default Card;
