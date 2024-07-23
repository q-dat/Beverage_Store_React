import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShoppingContext } from "../context/ShoppingContext";
import { CartItem } from "../types/CartItem";
import { Button } from "react-daisyui";
import { GiReturnArrow } from "react-icons/gi";
import { FaCirclePlus, FaPaypal, FaRegTrashCan } from "react-icons/fa6";
import { FaMinusCircle } from "react-icons/fa";

const ShoppingCart: React.FC = () => {
  const { cartItems, increaseQty, decreaseQty, removeCartItem, clearCart } =
    useShoppingContext();
  const navigate = useNavigate();

  // Hàm tính tổng tiền
  const getTotalPrice = (): number =>
    cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="glass mb-10 lg:px-20 py-2 px-[10px] text-sm breadcrumbs">
        <ul className="font-light">
          <li>
            <Link to="/">
              <i className="fa-solid fa-house pr-2"></i>Trang Chủ
            </Link>
          </li>
          <li>
            <Link to="/shopping-cart">
              <i className="fa-solid fa-circle-info pr-2"></i>Giỏ Hàng
            </Link>
          </li>
        </ul>
      </div>

      {/* Giỏ Hàng */}
      <div className="px-[10px] xl:px-[150px] gap-10 flex flex-col">
        <h1 className="text-4xl font-bold mb-5">Giỏ Hàng</h1>

        {cartItems.length === 0 ? (
          <p>Giỏ hàng của bạn đang trống.</p>
        ) : (
          <div className="flex flex-col lg:flex-row lg:space-x-4">
            {/* Danh sách sản phẩm */}
            <div className="flex flex-col lg:w-3/4 overflow-y-auto max-h-[400px] scrollbar-hide">
              <ul>
                {cartItems.map((item: CartItem) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center border-b shadow border-gray-300 py-3"
                  >
                    <img
                      src={`./products/${item.img}`}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex flex-col flex-grow px-2">
                      <p className="text-lg font-semibold">{item.name}</p>
                      <p className="text-gray-600">{item.price}.000đ</p>
                    </div>
                    <p className="hidden md:line-clamp-3 max-w-[300px]">
                      Mô tả: {item.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <FaMinusCircle
                          className="text-xl text-black cursor-pointer"
                          onClick={() => decreaseQty(item.id)}
                        />
                        <span className="text-lg text-black mx-2">
                          {item.qty}
                        </span>
                        <FaCirclePlus
                          className="text-xl text-black cursor-pointer"
                          onClick={() => increaseQty(item.id)}
                        />
                      </div>
                      <Button
                        onClick={() => removeCartItem(item.id)}
                        className="bg-red-600 text-white"
                      >
                        <FaRegTrashCan /> Xóa
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tổng tiền */}
            <div className="flex flex-col lg:w-[400px] shadow-xl rounded-sm p-5">
              <p className="text-lg font-semibold mb-4">
                Tổng Tiền: {getTotalPrice()}.000đ
              </p>
              <div className="flex flex-col gap-2">
                <Button className="bg-primary text-white">
                  <FaPaypal /> Thanh toán
                </Button>
                <Button
                  onClick={clearCart}
                  className="bg-red-600 text-white w-full"
                >
                  <FaRegTrashCan /> Xóa Tất Cả
                </Button>
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={() => navigate("/shop")}
          className="bg-primary text-white flex items-center gap-2"
        >
          <GiReturnArrow />
          Xem Sản Phẩm Khác
        </Button>
      </div>
    </>
  );
};

export default ShoppingCart;
