import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useCart } from './utils/CartContext';

const OrderPage = () => {
  const { orders } = useCart();

  const parsePrice = (price) => parseFloat(price.replace(/,/g, ''));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Orders</Text>
      {orders.length === 0 ? (
        <Text style={styles.emptyOrders}>No orders placed yet!</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text style={styles.orderTitle}>Order ID: {item.id}</Text>
              {item.items.map((product, index) => (
                <View key={index} style={styles.productContainer}>
                  <Image
                    source={{ uri: product.imageUrl }} 
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                  <View style={styles.productDetails}>
                    <Text style={styles.productName}>{product.productName}</Text>
                    <Text>Price: ₹{product.price} | Quantity: {product.quantity}</Text>
                  </View>
                </View>
              ))}
              <Text style={styles.totalAmount}>
                Total Amount: ₹{item.totalAmount}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  emptyOrders: { fontSize: 18, color: 'grey', textAlign: 'center', marginTop: 50 },
  orderItem: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  orderTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  productDetails: { flex: 1 },
  productName: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  totalAmount: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
});

export default OrderPage;
