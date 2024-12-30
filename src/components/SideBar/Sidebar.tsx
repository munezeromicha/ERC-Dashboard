import Logo from "../assets/Logo/ERC Logo 1.png";
import chat from "../assets/Icons/Chat.svg";
import Add from "../assets/Icons/Icon.svg";
import Document from "../assets/Icons/Document.svg";
import Setting from "../assets/Icons/Setting.svg";
import Profile from "../assets/Icons/Profile.svg";
import articles from "../assets/Icons/ooui_articles-ltr.svg";
import InfoSquare from "../assets/Icons/InfoSquare.svg";
import Chart from "../assets/Icons/Chart.svg";
const Sidebar = () => {

  return (
    <div className="flex flex-col min-h-screen bg-[#F1F2F7] pl-2 w-60">
      <div className="flex-grow">
      <div className="mb-8">
        <img src={Logo} alt="Logo" className="h-12 w-1/2 h-3/4" />
      </div>

      <ul className="space-y-6 pl-4 text-left">
      <div>
        <h1 className="text-[#043873] text-left pb-4 font-semibold">MENU</h1>
      </div>
      <li className="text-[#043873] font-medium flex gap-2 hover:bg-[#e4e7f6] hover:rounded-lg p-2 cursor-pointer">
          <img src={Chart} alt="" /> Dashboard
        </li>
        <li className="text-[#043873] hover:text-[#5A6ACF] font-medium flex gap-2 hover:bg-[#e4e7f6] hover:rounded-lg p-2 cursor-pointer">
          <img src={articles} alt="" />
          Articles
        </li>
        <li className="text-[#043873] hover:text-[#5A6ACF] font-medium flex gap-2 hover:bg-[#e4e7f6] hover:rounded-lg p-2 cursor-pointer">
          <img src={Add} alt="" />
          New Article
        </li>
        <li className="text-[#043873] hover:text-[#5A6ACF] font-medium flex gap-2 hover:bg-[#e4e7f6] hover:rounded-lg p-2 cursor-pointer">
          <img src={Document} alt="" />
          Queries
        </li>
        <li className="text-[#043873] hover:text-[#5A6ACF] font-medium flex gap-2 hover:bg-[#e4e7f6] hover:rounded-lg p-2 cursor-pointer">
          <img src={chat} alt="" />
          Appointments
        </li>
        <div>
        <h1 className="text-darkBlue text-left pb-2 pt-2 font-semibold">OTHERS</h1>
      </div>
        <li className="text-[#043873] hover:text-[#5A6ACF] font-medium flex gap-2 hover:bg-[#e4e7f6] hover:rounded-lg p-2 cursor-pointer">
          <img src={Setting} alt="" />
          Settings
        </li>
        <li className="text-[#043873] hover:text-[#5A6ACF] font-medium flex gap-2 hover:bg-[#e4e7f6] hover:rounded-lg p-2 cursor-pointer">
          <img src={Profile} alt="" />
          Accounts
        </li>
        <li className="text-blue-800 hover:text-[#5A6ACF] font-medium flex gap-2 hover:bg-[#e4e7f6] hover:rounded-lg p-2 cursor-pointer">
          <img src={InfoSquare} alt="" />
          Help
        </li>
      </ul>
      </div>
      <div className="p-4">
        <button className="text-darkBlue px-4 py-2 transparent border-2 border-[#00A0C1] rounded-full font-medium hover:bg-[#00A0C1] hover:text-white">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
