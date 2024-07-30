import { LoginResponse, User } from "../types/Auth";

const API_URL = "http://localhost:3000";

// Function to log in and get user information
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  const data: LoginResponse = await response.json();
  return data;
};

// Function to fetch user details based on user ID
export const fetchUser = async (userId: number): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }

  const user: User = await response.json();
  return user;
};


export const register = async (
  username: string,
  email: string,
  phone: string,
  address: string,
  password: string
): Promise<void> => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, phone, address, password }),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }
};
