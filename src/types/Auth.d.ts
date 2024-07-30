export interface LoginResponse {
    id: string;
    username: string;
    email: string;
    role: number;
    cartItems?: any[];
  }
export interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  address: string;
}
