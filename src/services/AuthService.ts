import { LoginResponse } from "../types/Auth";

const API_URL = "http://localhost:3000";

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
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
