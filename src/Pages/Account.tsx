import { useState, useEffect } from "react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import avatar from "../assets/images/avatar.png";

interface UserData {
  fullName: string;
  email: string;
  role: string;
  phoneNumber: string;
  profileImage: string;
  lastLogin: string;
  isActive: boolean;
}

function Settings() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    email: "",
    role: "",
    phoneNumber: "",
    profileImage: "",
    lastLogin: "",
    isActive: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      const token = Cookies.get("user_info");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const decodedData = JSON.parse(decodeURIComponent(token));
        setUserData({
          fullName: `${decodedData.firstName} ${decodedData.lastName}`,
          email: decodedData.email,
          role: decodedData.role,
          phoneNumber: decodedData.phoneNumber,
          profileImage: decodedData.profileImage,
          lastLogin: new Date(decodedData.lastLogin).toLocaleDateString(),
          isActive: decodedData.isActive
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
        toast.error("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="flex items-start space-x-6 mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200"></div>
        <div className="space-y-3">
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
          <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="space-y-6">
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-5 w-48 bg-gray-200 rounded"></div>
          </div>
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-5 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-5 w-48 bg-gray-200 rounded"></div>
          </div>
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-5 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const UserProfile = () => (
    <>
      <div className="flex items-start space-x-6 mb-6">
        <img
          src={avatar}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-blue-50 object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{userData.fullName}</h2>
          <div className="flex gap-2 mt-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {userData.role}
            </span>
            {userData.isActive && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Active
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Email Address
            </label>
            <p className="text-gray-800">{userData.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Phone Number
            </label>
            <p className="text-gray-800">{userData.phoneNumber}</p>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Role
            </label>
            <p className="text-gray-800 capitalize">{userData.role}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Last Login
            </label>
            <p className="text-gray-800">{userData.lastLogin}</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex">
      <Layout />
      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Account Information</h1>

          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6">
              {isLoading ? <SkeletonLoader /> : <UserProfile />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;