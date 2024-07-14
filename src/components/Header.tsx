import React, {  useState } from "react";
import { Link } from "react-router-dom";


const Header: React.FC = () => {
  const [active, setActive] = useState<string>("Trang Chủ");
  const navItems = [
    { name: "Trang Chủ", link: "/" },
    { name: "Sản Phẩm", link: "/shop" },
    { name: "Giới Thiệu", link: "/about" },
    { name: "Liên Hệ", link: "/contact" },
  ];

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
          <ul className="z-[9999] menu menu-sm dropdown-content mt-3 p-5 shadow bg-base-100 rounded-box w-52">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.link}
                  className={`${
                    active === item.name
                      ? "border-b-2 rounded-none border-primary font-light text-primary"
                      : "font-light rounded-none text-black"
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
        <ul className="menu menu-horizontal px-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.link}
                className={`${
                  active === item.name
                    ? "border-b-2 rounded-none border-primary font-light text-primary"
                    : "font-light rounded-none text-black"
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
        <Link to="/login" className="btn">
          <i className="fa fa-user"></i>
          <span>Đăng Nhập</span>
        </Link>
        <Link to="/cart" className="btn">
          <i className="fa fa-cart-shopping"></i>
          Giỏ Hàng
        </Link>
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
