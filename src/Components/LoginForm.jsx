import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Mengirim data login:", { username, password });

      const response = await axios.post(
        "http://192.168.18.237:8080/api/login",
        {
          username,
          password,
        }
      );

      console.log("Response dari backend:", response.data);

      if (response.data.data.success) {
        localStorage.setItem("UserID", response.data.data.id);
        localStorage.setItem("token", response.data.data.token);

        console.log("Data berhasil disimpan di localStorage:");
        console.log("UserID:", localStorage.getItem("UserID"));
        console.log("token:", localStorage.getItem("token"));

        navigate("/home");
      } else {
        setError("Login gagal: " + (response.data.message || "Coba lagi."));
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Terjadi kesalahan saat mencoba masuk. Silakan coba lagi.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 page-transition1">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <span>Belum punya akun? </span>
          <Link to="/register" className="text-blue-500 hover:underline">
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
