import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const userID = localStorage.getItem("UserID");

  const handleContinue = () => {
    navigate("/profile");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 page-transition2">
      <h1 className="text-3xl font-bold mb-4">Welcome User ID: {userID}</h1>
      <button
        onClick={handleContinue}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Lanjutkan
      </button>
    </div>
  );
}

export default Home;
