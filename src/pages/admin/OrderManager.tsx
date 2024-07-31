import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchOrders, fetchUserInfoByOrderId } from "../../services/OrderService";

// Định nghĩa mã trạng thái đơn hàng và tên trạng thái
const statusCodes = {
  PENDING: 1,
  COMPLETED: 2,
  CANCELLED: 3,
};

const statusLabels: Record<number, string> = {
  [statusCodes.PENDING]: 'Đang chờ xử lý',
  [statusCodes.COMPLETED]: 'Đã hoàn thành',
  [statusCodes.CANCELLED]: 'Đã hủy',
};

const OrderManager: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [orderUserInfo, setOrderUserInfo] = useState<Record<number, any>>({});

  useEffect(() => {
    fetchOrders()
      .then(async (allOrders) => {
        setOrders(allOrders);

        // Fetch thông tin người dùng cho từng đơn hàng
        const userInfoPromises = allOrders.map(async (order: any) => {
          const userInfo = await fetchUserInfoByOrderId(order.id);
          return { orderId: order.id, userInfo };
        });
        
        const userInfos = await Promise.all(userInfoPromises);
        const userInfoMap = userInfos.reduce((map, { orderId, userInfo }) => {
          map[orderId] = userInfo;
          return map;
        }, {} as Record<number, any>);

        setOrderUserInfo(userInfoMap);
      })
      .catch((error) => {
        console.error("Lỗi lấy danh sách đơn hàng:", error);
        toast.error("Lỗi lấy danh sách đơn hàng.");
        navigate("/login");
      });
  }, [navigate]);

  const handleToggleDetails = (orderId: number) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
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
        <h2 className="text-3xl font-bold mb-5">Danh Sách Đơn Hàng</h2>
        {orders.length === 0 ? (
          <p>Chưa có đơn hàng nào.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">ID Đơn Hàng</th>
                <th className="border p-2">Ngày Tạo</th>
                <th className="border p-2">Trạng Thái</th>
                <th className="border p-2">Tổng</th>
                <th className="border p-2">Chi Tiết</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr>
                    <td className="border p-2">{order.id}</td>
                    <td className="border p-2">{order.createAt}</td>
                    <td className="border p-2">{statusLabels[order.status]}</td>
                    <td className="border p-2">{order.total}.000đ</td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => handleToggleDetails(order.id)}
                        className="btn text-white bg-primary"
                      >
                        {selectedOrderId === order.id ? "Ẩn Thông Tin" : "Xem Thông Tin"}
                      </button>
                    </td>
                  </tr>
                  {selectedOrderId === order.id && (
                    <React.Fragment>
                      <tr>
                        <td colSpan={5} className="border p-5">
                          <div className="border border-gray-300 p-5 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Chi Tiết Đơn Hàng</h3>
                            <p><strong>ID Đơn Hàng:</strong> {order.id}</p>
                            <p><strong>Ngày Tạo:</strong> {order.createAt}</p>
                            <p><strong>Trạng Thái:</strong> {statusLabels[order.status]}</p>
                            <p><strong>Tổng:</strong> {order.total}.000đ</p>
                          </div>
                        </td>
                      </tr>
                      {orderUserInfo[order.id] && (
                        <tr>
                          <td colSpan={5} className="border p-5">
                            <div className="border border-gray-300 p-5 rounded-lg">
                              <h3 className="text-xl font-semibold mb-4">Thông Tin Người Dùng</h3>
                              <p><strong>ID Người Dùng:</strong> {orderUserInfo[order.id].id}</p>
                              <p><strong>Tên người dùng:</strong> {orderUserInfo[order.id].username}</p>
                              <p><strong>Địa chỉ:</strong> {orderUserInfo[order.id].address || "Chưa có địa chỉ"}</p>
                              <p><strong>Số điện thoại:</strong> {orderUserInfo[order.id].phone || "Chưa có số điện thoại"}</p>
                              <p><strong>Email:</strong> {orderUserInfo[order.id].email || "Chưa có email"}</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default OrderManager;
