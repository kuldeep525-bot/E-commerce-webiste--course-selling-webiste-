// import React from "react";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom
// import logo from "../../public/logos.png"; // Ensure the path to the logo is correct

// function Signup() {
//   return (
//     <div className="bg-gradient-to-r from-black to-blue-950 h-screen">
//       <div className="h-screen text-white container mx-auto p-6 space-y-10">
//         <header className="flex items-center justify-between">
//           <div className="flex items-center space-x-5">
//             <img
//               src={logo}
//               alt="logo"
//               className="w-20 h-20 rounded-full gap-3"
//             />
//             <h1 className="text-2xl text-orange-500 font-bold">TECH-COURSES</h1>
//           </div>
//           <div className="space-x-5">
//             <Link
//               to="/Login"
//               className="bg-transparent text-white border px-4 py-2 border-white cursor-pointer hover:bg-orange-500 hover:border-none hover:text-black rounded-md hover:font-bold duration-300"
//             >
//               Login
//             </Link>
//             <Link
//               to=""
//               className="bg-transparent text-white border px-4 py-2 border-white cursor-pointer hover:bg-orange-500 hover:border-none hover:text-black rounded-md hover:font-bold duration-300"
//             >
//               Join now
//             </Link>
//           </div>
//         </header>

//         {/* Signup Form */}
//         <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-[500px] mt-20">
//           <h2 className="text-2xl font-bold mb-4 text-center">
//             Welcome to <span className="text-orange-500">TECH-COURSES</span>
//           </h2>
//           <p className="text center text-gray-400 mb-6">
//             Just Signup To Join us!
//           </p>

//           <form>
//             <div className="mb-4">
//               <label htmlFor="firstname" className="text-gray-400 mb-2">
//                 Firstname
//               </label>
//               <input
//                 type="text"
//                 id="firstname"
//                 value="firstname"
//                 className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Type your firstname"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="lastname" className="text-gray-400 mb-2">
//                 Lastname
//               </label>
//               <input
//                 type="text"
//                 id="lastname"
//                 value="lastname"
//                 className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Type your lastname"
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="email" className="text-gray-400 mb-2">
//                 Email
//               </label>
//               <input
//                 type="text"
//                 id="email"
//                 value="email"
//                 className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Type your email"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="password" className="text-gray-400 mb-2">
//                 Password
//               </label>
//               <input
//                 type="text"
//                 id="password"
//                 value="password"
//                 className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Type your password"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               children="w-full bg-orange-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition"
//             >
//               Signup
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;


import React, { useState } from "react"; // Ensure useState is imported
import { Link } from "react-router-dom";
import logo from "../../public/logos.png";

function Signup() {
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add your signup logic here (e.g., API call)
    // Example: Validate email format
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    // Example: Check password length
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    // Proceed with form submission
    console.log("Form submitted successfully!");
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-950 ">
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
              to="/Login"
              className="bg-transparent text-white border px-4 py-2 border-white cursor-pointer hover:bg-orange-500 hover:border-none hover:text-black rounded-md hover:font-bold duration-300"
            >
              Login
            </Link>
            <Link
              to="/Signup"
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
            Just Signup To Join us!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="firstName" className="text-gray-400 block mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your first name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="text-gray-400 block mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your last name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-gray-400 block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;