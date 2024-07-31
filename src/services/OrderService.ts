import axios from 'axios';
import { OrderDetail } from "../types/Products";

const API_URL = "http://localhost:3000";
// Lấy tất cả đơn hàng
export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy toàn bộ đơn hàng:", error);
    throw error;
  }
};
// Lấy thông tin người dùng theo ID
export const fetchUserById = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy thông tin người dùng:", error);
    throw error;
  }
};

// Lấy danh sách đơn hàng của người dùng theo ID
export const fetchOrdersByUserId = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/orders`, { params: { user_id: userId } });
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy danh sách đơn hàng:", error);
    throw error;
  }
};

// Tạo hoặc cập nhật đơn hàng
export const upsertOrder = async ({
  createAt,
  status,
  total,
  user_id,
  payment_id,
}: {
  createAt: string;  // Đảm bảo định dạng là 'YYYY-MM-DD HH:MM:SS'
  status: number;   
  total: number;
  user_id: number;
  payment_id: number;
}): Promise<number> => {
  try {
    const orders = await fetchOrdersByUserId(user_id);
    
    if (orders.length > 0) {
      const orderId = orders[0].id;
      await axios.put(`${API_URL}/orders/${orderId}`, {
        createAt,
        status,
        total,
        user_id,
        payment_id,
      });
      return orderId;
    } else {
      const response = await axios.post(`${API_URL}/orders`, {
        createAt,
        status,
        total,
        user_id,
        payment_id,
      });
      return response.data.id; 
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Lỗi khi tạo hoặc cập nhật đơn hàng: ${error.message}`);
    } else {
      throw new Error('Lỗi không xác định khi tạo hoặc cập nhật đơn hàng');
    }
  }
};
export const createOrderDetails = async (
  orderId: number,
  orderDetails: OrderDetail[]
): Promise<void> => {
  try {
    await axios.post(`${API_URL}/order-details`, { orderId, details: orderDetails });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Tạo chi tiết đơn hàng không thành công: ${error.message}`);
    } else {
      throw new Error('Lỗi không xác định khi tạo chi tiết đơn hàng');
    }
  }
};

// Lấy chi tiết đơn hàng
export const fetchOrderById = async (orderId: number) => {
  try {
    const response = await axios.get(`${API_URL}/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy chi tiết đơn hàng:", error);
    throw error;
  }
};

// Lấy trạng thái đơn hàng theo ID
export const fetchOrderStatus = async (statusId: number) => {
  try {
    const response = await axios.get(`${API_URL}/statuses/${statusId}`);
    return response.data;
  } catch (error) {
    throw new Error('Lỗi khi lấy trạng thái đơn hàng');
  }
};
// Lấy thông tin người dùng của một đơn hàng
export const fetchUserInfoByOrderId = async (orderId: number) => {
  try {
    const order = await fetchOrderById(orderId);
    const userId = order.user_id;
    return fetchUserById(userId);
  } catch (error) {
    console.error("Lỗi lấy thông tin người dùng của đơn hàng:", error);
    throw error;
  }
};