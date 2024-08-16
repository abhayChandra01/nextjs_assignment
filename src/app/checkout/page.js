"use client";
import { UserContext } from "@/context/UserProvider";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { BiSolidPurchaseTag } from "react-icons/bi";

export default function Checkout() {
  const router = useRouter();
  const { setCartItems, cartItems } = useContext(UserContext);

  // Function to handle navigation to home.

  const handleBackToHome = () => {
    router.push("/");
  };

  // Emptying the cart when the page loads.

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/");
    } else {
      setCartItems([]);
    }
  }, [router]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto text-center mt-20 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4">
          <BiSolidPurchaseTag size={24} />
          <h1 className="text-2xl font-semibold">Order Placed</h1>
        </div>
        <p className="text-lg mb-6">Thanks for shopping with us!</p>
        <motion.div
          className="inline-flex items-center bg-gray-800 text-white text-xs font-semibold rounded-full px-3 py-1 mb-6 w-fit"
          whileHover={{ scale: 1.05 }}
        >
          Your order has been successfully placed.
        </motion.div>
        <button
          onClick={handleBackToHome}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300 w-fit"
        >
          Back to Home Page
        </button>
      </div>
    </motion.div>
  );
}
