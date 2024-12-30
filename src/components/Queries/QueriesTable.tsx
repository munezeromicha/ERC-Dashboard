import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";

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
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login to view messages");
        window.location.replace("https://erc-remys-projects-e871eb29.vercel.app/login");
        return;
      }

      const response = await axios.get(
        "https://wizzy-africa-backend.onrender.com/api/queries",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        toast.error("Session expired. Please login again");
        localStorage.removeItem("token");
        window.location.replace("https://erc-remys-projects-e871eb29.vercel.app/login");
        return;
      }

      setQueries(response.data.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error("Session expired. Please login again");
        localStorage.removeItem("token");
        window.location.replace("https://erc-remys-projects-e871eb29.vercel.app/login");
      } else {
        toast.error("Failed to load messages");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login to delete messages");
        window.location.replace("https://erc-remys-projects-e871eb29.vercel.app/login");
        return;
      }

      await axios.delete(
        `https://wizzy-africa-backend.onrender.com/api/queries/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQueries(queries.filter((query) => query._id !== id));
      toast.success("Message deleted successfully!");
    } catch (error: unknown) {
      console.error("Error deleting message:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error("Session expired. Please login again");
        localStorage.removeItem("token");
        window.location.replace("https://erc-remys-projects-e871eb29.vercel.app/login");
      } else {
        toast.error("Failed to delete message");
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="mb-6">
        <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-10">
          Messages
        </h4>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="hidden sm:grid sm:grid-cols-5 bg-gray-50 border-b">
          <div className="px-6 py-3">
            <h5 className="text-sm font-medium text-gray-700">Name</h5>
          </div>
          <div className="px-6 py-3">
            <h5 className="text-sm font-medium text-gray-700">Email</h5>
          </div>
          <div className="px-6 py-3">
            <h5 className="text-sm font-medium text-gray-700">Phone</h5>
          </div>
          <div className="px-6 py-3">
            <h5 className="text-sm font-medium text-gray-700">Message</h5>
          </div>
          <div className="px-6 py-3">
            <h5 className="text-sm font-medium text-gray-700">Actions</h5>
          </div>
        </div>

        {isLoading ? (
          <div className="p-4">
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="grid sm:grid-cols-5 gap-4">
                  <div className="h-4 bg-gray-200 rounded col-span-1"></div>
                  <div className="h-4 bg-gray-200 rounded col-span-1"></div>
                  <div className="h-4 bg-gray-200 rounded col-span-1"></div>
                  <div className="h-4 bg-gray-200 rounded col-span-1"></div>
                  <div className="h-4 bg-gray-200 rounded col-span-1"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 mt-10">
            {queries.map((query) => (
              <div
                key={query._id}
                className="group hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="sm:hidden p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h6 className="font-medium">{query.contactName}</h6>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedMessage(query.mainIdea)}
                        className="p-2 text-blue-600 hover:text-blue-800"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(query._id)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <BsFillTrashFill />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{query.email}</p>
                  <p className="text-sm text-gray-600">{query.phoneNumber}</p>
                </div>

                <div className="hidden sm:grid sm:grid-cols-5 px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {query.contactName}
                  </div>
                  <div className="text-sm text-gray-600 truncate pr-4">{query.email}</div>
                  <div className="text-sm text-gray-600 truncate pr-4">
                    {query.phoneNumber}
                  </div>
                  <div>
                    <button
                      onClick={() => setSelectedMessage(query.mainIdea)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View Message
                    </button>
                  </div>
                  <div className="px-14 flex items-center">
                    <button
                      onClick={() => handleDelete(query._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <BsFillTrashFill className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Message</h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              <p className="text-gray-600">{selectedMessage}</p>
            </div>
            <div className="mt-6 flex justify-end">
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsTable;
