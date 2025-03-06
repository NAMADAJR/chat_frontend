import { useEffect, useState } from "react";

const useWebSocket = (chatId) => {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    if (!chatId) return;

    const socket = new WebSocket(`https://chats-backend-0kim.onrender.com/ws/${chatId}`);
    setWs(socket);

    socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.onclose = () => console.log("WebSocket closed");
    socket.onerror = (error) => console.error("WebSocket Error:", error);

    return () => socket.close();
  }, [chatId]);

  const sendMessage = (message, senderId) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ sender_id: senderId, content: message }));
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;
