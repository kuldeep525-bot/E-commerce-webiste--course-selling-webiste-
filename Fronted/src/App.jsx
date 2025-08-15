import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Componets/Home";
import Signup from "./Componets/Signup";
import Login from "./Componets/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
