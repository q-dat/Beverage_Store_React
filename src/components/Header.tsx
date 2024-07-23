import React, { useState, useEffect } from "react";
import { Button } from "react-daisyui";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useShoppingContext } from "../context/ShoppingContext";
import { Logo } from "../assets";
import { GiHamburgerMenu } from "react-icons/gi";
import Avatar from "boring-avatars";

const Header: React.FC = () => {
  const { getCartQty } = useShoppingContext();
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
    <div className="z-50 bg-white navbar py-[35px] px-[10px] lg:px-20">
      {/* Mobile */}
      <div className="navbar-start">
        <div className="dropdown flex">
          <Button className="lg:hidden swap swap-rotate">
            <input type="checkbox" />
            <GiHamburgerMenu className="text-2xl" />
          </Button>
          <ul className="z-[9999] menu menu-sm dropdown-content mt-3 p-5 shadow bg-base-100 rounded-box w-52 space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.link}
                  className={`${
                    active === item.name
                      ? "border-b-2 rounded-lg border-primary font-light text-primary"
                      : "font-light bg-primary hover:bg-opacity-50 hover:bg-primary rounded-lg text-white "
                  }`}
                  onClick={() => setActive(item.name)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/" className="hidden lg:flex text-xl justify-center w-full">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
      </div>

      {/* Desktop */}
      <div className="navbar-center lg:hidden">
        <Link to="/" className=" text-xl flex justify-center w-full">
          <img src={Logo} alt="Logo" />
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
                    : "font-light bg-primary hover:bg-opacity-50 hover:bg-primary rounded-lg text-white "
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
            <Button onClick={handleLogout} className="shadow galss">
              <HiOutlineLogout /> Đăng Xuất
            </Button>
            <Link to="/shopping-cart" className="bn relative">
              <Button className="shadow galss">
                <FaShoppingCart className="text-yellow-400 text-xl" />
                {/* Shopping Cart */}
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                  {getCartQty()}
                </span>
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="">
              <Button className="shadow galss">
                <FaUser />
                <span>Đăng Nhập</span>
              </Button>
            </Link>
            <Link to="/shopping-cart" className=" relative">
              <Button className="shadow galss">
                <FaShoppingCart className="text-yellow-400 text-xl" />
                {/* Shopping Cart */}
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                  {getCartQty()}
                </span>
              </Button>
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
              <Avatar />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
