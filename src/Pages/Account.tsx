import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import img1 from "../assets/images/user-01.png";
export default function Account() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/settings"); 
  };
  return (
    <div className="flex">
      <Layout />
      <div className="flex flex-col items-center p-4 ml-[320px]">
        <h1 className="text-4xl font-bold mb-4 pt-10 underline">Profile</h1>
        <img src={img1} alt="User" className="mb-4 h-40 w-30 rounded pt-[90px]" />
        <h2 className="text-2xl font-semibold">Rutagarama Ephrem</h2>
        <h3 className="text-xl">CEO</h3>
        <p className="text-gray-600">Econometer Research Center</p>
        <p className="text-gray-600">+251 911 11 11 11</p>
        <p className="text-gray-600">Kigali,  Rwanda</p>
        <p className="text-gray-600">rutagaramaephre@gmail.com</p>
        <p className="text-gray-600">linkedin:  ephremrut</p>
        <p className="text-gray-600">twitter:  ephremrut</p>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:font-bold hover:bg-black"
          onClick={handleNavigate} 
        >
          Update
        </button>
      </div>
    </div>
  )
}