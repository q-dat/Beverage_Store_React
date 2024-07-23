import axios from "axios";

const API_URL = "http://localhost:3000/products";

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
};

export const getProduct = async (productId: string) => {
  try {
    const response = await axios.get(`${API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
};
