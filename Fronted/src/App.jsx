import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Componets/Home";
import Signup from "./Componets/Signup";
import Login from "./Componets/Login";
import Courses from "./Componets/Courses";
import Buy from "./Componets/Buy";
import Purchase from "./Componets/Purchase";
import Adminsignup from "./Admin/Adminsignup";
import AdminLogin from "./Admin/AdminLogin";
import Dashboard from "./Admin/Dashboard";
import Ourcourses from "./Admin/Ourcourses";
import Coursecreate from "./Admin/Coursecreate";
import Updatecourse from "./Admin/Updatecourse";

function App() {
  //protect route
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* other routes */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/buy/:courseId" element={<Buy />} />
        <Route
          path="/purchase"
          element={user?<Purchase /> : <Navigate to={"/login"} />}
        />
        {/* admin routes */}
        <Route path="/admin/signup" element={<Adminsignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={admin?<Dashboard /> : <Navigate to={"/admin/login"} />}
        />
        <Route path="/admin/create-course" element={<Coursecreate />} />
        <Route path="/admin/update-course/:id" element={<Updatecourse />} />
        <Route path="/admin/ourcourses" element={<Ourcourses />} />
      </Routes>
    </div>
  );
}

export default App;



