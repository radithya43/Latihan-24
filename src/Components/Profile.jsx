import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone_number: "",
    gender: "",
    birth_place: "",
    birth_date: "",
  });
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("UserID");

    if (!token || !id) {
      console.log("Token atau ID tidak ditemukan di localStorage.");
      navigate("/login");
      return;
    }

    axios
      .get(`http://192.168.18.237:8080/api/profiles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Data Respon:", response.data.data);
        const userData = response.data.data;
        if (userData) {
          setUser({
            name: userData.name || "",
            username: userData.username || "",
            email: userData.email || "",
            phone_number: userData.phone_number || "",
            gender: userData.gender || "",
            birth_place: userData.birth_place || "",
            birth_date: userData.birth_date || "",
          });
          if (userData.photo) {
            const photoFileName = userData.photo;
            const fullAvatarUrl = `http://192.168.18.237:8080/api/uploads/user/${id}/${photoFileName}?apikey=${token}`;
            setAvatarUrl(fullAvatarUrl);
          }
        } else {
          console.error("Data pengguna tidak ditemukan atau tidak lengkap");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error mengambil data profil:", error.response.data);
          alert("Gagal mengambil data profil: " + error.response.data.message);
        } else {
          console.error("Error mengambil data profil:", error);
          alert("Gagal mengambil data profil");
        }
      });
  }, [navigate]);

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);

      const token = localStorage.getItem("token");
      const id = localStorage.getItem("UserID");

      try {
        let response;
        if (avatarUrl) {
          response = await axios.put(
            `http://192.168.18.237:8080/api/profiles/${id}/photo`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("Avatar updated successfully:", response.data.data.photo);
        } else {
          response = await axios.post(
            `http://192.168.18.237:8080/api/profiles/${id}/photo`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("Image upload successful:", response.data.data.photo);
        }

        if (response.data && response.data.data && response.data.data.photo) {
          const photoFileName = response.data.data.photo;
          const fullAvatarUrl = `http://192.168.18.237:8080/api/uploads/user/${id}/${photoFileName}?apikey=${token}`;
          setAvatarUrl(fullAvatarUrl);
          console.log("avatarUrl updated to:", fullAvatarUrl);
        } else {
          console.error("Error: photo not returned in response");
          alert("Upload berhasil tetapi server tidak mengembalikan URL foto.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image");
      }
    }
  };

  const handleAvatarClick = () => {
    document.getElementById("avatarInput").click();
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin akan keluar?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("UserID");
      localStorage.removeItem("profileImage");
      navigate("/login");
    }
  };

  const handleDeleteAvatar = async () => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus foto profil?"
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("UserID");
        await axios.delete(
          `http://192.168.18.237:8080/api/profiles/${id}/photo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAvatarUrl(null);
        console.log("Avatar deleted successfully");
      } catch (error) {
        console.error("Error deleting avatar:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 via-white to-gray-200 p-4 page-transition1">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Profil Pengguna</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="mb-6 text-center">
          <div
            className="relative rounded-full h-24 w-24 bg-gray-300 mx-auto mb-4 flex items-center justify-center text-gray-600 cursor-pointer border-4 border-gray-400 shadow-inner"
            onClick={handleAvatarClick}
          >
            {avatarUrl ? (
              <div className="relative">
                <img
                  className="rounded-full h-24 w-24 object-cover"
                  src={avatarUrl}
                  alt="Foto Profil"
                />
                <button
                  className="absolute top-0 right-0 mt-1 mr-1 h-6 w-6 bg-red-600 rounded-full flex items-center justify-center text-white shadow-md hover:bg-red-700"
                  onClick={handleDeleteAvatar}
                >
                  <FontAwesomeIcon icon={faTrash} className="text-sm" />
                </button>
              </div>
            ) : (
              <FontAwesomeIcon icon={faPlus} className="text-3xl" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            id="avatarInput"
            className="hidden"
          />
        </div>
        {[
          { label: "Nama", value: user.name },
          { label: "Username", value: user.username },
          { label: "Email", value: user.email },
          { label: "No. Telepon", value: user.phone_number },
          { label: "Jenis Kelamin", value: user.gender },
          { label: "Tempat Lahir", value: user.birth_place },
          { label: "Tanggal Lahir", value: user.birth_date },
        ].map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 mb-2">{field.label}:</label>
            <input
              type="text"
              value={field.value}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              readOnly
            />
          </div>
        ))}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Keluar
        </button>
      </div>
    </div>
  );
}

export default Profile;
