import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../services/AuthService";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, email, phone, address, password);
      alert("Đăng ký thành công");
      window.location.href = "/login";
    } catch (err) {
      setError("Đăng ký thất bại");
      console.error("Registration error:", err);
    }
  };

  return (
    <>
    <div className="glass mb-10 lg:px-20 py-2 px-[10px] text-sm breadcrumbs">
      <ul className="font-light">
        <li>
          <Link to="/">
            <i className="fa-solid fa-house pr-2"></i>Trang Chủ
          </Link>
        </li>
        <li>
          <Link to="/login">
            <i className="fa-solid fa-circle-info pr-2"></i>Đăng Nhập
          </Link>
        </li>
      </ul>
    </div>
    {/* <!-- ------------------------------------------------------------------------------------------------------- --> */}
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Đăng Ký</h2>
        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-1 text-sm font-medium">Tên Đăng Nhập</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-1 text-sm font-medium">Số Điện Thoại</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="mb-1 text-sm font-medium">Địa Chỉ</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-sm font-medium">Mật Khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary">Đăng Ký</button>
          <div className="text-end">
            <h6>Đã có tài khoản?</h6>
            <Link to="/login" className="text-primary hover:no-underline underline">Đăng Nhập</Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;
