"use client";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const UserContext = createContext();

const UserProvider = (props) => {
  // Global state management, handling the products and cart data.

  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Calculation the total count of cart

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Add to cart functionality

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });

    toast.success(`Added ${item?.title ?? ``} to the cart!`);
  };

  // Remove from cart functionality

  const removeFromCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        const currentQuantity = updatedItems[existingItemIndex].quantity;

        if (currentQuantity <= 1) {
          updatedItems.splice(existingItemIndex, 1);
        } else {
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: currentQuantity - 1,
          };
        }
        return updatedItems;
      }
      return prevItems;
    });

    toast.success(`Removed ${item?.title ?? ``} from the cart!`);
  };

  // User context values to pass in the context provider.

  const userContext = {
    productsData,
    setProductsData,
    loading,
    setLoading,
    cartCount,
    addToCart,
    removeFromCart,
    cartItems,
    setCartItems,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
