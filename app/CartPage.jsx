import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, Image, TouchableOpacity } from 'react-native';
import { useCart } from './utils/CartContext';
import { useNavigation } from 'expo-router';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.productItem}>
                <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{item.productName}</Text>
                  <Text style={styles.productPrice}>₹ {item.price}</Text>
                  <View style={styles.quantityContainer}>
                    <Button
                      title="-"
                      onPress={() => updateQuantity(item.id, 'decrease')}
                      disabled={item.quantity === 1}
                    />
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <Button title="+" onPress={() => updateQuantity(item.id, 'increase')} />
                  </View>
                  <Button title="Remove" onPress={() => removeFromCart(item.id)} />
                </View>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => navigation.navigate('BuyPage')}
          >
            <Text style={styles.buyButtonText}>Proceed to Buy</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1,padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  emptyCart: { fontSize: 18, color: 'grey' },
  productItem: { flexDirection: 'row', marginBottom: 15, borderBottomWidth: 1, paddingBottom: 10 },
  productImage: { width: 80, height: 80, marginRight: 10 },
  productDetails: { flex: 1 },
  productName: { fontSize: 18, fontWeight: 'bold' },
  productPrice: { fontSize: 16, color: '#017185' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  quantityText: { fontSize: 16, marginHorizontal: 10 },
  buyButton: { marginTop: 20, padding: 15, backgroundColor: '#28a745', borderRadius: 10 },
  buyButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
});

export default CartPage;
