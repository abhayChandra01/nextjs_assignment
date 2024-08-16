"use client";
import Header from "@/components/header/Header";
import Loader from "@/components/loader/Loader";
import { UserContext } from "@/context/UserProvider";
import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }) {
  const { loading } = useContext(UserContext);
  return (
    <div className="relative flex flex-col w-full">
      {loading && <Loader />}

      <ToastContainer
        position="bottom-center"
        theme="dark"
        hideProgressBar
        stacked
        autoClose={2000}
      />

      <Header />

      <div className="pt-[60px] bg-gray-900 text-white min-h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
