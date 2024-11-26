import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';

export type Message = {
  _id: string;
  contactName: string;
  email: string;
  phoneNumber: string;
  mainIdea: string;
  timestamp: string;
};

const AppointmentsTable = () => {
  const [queries, setQueries] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://wizzy-africa-backend.onrender.com/api/queries');
      setQueries(response.data.data);
    } catch (error) {
      console.error('Error fetching queries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://wizzy-africa-backend.onrender.com/api/queries/${id}`);
      setQueries(queries.filter(query => query._id !== id));
      toast.success('Appointment deleted successfully!');
    } catch (error) {
      console.error('Error deleting appointment:', error);
      toast.error('Failed to delete appointment');
    }
  };

  const SkeletonRow = () => (
    <div className="grid grid-cols-3 border-b border-gray-200 sm:grid-cols-5">
      <div className="flex items-center gap-3 p-2.5 xl:p-5">
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
      </div>
      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>
      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
      </div>
      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );


  return (
    <div className="rounded-sm bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
      <ToastContainer />
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
      Message
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Phone Number
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Message
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>

        {isLoading ? (

          <>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </>
        ) : (
        queries.map((query) => (
          <div key={query._id} className="grid grid-cols-3 border-b border-gray-200 sm:grid-cols-5">
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black sm:block">{query.contactName}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black">{query.email}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{query.phoneNumber}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <button 
                onClick={() => setSelectedMessage(query.mainIdea)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <svg
                  className="fill-primary dark:fill-white"
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
                    fill=""
                  />
                  <path
                    d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
                    fill=""
                  />
                </svg>
              </button>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <BsFillTrashFill 
                className="delete-btn cursor-pointer" 
                onClick={() => handleDelete(query._id)}
              />
            </div>
          </div>
        ))
      )}
      </div>
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg relative max-w-md w-full">
            <button 
              onClick={() => setSelectedMessage(null)}
              className="absolute flex items-center top-2 right-2 justify-center text-white bg-red-700 hover:bg-red-800 transition-colors duration-300 rounded-lg px-4 py-2"
            >
              Close
            </button>
            <h3 className="text-xl font-semibold mb-4">Message</h3>
            <p>{selectedMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsTable;
