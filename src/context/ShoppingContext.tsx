// src/context/ShoppingContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CartItem, ShoppingContextType } from '../types/CartItem';
import { getProducts } from '../services/ProductService';

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
    } else {
      const newItem = { ...product, qty: 1 };
      setCartItems([...cartItems, newItem]);
    }
  };

  // Hàm xóa một mục khỏi giỏ hàng
  const removeCartItem = (id: string) => {
    const newItems = cartItems.filter(item => item.id !== id);
    setCartItems(newItems);
  };

  // Hàm xóa toàn bộ giỏ hàng
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    // Cung cấp context cho các components con
    <ShoppingContext.Provider value={{ cartItems, cartQty, totalPrice, increaseQty, decreaseQty, addCartItem, removeCartItem, clearCart, delivery, discount }}>
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContext;
