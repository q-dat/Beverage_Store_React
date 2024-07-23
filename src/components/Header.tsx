import React, { useState, useEffect } from "react";
import { Button } from "react-daisyui";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [active, setActive] = useState<string>("Trang Chủ");
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user && user.username) {
      setUsername(user.username);
    }
  }, []);

  const navItems = [
    { name: "Trang Chủ", link: "/" },
    { name: "Sản Phẩm", link: "/shop" },
    { name: "Giới Thiệu", link: "/about" },
    { name: "Liên Hệ", link: "/contact" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUsername(null);
    window.location.href = "/login";
  };

  return (
    <div className="navbar py-[35px] px-[10px] lg:px-20">
      {/* Mobile */}
      <div className="navbar-start">
        <div className="dropdown flex">
          <label className="lg:hidden btn btn-circle swap swap-rotate">
            <input type="checkbox" />
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
            <svg
              className="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 289.49 256 400 145.49" />
            </svg>
          </label>
          <ul className="z-[9999] menu menu-sm dropdown-content mt-3 p-5 shadow bg-base-100 rounded-box w-52 space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.link}
                  className={`${
                    active === item.name
                      ? "border-b-2 rounded-lg border-primary font-light text-primary"
                      : "font-light bg-primary hover:bg-opacity-50 hover:bg-primary rounded-lg text-black "
                  }`}
                  onClick={() => setActive(item.name)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/"
            className="hidden lg:flex btn btn-ghost text-xl justify-center w-full"
          >
            <img src="/image/logo.webp" alt="Logo" />
          </Link>
        </div>
      </div>

      {/* Desktop */}
      <div className="navbar-center lg:hidden">
        <Link
          to="/"
          className="btn btn-ghost text-xl flex justify-center w-full"
        >
          <img src="/image/logo.webp" alt="Logo" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.link}
                className={`${
                  active === item.name
                    ? "border-b-2 rounded-lg border-primary font-light text-primary"
                    : "font-light bg-primary hover:bg-opacity-50 hover:bg-primary rounded-lg text-black "
                }`}
                onClick={() => setActive(item.name)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end space-x-5 hidden xl:flex">
        {username ? (
          <>
            <span className="text-black">Xin chào, {username}</span>
            <Button onClick={handleLogout} className="">
              <HiOutlineLogout /> Đăng Xuất
            </Button>
            <Link to="/shopping-cart" className="btn">
              <FaShoppingCart />
              {/* Shopping Cart */}
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="btn">
              <FaUser />
              <span>Đăng Nhập</span>
            </Link>
            <Link to="/shopping-cart" className="btn">
              <FaShoppingCart />
              {/* Shopping Cart */}
            </Link>
          </>
        )}
      </div>
      <div>
        <Link to="/login">
          <div className="login"></div>
        </Link>
      </div>

      {/* Avatar login mobile */}
      <div className="lg:hidden navbar-end">
        <div className="avatar online flex">
          <div className="w-10 rounded-full">
            <Link to="/login">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="Avatar"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
