import React, { useState } from "react";
import { Input, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Logo from "../../assets/Logo.png";
import toast from "react-hot-toast";

const BOT_TOKEN = import.meta.env.VITE_REACT_APP_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_REACT_APP_CHAT_ID
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
  const sendToTelegram = async (name, phone) => {
    const messageText = `✅ Yangi ro‘yxatdan o‘tish!%0A%0A👤 Ism: ${name}%0A📞 Telefon: ${phone}`;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${messageText}`;
  
    try {
      const response = await fetch(url);
      const result = await response.json();
  
      if (result.ok) {
        toast.success("Muvaffaqiyatli ro‘yxatdan o‘tildi!");
        return true;
      } else {
        toast.error("Telegramga yuborishda xatolik!");
        return false;
      }
    } catch (error) {
      console.error("Telegramga yuborishda xatolik:", error);
      toast.error("Tarmoq xatosi! Qaytadan urinib ko‘ring.");
      return false;
    }
  };

  const TELEGRAM_LINK = "https://t.me/+EQcFAZlggvY3NGU6"
  
  const handleSubmit = async () => {
    if (!username.trim() || username === "+998 " || !password.trim()) {
      toast.error("Iltimos, ismingiz va telefon raqamingizni kiriting!");
      return;
    }
  
    setLoading(true);
    const success = await sendToTelegram(password, username);
    if (success) {
      setUsername("+998 ");
      setPassword("");
      setTimeout(() => {
        window.location.href = TELEGRAM_LINK; 
      }, 1000); 
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#0065da] p-4 relative">
      <img src={Logo} alt="Logo" className="w-32 h-32 absolute top-4 right-4" />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-[#0065da] mb-6">Bepul master klass</h1>
        <Space direction="vertical" className="w-full">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Ismingiz</label>
            <Input
              value={password}
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ismingiz"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0065da]"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1">Telefon raqam</label>
            <Input
              value={username}
              onChange={(e) => setUsername(formatPhoneNumber(e.target.value))}
              maxLength={17}
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