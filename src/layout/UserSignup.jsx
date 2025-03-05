import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";

const UserSignup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3, "Too short!").required("Username is required"),
      password: Yup.string().min(5, "Password must be at least 5 characters").required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch("https://chats-backend-0kim.onrender.com/users/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if (response.ok) {
          resetForm();
          alert("Signup successful! Redirecting to login...");
          navigate("/UserLogin"); // Redirect to login page
        } else {
          alert(data.detail || "Signup failed");
        }
      } catch (error) {
        alert("Network error");
      }
    },
  });

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <form onSubmit={formik.handleSubmit} className="p-6 bg-gray-800 rounded-lg shadow-md w-96">
        <h2 className="flex items-center justify-center text-2xl font-bold mb-4">Signup</h2>
        <div className="mb-4">
          <label className="block text-gray-300">Username</label>
          <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded"
          />
          {formik.touched.username && formik.errors.username && (
            <p className="text-red-400 text-sm mt-1">{formik.errors.username}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Password</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-400 text-sm mt-1">{formik.errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
        >
          Sign Up
        </button>
        <div className="p-3 text-center text-sm">
          Already have an account{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>
      </form>
    </div>
  );
};

export default UserSignup;