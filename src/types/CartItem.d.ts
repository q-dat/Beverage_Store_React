export interface CartItem {
    stat: any;
    st: any;
    id: string;
    name: string;
    price: number;
    img:string;
    description:string;
    qty: number;
  }
  
  export interface ShoppingContextType {
    cartItems: CartItem[];
    cartQty: number;
    totalPrice: number;
    increaseQty: (id: string) => void;
    decreaseQty: (id: string) => void;
    addCartItem: (product: CartItem) => void;
    removeCartItem: (id: string) => void;
    clearCart: () => void;
    delivery: number;
    discount: number;
    getCartQty: () => number;
  }
  