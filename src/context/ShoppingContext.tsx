import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CartItem, ShoppingContextType } from '../types/CartItem';
import { getProducts } from '../services/ProductService';
import { toast, ToastContainer } from 'react-toastify'; // Import thư viện toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS của react-toastify

// Tạo context cho giỏ hàng
const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

// Hook để sử dụng context của giỏ hàng
export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShoppingContext must be used within a ShoppingProvider');
  }
  return context;
};

interface ShoppingProviderProps {
  children: ReactNode;
}

// Component ShoppingProvider cung cấp dữ liệu giỏ hàng cho các components con
export const ShoppingProvider: React.FC<ShoppingProviderProps> = ({ children }) => {
  // Khởi tạo state cho các mục trong giỏ hàng từ localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const jsonCartData = localStorage.getItem('shopping_cart');
    return jsonCartData ? JSON.parse(jsonCartData) : [];
  });

  // Lưu giỏ hàng vào localStorage mỗi khi cartItems thay đổi
  useEffect(() => {
    localStorage.setItem('shopping_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Gọi API để lấy danh sách sản phẩm khi component được render lần đầu
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts(); // Lấy dữ liệu sản phẩm từ API
        // Nếu bạn cần thêm các sản phẩm vào giỏ hàng, bạn có thể làm như sau
        // Ví dụ: nếu bạn muốn thêm tất cả các sản phẩm lấy được vào giỏ hàng
        const cartData = products.map((product: CartItem) => ({ ...product, qty: 1 }));
        setCartItems(cartData);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };
    fetchProducts();
  }, []);

  // Tính tổng số lượng và giá tiền của giỏ hàng
  const cartQty = cartItems.reduce((qty, item) => qty + item.qty, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.qty * item.price, 0);
  const delivery = 0; // Chi phí vận chuyển, có thể điều chỉnh theo nhu cầu
  const discount = 0; // Chiết khấu, có thể điều chỉnh theo nhu cầu

  // Hàm tăng số lượng một mục trong giỏ hàng
  const increaseQty = (id: string) => {
    const currentCartItem = cartItems.find(item => item.id === id);
    if (currentCartItem) {
      const newItems = cartItems.map(item => {
        if (item.id === id) {
          return { ...item, qty: item.qty + 1 };
        } else {
          return item;
        }
      });
      setCartItems(newItems);
      toast.success('Số lượng sản phẩm đã được tăng'); // Thông báo khi tăng số lượng
    }
  };

  // Hàm giảm số lượng một mục trong giỏ hàng
  const decreaseQty = (id: string) => {
    const currentCartItem = cartItems.find(item => item.id === id);
    if (currentCartItem) {
      if (currentCartItem.qty === 1) {
        removeCartItem(id); // Nếu số lượng là 1, xóa mục khỏi giỏ hàng
      } else {
        const newItems = cartItems.map(item => {
          if (item.id === id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
        setCartItems(newItems);
        toast.info('Số lượng sản phẩm đã được giảm'); // Thông báo khi giảm số lượng
      }
    }
  };

  // Hàm thêm một mục vào giỏ hàng
  const addCartItem = (product: CartItem) => {
    const currentCartItem = cartItems.find(item => item.id === product.id);
    if (currentCartItem) {
      const newItems = cartItems.map(item => {
        if (item.id === product.id) {
          return { ...item, qty: item.qty + 1 };
        } else {
          return item;
        }
      });
      setCartItems(newItems);
      toast.success('Sản phẩm đã được thêm vào giỏ hàng'); // Thông báo khi thêm sản phẩm
    } else {
      const newItem = { ...product, qty: 1 };
      setCartItems([...cartItems, newItem]);
      toast.success('Sản phẩm mới đã được thêm vào giỏ hàng'); // Thông báo khi thêm sản phẩm mới
    }
  };

  // Hàm xóa một mục khỏi giỏ hàng
  const removeCartItem = (id: string) => {
    const newItems = cartItems.filter(item => item.id !== id);
    setCartItems(newItems);
    toast.error('Sản phẩm đã bị xóa khỏi giỏ hàng'); // Thông báo khi xóa sản phẩm
  };

  // Hàm xóa toàn bộ giỏ hàng
  const clearCart = () => {
    setCartItems([]);
    toast.info('Giỏ hàng đã được xóa'); // Thông báo khi xóa toàn bộ giỏ hàng
  };

  // Hàm lấy số lượng giỏ hàng
  const getCartQty = (): number => {
    return cartItems.reduce((total, item) => total + item.qty, 0);
  };

  return (
    <>
      <ShoppingContext.Provider value={{ cartItems, cartQty, totalPrice, increaseQty, decreaseQty, addCartItem, removeCartItem, clearCart, delivery, discount, getCartQty }}>
        {children}
      </ShoppingContext.Provider>
      <ToastContainer /> {/* Thêm ToastContainer vào tree */}
    </>
  );
};

export default ShoppingContext;
