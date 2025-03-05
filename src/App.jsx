import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./layout/AdminLogin";
import UserSignup from "./layout/UserSignup";
import UserLogin from "./layout/UserLogin";
import Dashboard from "./layout/Dashboard";

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    
  );
};

export default App;


