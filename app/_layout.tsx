import { Stack } from 'expo-router/stack';
import React from 'react';
import { CartProvider } from './utils/CartContext';
import FlashMessage from 'react-native-flash-message';

const Rootlayout = () => {
  return (
    <CartProvider>
      <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="ProductScreen" options={{ headerShown: false }} />
      <Stack.Screen name="ProductPage" options={{ headerShown: false }} />
      <Stack.Screen name="CartPage" options={{ headerShown: false }} />
    </Stack>
    <FlashMessage position="top" />;
    </CartProvider>
  );
}

export default Rootlayout;