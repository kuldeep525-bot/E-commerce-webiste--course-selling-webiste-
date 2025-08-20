import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/logos.png";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //we use (useNavigate) hook to travel to other page
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear any previous error messages

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("login successful:", response.data);
      alert(response.data.message);
      //if user login then token is store in localstroage
      localStorage.setItem("user", JSON.stringify(response.data.token));

      navigate("/");
    } catch (error) {
      // Handle errors and display a user-friendly message
      if (error.response) {
        alert(error.response.data.errors);
        setErrorMessage(
          error.response.data.errors || "login failed. Please try again."
        );
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-950 h-screen">
      <div className="text-white container mx-auto p-6 space-y-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center space-x-5">
            <img
              src={logo}
              alt="logo"
              className="w-20 h-20 rounded-full gap-3"
            />
            <h1 className="text-2xl text-orange-500 font-bold">TECH-COURSES</h1>
          </div>
          <div className="space-x-5">
            <Link
              to="/Signup"
              className="bg-transparent text-white border px-4 py-2 border-white cursor-pointer hover:bg-orange-500 hover:border-none hover:text-black rounded-md hover:font-bold duration-300"
            >
              Signup
            </Link>
            <Link
              to="/courses"
              className="bg-transparent text-white border px-4 py-2 border-white cursor-pointer hover:bg-orange-500 hover:border-none hover:text-black rounded-md hover:font-bold duration-300"
            >
              Join now
            </Link>
          </div>
        </header>
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-[500px] mt-20 mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Welcome to <span className="text-orange-500">TECH-COURSES</span>
          </h2>
          <p className="text-center text-gray-400 mb-6">
            Login in to acess paid content!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="email" className="text-gray-400 block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-gray-400 block mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
