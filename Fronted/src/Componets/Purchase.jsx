


import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaDiscourse, FaDownload } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { RiHome2Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

function Purchase() {
  const [purchase, setPurchase] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Corrected state name
  const [errorMessage, setErrorMessage] = useState(null); // Corrected state type
  const navigate = useNavigate(); // Correctly imported and used

  // console.log("purchase", purchase);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("user");
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      alert(response.data.message);
      localStorage.removeItem("user"); // Remove the token from localStorage
      setIsLoggedIn(false); // Update the login state
    } catch (error) {
      console.log("Error in logging out", error);
      alert("Error in logout" || error.response?.data?.errors);
    }
    navigate("/");
  };

  // Fetch purchases
  useEffect(() => {
    const fetchPurchases = async () => {
      const token = JSON.parse(localStorage.getItem("user"));
      if (!token) {
        setErrorMessage("Please login to purchase courses");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/purchase",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          }
        );
        setPurchase(response.data.coursedata);
      } catch (error) {
        setErrorMessage("Failed to fetch purchase data");
      }
    };
    fetchPurchases();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-100 p-5">
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/" className="flex items-center">
                <RiHome2Fill className="mr-2" /> Home
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/courses" className="flex items-center">
                <FaDiscourse className="mr-2" /> Courses
              </Link>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center text-blue-500">
                <FaDownload className="mr-2" /> Purchases
              </a>
            </li>
            <li className="mb-4">
              <Link to="/settings" className="flex items-center">
                <IoMdSettings className="mr-2" /> Settings
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="flex items-center">
                  <IoLogOut className="mr-2" /> Logout
                </button>
              ) : (
                <Link to="/login" className="flex items-center">
                  <IoLogIn className="mr-2" /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex-1 p-8 bg-gray-50">
        <h2 className="text-xl font-semibold mt-6 mb-6">
          My Purchases
        </h2>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        {purchase.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {purchase.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 mb-6"
              >
                <div className="flex flex-col items-center space-y-4">
                  <img
                    className="rounded-lg w-full h-48 object-cover"
                    src={item.image?.url || "https://via.placeholder.com/200"}
                    alt={item.title}
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-gray-500">
                      {item.description.length > 100
                        ? `${item.description.slice(0, 100)}...`
                        : item.description}
                    </p>
                    <span className="text-green-700 font-semibold text-sm">
                      ${item.price} only
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You have no purchases yet.</p>
        )}
      </div>
    </div>
  );
}

export default Purchase;