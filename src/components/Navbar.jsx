import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaUser } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-2 shadow-md fixed z-50 w-full">
      <div className="container mx-sreen flex justify-between items-center">
        {/* Home Icon */}
        <Link to="/dashboard" className="text-xl">
          <FaHome className="text-white text-2xl" />
        </Link>
        
        {/* Chatroom Title */}
        <h1 className="text-4xl font-bold">Chatroom</h1>
        
        {/* Search Icon and Profile Icon */}
        <div className="flex space-x-10">
        <Link to="/serach">
          <FaSearch className="text-white text-2xl cursor-pointer" />
          </Link>
          <Link to="/profile">
            <FaUser className="text-white text-2xl cursor-pointer" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
