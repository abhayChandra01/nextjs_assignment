"use client";
import { UserContext } from "@/context/UserProvider";
import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Summary() {
  const router = useRouter();
  const { cartItems } = useContext(UserContext);

  // Calculate total cost and apply 10% discount

  const calculateTotals = () => {
    let totalBeforeDiscount = 0;
    cartItems.forEach((item) => {
      totalBeforeDiscount += item.price * item.quantity;
    });
    const discount = 0.1; // 10% discount
    const totalAfterDiscount =
      totalBeforeDiscount - totalBeforeDiscount * discount;
    return { totalBeforeDiscount, totalAfterDiscount };
  };

  const { totalBeforeDiscount, totalAfterDiscount } = calculateTotals();

  // Function to handle navigation to checkout page.

  const navigateToSummary = () => {
    router.push("/checkout");
  };

  // Error check if the cart is empty, then navigating to landing page.

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/");
    }
  }, [cartItems, router]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-white min-h-screen p-4"
    >
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Order Summary</h1>
        <div className="flex flex-wrap gap-4 justify-center">
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
                <p className="text-sm">Quantity: {item.quantity}</p>
                <p className="text-gray-400 text-sm">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 text-center space-y-2">
          <p className="text-lg font-semibold">
            Total: ${totalBeforeDiscount.toFixed(2)}
          </p>
          <div className="inline-flex items-center bg-blue-600 text-white text-xs font-semibold rounded-full px-3 py-1">
            Applying 10% Discount
          </div>
          <p className="text-lg font-semibold">
            New Total: ${totalAfterDiscount.toFixed(2)}
          </p>
          <button
            onClick={navigateToSummary}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            Checkout
          </button>
        </div>
      </div>
    </motion.div>
  );
}
