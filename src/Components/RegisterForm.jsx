import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [birth_place, setBirthPlace] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [employee_id, setEmployeeID] = useState("");
  const [employee_type, setEmployeeType] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Memeriksa apakah password dan konfirmasi password sesuai
      if (password !== password_confirm) {
        setError("Konfirmasi password tidak sesuai");
        return;
      }

      // Mengirim data ke API menggunakan axios
      const response = await axios.post(
        "http://192.168.18.237:8080/api/register",
        {
          username,
          email,
          password,
          password_confirm,
          phone_number,
          gender,
          birth_place,
          birth_date,
          name,
          employee_id,
          employee_type,
        }
      );

      // Menangani respon dari API
      console.log("Response data:", response.data);

      if (response.data) {
        // Jika berhasil, navigasi ke halaman login
        navigate("/login");
      } else {
        setError("Gagal melakukan registrasi. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        setError(
          `Terjadi kesalahan saat melakukan registrasi: ${
            error.response.data.message || "Silakan coba lagi."
          }`
        );
      } else {
        setError(
          "Terjadi kesalahan saat melakukan registrasi. Silakan coba lagi."
        );
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 page-transition1">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Employee ID:</label>
            <input
              type="text"
              value={employee_id}
              onChange={(e) => setEmployeeID(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Employee Type:</label>
            <input
              type="text"
              value={employee_type}
              onChange={(e) => setEmployeeType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
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
            <label className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Confirm Password:
            </label>
            <input
              type="password"
              value={password_confirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone Number:</label>
            <input
              type="tel"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Gender:</label>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Birth Place:</label>
            <input
              type="text"
              value={birth_place}
              onChange={(e) => setBirthPlace(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Birth Date:</label>
            <input
              type="text"
              value={birth_date}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <span>Sudah punya akun? </span>
          <Link to="/login" className="text-blue-500 hover:underline">
            Kembali ke Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
