import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import useWebSocket from "../hooks/useWebSocket";

const ChatRoom = () => {
  const { chatId } = useParams(); 
  const { messages, sendMessage } = useWebSocket(chatId);
  const [input, setInput] = useState("");

  const formik = useFormik({
    initialValues: { message: "" },
    validationSchema: Yup.object({
      message: Yup.string().trim().required("Message cannot be empty"),
    }),
    onSubmit: (values, { resetForm }) => {
      sendMessage(values.message, "1");
      resetForm();
    },
  });

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-900 text-white">
      <div className="flex-grow overflow-auto bg-gray-800 p-4 rounded-xl shadow-md">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 border-b">
            <strong>{msg.sender || "Unknown"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <form className="mt-4 flex" onSubmit={formik.handleSubmit}>
        <input
          className="flex-grow p-2 border rounded-md bg-gray-700 text-white"
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md"
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