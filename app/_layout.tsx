import { Stack } from 'expo-router/stack';
import React from 'react';
import { CartProvider } from './utils/CartContext';
import { UserProvider } from './utils/UserContext';
import { WishlistProvider } from './utils/WishlistContext';
import FlashMessage from 'react-native-flash-message';

const Rootlayout = () => {
  return (
    <UserProvider> 
    <CartProvider>
    <WishlistProvider>
      <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="ProductScreen" options={{ headerShown: false }} />
      <Stack.Screen name="ProductPage" options={{ headerShown: false }} />
      <Stack.Screen name="CartPage" options={{ headerShown: false }} />
      <Stack.Screen name="BuyPage" options={{ headerShown: false }} />
      <Stack.Screen name="OrderPage" options={{ headerShown: false }} />
      <Stack.Screen name="WishlistPage" options={{ headerShown: false }} />
    </Stack>
    <FlashMessage position="top" />
    </WishlistProvider>
    </CartProvider>
    </UserProvider>
  );
}

export default Rootlayout;