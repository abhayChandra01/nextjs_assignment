import React from "react";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="absolute w-full top-0 z-[999] flex justify-center items-center h-screen bg-gray-900">
      <motion.div
        className="w-12 h-12 bg-white rounded-full"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop" }}
      />
    </div>
  );
}
