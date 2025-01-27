import { View, Text } from 'react-native'
import React from 'react'
import CartPage from '../CartPage'
import { useNavigation } from 'expo-router';

const cart = () => {
  const navigation = useNavigation();
  return (
    <CartPage></CartPage>
  )
}

export default cart