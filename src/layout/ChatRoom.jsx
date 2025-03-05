import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("wss://your-backend.onrender.com/ws");
    setWs(socket);

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data)]);
    };

    return () => socket.close();
  }, []);

  const formik = useFormik({
    initialValues: { message: "" },
    validationSchema: Yup.object({
      message: Yup.string().trim().required("Message cannot be empty"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (ws) {
        ws.send(JSON.stringify({ text: values.message }));
        resetForm();
      }
    },
  });

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <div className="flex-grow overflow-auto bg-white p-4 rounded-xl shadow-md">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 border-b">
            {msg.text}
          </div>
        ))}
      </div>
      <form className="mt-4 flex" onSubmit={formik.handleSubmit}>
        <input
          className="flex-grow p-2 border rounded-l-md"
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-r-md"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Send
        </button>
      </form>
      {formik.errors.message && <div className="text-red-500 mt-2">{formik.errors.message}</div>}
    </div>
  );
};

export default ChatRoom;
