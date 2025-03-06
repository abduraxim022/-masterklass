import React, { useState } from "react";
import { Input, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/Logo.png";



export default function Login() {
  const [username, setUsername] = useState("+998 ");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formatPhoneNumber = (phone) => {
    phone = phone.replace(/\D/g, "");
    if (phone.startsWith("998")) {
      phone = phone.slice(3);
    }
    if (phone.length > 9) {
      phone = phone.slice(0, 9);
    }
    let formatted = "+998 ";
    if (phone.length > 0) formatted += `${phone.slice(0, 2)}`;
    if (phone.length > 2) formatted += ` ${phone.slice(2, 5)}`;
    if (phone.length > 5) formatted += ` ${phone.slice(5, 7)}`;
    if (phone.length > 7) formatted += ` ${phone.slice(7, 9)}`;
    return formatted;
  };

  const handleSubmit = () => {
    if (!username.trim() || username === "+998 " || !password.trim()) {
      toast.error("Iltimos, ismingiz va telefon raqamingizni kiriting!");
      return;
    }
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      toast.success("Muvaffaqiyatli ro‘yxatdan o‘tildi!");
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#0065da] p-4 relative">
      <img src={Logo} alt="Logo" className="w-32 h-32 absolute top-4 right-4" />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-[#0065da] mb-6">Tizimga Kirish</h1>
        <Space direction="vertical" className="w-full">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Telefon raqam</label>
            <Input
              value={username}
              onChange={(e) => setUsername(formatPhoneNumber(e.target.value))}
              maxLength={17}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0065da]"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1">Ismingiz</label>
            <Input
              value={password}
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ismingiz"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0065da]"
            />
          </div>
        </Space>
        {error && (
          <div className="text-red-600 text-sm flex items-center mt-2">
            <ExclamationCircleOutlined className="mr-2" /> {error}
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-[#0065da] text-white py-2 rounded-lg text-lg font-semibold shadow-md hover:bg-[#0055c4] transition-all"
          disabled={loading}
        >
          {loading ? "Ro‘yxatdan O‘tilmoqda..." : "Ro‘yxatdan otish "}
        </button>
      </div>
    </div>
  );
}