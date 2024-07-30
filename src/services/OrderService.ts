import axios from 'axios';
import {  OrderDetail } from "../types/Products";

const API_URL = "http://localhost:3000";
export const fetchUserById = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy thông tin người dùng:", error);
    throw error;
  }
};
// Tạo đơn hàng và trả về ID đơn hàng
export const createOrder = async ({
  createAt,
  status,
  total,
  user_id,
  payment_id,
}: {
  createAt: string;  // Đảm bảo định dạng là 'YYYY-MM-DD HH:MM:SS'
  status: number;    // Sử dụng giá trị số nguyên cho trạng thái
  total: number;
  user_id: number;
  payment_id: number;
}): Promise<number> => {
  try {
    const response = await axios.post(`${API_URL}/orders`, {
      createAt,
      status,
      total,
      user_id,
      payment_id,
    });

    return response.data.id; // Giả sử phản hồi chứa ID của đơn hàng mới tạo
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Tạo đơn hàng không thành công: ${error.message}`);
    } else {
      throw new Error('Lỗi không xác định khi tạo đơn hàng');
    }
  }
};

// Cập nhật chi tiết đơn hàng
export const createOrderDetails = async (
  orderDetails: OrderDetail[]
): Promise<void> => {
  try {
    await axios.post(`${API_URL}/order-details`, orderDetails);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Tạo chi tiết đơn hàng không thành công: ${error.message}`);
    } else {
      throw new Error('Lỗi không xác định khi tạo chi tiết đơn hàng');
    }
  }
};
