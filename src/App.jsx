import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./layout/AdminLogin";
import UserSignup from "./layout/UserSignup";
import UserLogin from "./layout/UserLogin";
import Dashboard from "./layout/Dashboard";
import AdminDashboard from "./layout/AdminDashboard";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="w-screen h-screen">
    <div>
    <Navbar />
    </div>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
};

export default App;


