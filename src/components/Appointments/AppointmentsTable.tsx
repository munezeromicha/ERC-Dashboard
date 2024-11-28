import { useState, useEffect } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Appointment {
  _id: string;
  fullName: string;
  email: string;
  companyName: string;
  message: string;
}

const AppointmentList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login to view appointments");
        window.location.replace("https://erc-remys-projects-e871eb29.vercel.app/login");
        return;
      }

      const response = await axios.get(
        "https://wizzy-africa-backend.onrender.com/api/appointments/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(response.data);
      setLoading(false);
    } catch (error: unknown) {
      console.error("Error fetching appointments:", error);
      if (error instanceof AxiosError && error.response?.status === 401) {
        toast.error("Session expired. Please login again");
        localStorage.removeItem("token");
        window.location.replace("https://erc-remys-projects-e871eb29.vercel.app/login");
      } else {
        toast.error("Failed to load appointments");
      }
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login to delete appointments");
        window.location.replace("https://erc-remys-projects-e871eb29.vercel.app/login");
        return;
      }

      await axios.delete(
        `https://wizzy-africa-backend.onrender.com/api/appointments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(appointments.filter((app) => app._id !== id));
      toast.success("Appointment deleted successfully!");
    } catch (error: unknown) {
      console.error("Error deleting appointment:", error);
      if (error instanceof AxiosError && error.response?.status === 401) {
        toast.error("Session expired. Please login again");
        localStorage.removeItem("token");
        window.location.replace("https://erc-remys-projects-e871eb29.vercel.app/login");
      } else {
        toast.error("Failed to delete appointment");
      }
    }
  };

  const handleViewMessage = (message: string) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">{appointment.fullName}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewMessage(appointment.message)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => handleDelete(appointment._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <p className="text-gray-600">{appointment.email}</p>
            <p className="text-gray-600">{appointment.companyName}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute flex items-center top-2 right-2 justify-center text-white bg-red-700 hover:bg-red-800 transition-colors duration-300 rounded-lg px-4 py-2"
            >
              Close
            </button>
            <h2 className="text-xl font-bold mb-4">Message</h2>
            <p className="text-gray-700">{selectedMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 animate-pulse"
          >
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentList;
