import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShoppingContext } from "../context/ShoppingContext";
import { CartItem } from "../types/CartItem";
import { Button } from "react-daisyui";
import { GiReturnArrow } from "react-icons/gi";

const ShoppingCart: React.FC = () => {
  const { cartItems, increaseQty, decreaseQty, removeCartItem, clearCart } =
    useShoppingContext();

  // Hàm tính tổng tiền
  const getTotalPrice = (): number => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const handleIncreaseQty = (id: string) => {
    increaseQty(id);
  };

  const handleDecreaseQty = (id: string) => {
    decreaseQty(id);
  };

  const handleRemoveItem = (id: string) => {
    removeCartItem(id);
  };

  const handleClearCart = () => {
    clearCart();
  };
  const navigate = useNavigate();

  const goToShop = () => {
    navigate("/shop");
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
            <Link to="/shopping-cart">
              <i className="fa-solid fa-circle-info pr-2"></i>Giỏ Hàng
            </Link>
          </li>
        </ul>
      </div>
      {/* Giỏ Hàng */}
      <div className="px-[10px] xl:px-[150px] gap-10 flex flex-col">
        <div className="">
          <h1 className="text-4xl font-bold mb-5">Giỏ Hàng</h1>
          {cartItems.length === 0 ? (
            <p>Giỏ hàng của bạn đang trống.</p>
          ) : (
            <div className="flex flex-col lg:flex-row lg:space-x-4">
              {/* Phần danh sách sản phẩm */}
              <div className="flex-grow overflow-y-auto max-h-[400px] scrollbar-hide">
                <ul>
                  {cartItems.map((item: CartItem) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center border-b border-gray-300 py-3"
                    >
                      <img
                        src={`./products/${item.img}`}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-grow ml-3">
                        <p className="text-lg font-semibold">{item.name}</p>
                        <p className="text-gray-600">{item.price}.000đ</p>
                      </div>
                      <div className="flex items-center">
                        <Button
                          onClick={() => handleDecreaseQty(item.id)}
                          className="bg-red-500 text-white mx-2"
                        >
                          -
                        </Button>
                        <span className="text-lg">{item.qty}</span>
                        <Button
                          onClick={() => handleIncreaseQty(item.id)}
                          className="bg-red-500 text-white mx-2"
                        >
                          +
                        </Button>
                        <Button
                          onClick={() => handleRemoveItem(item.id)}
                          className="bg-red-600 text-white mx-2"
                        >
                          Xóa
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Phần tổng tiền */}
              <div className="lg:w-64 lg:shrink-0 lg:sticky lg:top-16 lg:bg-white lg:p-4 lg:shadow-lg lg:border lg:border-gray-300">
                <p className="text-lg font-semibold mb-4">
                  Tổng Tiền: {getTotalPrice()}.000đ
                </p>
                <Button
                  onClick={handleClearCart}
                  className="bg-red-600 text-white w-full"
                >
                  Xóa Tất Cả
                </Button>
              </div>
            </div>
          )}
        </div>

        <Button onClick={goToShop} className="bg-primary text-white">
          <div className="text-white">
            <GiReturnArrow />
          </div>
          Xem Sản Phẩm Khác
        </Button>
      </div>
    </>
  );
};

export default ShoppingCart;