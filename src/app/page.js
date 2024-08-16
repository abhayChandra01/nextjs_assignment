"use client";
import { fetchProducts } from "@/apis/HomeAPIs";
import { UserContext } from "@/context/UserProvider";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function Home() {
  const {
    loading,
    setLoading,
    productsData,
    setProductsData,
    addToCart,
    removeFromCart,
    cartItems,
  } = useContext(UserContext);

  // Function to fetch products list from open source API.

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetchProducts();
      if (response?.status === 200) {
        setProductsData(response?.data);
        toast.success("Products fetched successfully!");
      } else {
        setProductsData([]);
      }
    } catch (error) {
      setProductsData([]);
      toast.error("Error loading products!");
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Loading the products when the page rendors.

  useEffect(() => {
    loadProducts();
  }, []);

  // Function to find the item by ID from cart items.

  const getCartItem = (id) => {
    return cartItems.find((item) => item.id === id);
  };

  // Function to handle add to cart.

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Function to handle remove from cart.

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
  };

  if (productsData.length === 0 && !loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 text-white p-4 flex items-center justify-center mt-24"
      >
        <p className="text-white text-xl">No products available!</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-white min-h-screen p-4"
    >
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
        {productsData.map((product) => {
          const cartItem = getCartItem(product.id);
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <motion.div
              key={product.id}
              className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              style={{ height: "300px", width: "180px" }}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-2/3 object-cover"
              />
              <div className="p-3 flex flex-col justify-between h-1/3">
                <h2 className="text-xs font-semibold truncate">
                  {product.title}
                </h2>
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 text-xs">${product.price}</p>
                  {quantity > 0 ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleRemoveFromCart(product)}
                        className="bg-gray-600 text-white rounded-full p-2 flex items-center justify-center"
                      >
                        <FaMinus size={10} />
                      </button>
                      <span className="text-xs">{quantity}</span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-gray-600 text-white rounded-full p-2 flex items-center justify-center"
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-gray-600 text-white rounded-full p-2 flex items-center justify-center"
                    >
                      <FaPlus size={10} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
