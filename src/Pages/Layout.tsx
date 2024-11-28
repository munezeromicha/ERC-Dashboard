import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Logo from "../assets/Logo/ERCDOCLOGO.png";
import chat from "../assets/Icons/Chat.svg";
import Add from "../assets/Icons/Icon.svg";
import Document from "../assets/Icons/Document.svg";
import Profile from "../assets/Icons/Profile.svg";
import articles from "../assets/Icons/ooui_articles-ltr.svg";
import Chart from "../assets/Icons/Chart.svg";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token") || Cookies.get("token");
  
      if (!token) {
        toast.error("No active session found");
        window.location.href = "https://erc-remys-projects-e871eb29.vercel.app/"; // Replace with your official website URL
        return;
      }
  
      const response = await fetch("https://wizzy-africa-backend.onrender.com/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Logout failed");
      }
  
      localStorage.removeItem("token");
      localStorage.clear();
      Cookies.remove("token");
  
      toast.success("Logged out successfully");
      window.location.href = "https://erc-remys-projects-e871eb29.vercel.app/";
  
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error instanceof Error ? error.message : "Error logging out");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#F1F2F7]"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div
        className={`fixed lg:translate-x-0 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-[240px] h-screen bg-[#F1F2F7] pl-2 overflow-y-auto z-40 lg:z-auto`}
      >
        <div className="mb-2">
          <img src={Logo} alt="Logo" className="h-24 w-3/4 pl-10" />
        </div>
        <div className="flex flex-col justify-between h-[calc(100%-80px)]">
          <ul className="space-y-6 pl-4 text-left">
            <div>
              <h1 className="text-darkBlue text-left pb-4 font-semibold">
                MENU
              </h1>
            </div>
            <li className="text-[#5A6ACF] font-medium flex gap-2 hover:bg-[#e4e7f6] hover:rounded-lg p-2 cursor-pointer">
              <img src={Chart} alt="" />
              <Link to="/">Dashboard</Link>
            </li>
            <li className="text-blue-800 hover:text-[#5A6ACF] font-medium flex gap-2 hover:bg-[#e4e7f6] hover:rounded-lg p-2 cursor-pointer">
              <img src={articles} alt="" />
              <Link to="/articles">Publications </Link>
            </li>
            <li className="text-blue-800 hover:text-[#5A6ACF] font-medium flex gap-2 hover:bg-[#e4e7f6] hover:rounded-lg p-2 cursor-pointer">
              <img src={Add} alt="" />
              <Link to="/newArticles">New Publication</Link>
            </li>
            <li className="text-blue-800 hover:text-[#5A6ACF] font-medium flex gap-2 hover:bg-[#e4e7f6] hover:rounded-lg p-2 cursor-pointer">
              <img src={articles} alt="" />
              <Link to="/expertCard">Expertise Cards </Link>
            </li>
            <li className="text-blue-800 hover:text-[#5A6ACF] font-medium flex gap-2 hover:bg-[#e4e7f6] hover:rounded-lg p-2 cursor-pointer">
              <img src={Add} alt="" />
              <Link to="/newCard">New Card</Link>
            </li>
            <li className="text-blue-800 hover:text-[#5A6ACF] font-medium flex gap-2 hover:bg-[#e4e7f6] hover:rounded-lg p-2 cursor-pointer">
              <img src={Document} alt="" />
              <Link to="/queries">Queries</Link>
            </li>
            <li className="text-blue-800 hover:text-[#5A6ACF] font-medium flex gap-2 hover:bg-[#e4e7f6] hover:rounded-lg p-2 cursor-pointer">
              <img src={chat} alt="" />
              <Link to="/appointments">Appointments</Link>
            </li>
            <div>
              <h1 className="text-darkBlue text-left pb-2 pt-2 font-semibold">
                OTHERS
              </h1>
            </div>
            <li className="text-blue-800 hover:text-[#5A6ACF] font-medium flex gap-2 hover:bg-[#e4e7f6] hover:rounded-lg p-2 cursor-pointer">
              <img src={Profile} alt="" />
              <Link to="/account">Account</Link>
            </li>
          </ul>
          <div className="p-4">
            <button
              onClick={handleLogout}
              className="text-darkBlue px-4 py-2 transparent border-2 border-[#00A0C1] rounded-full font-medium hover:bg-[#00A0C1] hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="lg:ml-[280px] w-full flex-1 overflow-y-auto h-screen p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
