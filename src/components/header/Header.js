"use client";
import { UserContext } from "@/context/UserProvider";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  const router = useRouter();
  const { cartCount } = useContext(UserContext);

  // Function to handle navigation to the cart page.

  const navigateToCart = () => {
    router.push("/cart");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-[60px] bg-black text-white flex items-center justify-between px-4 z-50">
      <div className="text-lg font-semibold">ProductCart</div>
      <div
        className="relative text-xl cursor-pointer hover:scale-110 transition-all ease-in-out duration-300"
        onClick={navigateToCart}
      >
        <FaShoppingCart />
        {cartCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-[18px] h-[18px] grid place-items-center">
            {cartCount}
          </div>
        )}
      </div>
    </div>
  );
}
