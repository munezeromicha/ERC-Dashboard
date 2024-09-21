import { Outlet, Link } from "react-router-dom";
import Logo from "../assets/Logo/ERC Logo 1.png";
import chat from "../assets/Icons/Chat.svg";
import Add from "../assets/Icons/Icon.svg";
import Document from "../assets/Icons/Document.svg";
import Setting from "../assets/Icons/Setting.svg";
import Profile from "../assets/Icons/Profile.svg";
import articles from "../assets/Icons/ooui_articles-ltr.svg";
import Chart from "../assets/Icons/Chart.svg";

const Sidebar = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="fixed w-[240px] h-screen bg-[#F1F2F7] pl-2 overflow-y-auto">
          <div className="mb-8">
            <img src={Logo} alt="Logo" className="h-12 w-1/2 h-3/4" />
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
              <img src={Setting} alt="" />
              <Link to="/settings">Settings</Link>
            </li>
            <li className="text-blue-800 hover:text-[#5A6ACF] font-medium flex gap-2 hover:bg-[#e4e7f6] hover:rounded-lg p-2 cursor-pointer">
              <img src={Profile} alt="" />
              <Link to="/account">Account</Link>
            </li>
          </ul>
        <div className="p-4">
          <button className="text-darkBlue px-4 py-2 transparent border-2 border-[#00A0C1] rounded-full font-medium hover:bg-[#00A0C1] hover:text-white">
            Logout
          </button>
        </div>
      </div>
      </div>
      <div className="ml-[280px] flex-1 overflow-y-auto h-screen p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
