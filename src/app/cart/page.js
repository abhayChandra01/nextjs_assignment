"use client";
import { UserContext } from "@/context/UserProvider";
import { useContext } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter();
  const { cartItems, addToCart, removeFromCart } = useContext(UserContext);

  // Handle add to cart.

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Handle remove from cart.

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
  };

  // Handle navigation to summary page.

  const navigateToSummary = () => {
    router.push("/summary");
  };

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 text-white p-4 flex items-center justify-center mt-24"
      >
        <p className="text-white text-xl">Your cart is empty!</p>
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
      <div className="flex flex-wrap gap-4 justify-center max-w-5xl mx-auto">
        {cartItems.map((item) => (
          <motion.div
            key={item.id}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex items-center w-full"
            whileHover={{ scale: 1.05 }}
            style={{ height: "200px" }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-1/3 h-full object-contain mr-auto"
            />
            <div className="p-3 flex flex-col gap-4 justify-between w-2/3">
              <h2 className="text-sm font-semibold truncate">{item.title}</h2>
              <p className="text-gray-400 text-sm">${item.price}</p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleRemoveFromCart(item)}
                  className="bg-gray-600 text-white rounded-full p-2 flex items-center justify-center"
                >
                  <FaMinus size={12} />
                </button>
                <span className="text-sm">{item.quantity}</span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-gray-600 text-white rounded-full p-2 flex items-center justify-center"
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={navigateToSummary}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
        >
          Proceed to Summary
        </button>
      </div>
    </motion.div>
  );
}
