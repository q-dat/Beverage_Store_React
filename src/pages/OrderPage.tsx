import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShoppingContext } from "../context/ShoppingContext";
import { Button } from "react-daisyui";
import { FaPaypal } from "react-icons/fa";
import { CartItem } from "../types/CartItem";
import { upsertOrder, createOrderDetails, fetchUserById } from "../services/OrderService";
import { OrderDetail } from "../types/Products";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define order status codes and labels
const statusCodes = {
  PENDING: 1,
  COMPLETED: 2,
  CANCELLED: 3,
};

const statusLabels = {
  [statusCodes.PENDING]: "Đang chờ",
  [statusCodes.COMPLETED]: "Hoàn thành",
  [statusCodes.CANCELLED]: "Đã hủy",
};

const OrderPage: React.FC = () => {
  const { cartItems, totalPrice, clearCart } = useShoppingContext();
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{
    id: number;
    username: string;
    phone?: string;
    email?: string;
    address?: string;
  } | null>(null);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/shopping-cart");
      return;
    }

    const fetchUserInfo = async () => {
      const userInfoString = localStorage.getItem("user");
      if (userInfoString) {
        try {
          const parsedUser = JSON.parse(userInfoString);
          const userId = parsedUser.id;

          const user = await fetchUserById(userId);
          setUserInfo({
            id: user.id,
            username: user.username,
            phone: user.phone,
            email: user.email,
            address: user.address,
          });
        } catch (error) {
          console.error("Lỗi lấy thông tin người dùng:", error);
          toast.error("Lỗi lấy thông tin người dùng.");
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    fetchUserInfo();
  }, [cartItems, navigate]);

  const handleCreateOrder = async () => {
    if (!userInfo) {
      toast.error("Chưa có thông tin người dùng.");
      return;
    }
  
    if (cartItems.length === 0) {
      toast.error("Giỏ hàng trống, không thể tạo đơn hàng.");
      return;
    }
  
    const orderDetails: OrderDetail[] = cartItems.map((item: CartItem) => ({
      id: 0,
      order_id: 0,  // sẽ được cập nhật sau khi tạo đơn hàng
      product_id: item.id,
      price: item.price,
      quantity: item.qty,
      total: item.price * item.qty,
      status: statusCodes.PENDING,
    }));
  
    try {
      const orderId = await upsertOrder({
        createAt: new Date().toISOString().replace("T", " ").substring(0, 19), // Format 'YYYY-MM-DD HH:MM:SS'
        status: statusCodes.PENDING,
        total: totalPrice,
        user_id: userInfo.id,
        payment_id: 1, 
      });
  
      const updatedOrderDetails = orderDetails.map((detail) => ({
        ...detail,
        order_id: orderId,
      }));
  
      await createOrderDetails(orderId, updatedOrderDetails);
  
      clearCart();
      setOrderStatus("Đơn hàng đã được tạo thành công!");
      toast.success("Đơn hàng đã được tạo thành công!");
      navigate("/order-success");
    } catch (error) {
      console.error("Lỗi tạo đơn hàng:", error);
      toast.error("Đã xảy ra lỗi khi tạo đơn hàng.");
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
            <Link to="/order">
              <i className="fa-solid fa-circle-info pr-2"></i>Đơn Hàng
            </Link>
          </li>
        </ul>
      </div>
      <ToastContainer />
      <div className="glass mb-10 lg:px-20 py-2 px-[10px] text-sm breadcrumbs">
        <h1 className="text-4xl font-bold mb-5">Tạo Đơn Hàng</h1>
        {userInfo && (
          <div className="border border-gray-300 p-5 rounded-lg mb-5">
            <h2 className="text-2xl font-semibold mb-4">Thông Tin Người Dùng</h2>
            <p>
              <strong>Tên người dùng:</strong> {userInfo.username}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {userInfo.address || "Chưa có địa chỉ"}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {userInfo.phone || "Chưa có số điện thoại"}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email || "Chưa có email"}
            </p>
          </div>
        )}

        {/* Order details */}
        <div className="border border-gray-300 p-5 rounded-lg mb-5">
          <h2 className="text-2xl font-semibold mb-4">Chi Tiết Đơn Hàng</h2>
          {cartItems.length === 0 ? (
            <p>Giỏ hàng trống.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Sản phẩm</th>
                  <th className="border p-2">Giá</th>
                  <th className="border p-2">Số lượng</th>
                  <th className="border p-2">Tổng</th>
                  <th className="border p-2">Trạng Thái</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.price}.000đ</td>
                    <td className="border p-2">{item.qty}</td>
                    <td className="border p-2">{item.price * item.qty}.000đ</td>
                    <td className="border p-2">{statusLabels[statusCodes.PENDING]}</td> 
                  </tr>
                ))}
                <tr>
                  <td colSpan={4} className="border p-2 text-right font-semibold">Tổng:</td>
                  <td className="border p-2 font-semibold">{totalPrice}.000đ</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {/* Payment button */}
        <div className="border border-gray-300 p-5 rounded-lg">
          <Button onClick={handleCreateOrder} className="bg-primary text-white">
            <FaPaypal /> Thanh Toán
          </Button>
          <p className="mt-4">{orderStatus}</p>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
