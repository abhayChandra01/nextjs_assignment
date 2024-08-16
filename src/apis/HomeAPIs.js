import axios from "axios";

export const fetchProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
