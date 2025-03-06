import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('https://chats-backend-0kim.onrender.com/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("token", data.access_token); 
          localStorage.setItem("id", data.id);
          navigate("/AdminDashboard");
        } else {
          console.error('Login Failed:', data);
          alert(data.detail || 'Login failed');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('Network error');
      }
    },
  });

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <form onSubmit={formik.handleSubmit} className="p-6 bg-gray-800 rounded-lg shadow-md w-96">
        <h2 className="flex items-center justify-center text-2xl font-bold mb-4">Admin Login</h2>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;