import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // ✅ Retrieve token from localStorage

    const fetchUsers = async () => {
      try {
        const response = await fetch("https://chats-backend-0kim.onrender.com/admin/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // ✅ Send token in Authorization header
          },
        });

        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchChats = async () => {
      try {
        const response = await fetch("https://chats-backend-0kim.onrender.com/admin/chats", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
          },
        });

        if (!response.ok) throw new Error("Failed to fetch chats");

        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchUsers();
    fetchChats();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 p-4 text-white">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <ul className="mt-4">
          <li className="p-2 hover:bg-gray-700 cursor-pointer">View Users</li>
          <li className="p-2 hover:bg-gray-700 cursor-pointer">View Chats</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6 bg-gray-900 text-white">
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="p-2 border-b">{user.username}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold mt-6">Chats</h2>
        <ul>
          {chats.map((chat) => (
            <li key={chat.id} className="p-2 border-b">
              Chat between {chat.user1_id} and {chat.user2_id}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
