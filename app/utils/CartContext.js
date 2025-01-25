import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
  
    const addToCart = (product) => {
      setCartItems((prevItems) => {
        const existingProduct = prevItems.find((item) => item.id === product.id);
  
        if (existingProduct) {
          return prevItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });
    };
  
    const removeFromCart = (productId) => {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };
  
    const updateQuantity = (productId, action) => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: action === 'increase' ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
              }
            : item
        )
      );
    };
  
    return (
      <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
        {children}
      </CartContext.Provider>
    );
  };
  
export const useCart = () => useContext(CartContext);
