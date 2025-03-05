import React, { useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState({});
  const [selectedChat, setSelectedChat] = useState(null);
  const userId = localStorage.getItem("id"); // Retrieve user ID from localStorage

  useEffect(() => {
    const fetchChats = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`https://chats-backend-0kim.onrender.com/chats/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch chats");
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://chats-backend-0kim.onrender.com/users/");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        const userMap = {};
        data.forEach(user => { userMap[user.id] = user.username; });
        setUsers(userMap);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchChats();
    fetchUsers();
  }, [userId]);

  return (
    <div className="flex h-screen w-screen bg-gray-900 text-white">
      {/* Chat List */}
      <div className="w-1/3 h-full bg-gray-800 text-white p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Your Chats</h2>
        <ul>
          {chats.length > 0 ? (
            chats.map((chat) => (
              <li
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-2 border-b border-gray-700 cursor-pointer h-full flex items-center justify-between ${
                  selectedChat === chat.id ? "bg-gray-600" : ""
                }`}
              >
                Chat with {chat.user1_id === userId ? users[chat.user2_id] : users[chat.user1_id]}
                {chat.latest_message && (
                  <p className="text-gray-400 text-sm">Latest: {chat.latest_message}</p>
                )}
              </li>
            ))
          ) : (
            <p className="text-gray-400">No chats found</p>
          )}
        </ul>
      </div>
      
      {/* Chat Room */}
      <div className="w-2/3 h-full bg-gray-900 text-white p-6">
        {selectedChat ? <ChatRoom chatId={selectedChat} /> : <p className="flex items-center justify-center h-full">Select a chat to view messages</p>}
      </div>
    </div>
  );
};

export default Chats;