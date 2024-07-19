import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoginResponse } from "../types/Auth";
import { login } from "../services/AuthService";


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data: LoginResponse = await login(email, password);
      const { id, username, email: userEmail, role, cartItems } = data;

      localStorage.setItem(
        "user",
        JSON.stringify({ id, username, userEmail, role })
      );
      localStorage.setItem("cart", JSON.stringify(cartItems || []));

      alert("Bạn đã đăng nhập thành công");
      if (role === 0) {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setError("Sai email hoặc mật khẩu");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Đăng Nhập</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm font-medium">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-sm font-medium">Mật khẩu</label>
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
          <button type="submit" className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary">Đăng Nhập</button>
          <div className="text-center">
            <h6>Bạn chưa có tài khoản?</h6>
            <Link to="/register" className="text-primary hover:underline">Đăng Ký</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
