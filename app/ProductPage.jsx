import { View, Text, Image, StyleSheet, ScrollView,Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {fetchProductDetails,getRating} from './utils/helper'
import { useCart } from './utils/CartContext';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from 'expo-router';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const route = useRoute();
  const { productId } = route.params; 
  const { addToCart } = useCart();
  const navigation=useNavigation();

  useEffect(() => {
    fetchProductDetails(setProduct,productId);
  }, []);

  const handleAddToCart = () => {
    addToCart(product); 
    
    showMessage({
      message: "Added to Cart",
      description: "The product has been successfully added.",
      type: "success",
    });

    navigation.navigate('CartPage')
  };

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.productImage} />

      <Text style={styles.productName}>{product.productName}</Text>

      <View style={styles.row}>
        <Text style={styles.rating}>Rating : {product.rating} </Text>
        {getRating(product.rating)} 
        <Text style={styles.ratingCount}>({product.ratingCount} reviews)</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.productPrice}>₹ {product.price}</Text>
        <Text style={styles.mrp}>M.R.P.</Text>
        <Text style={styles.crossOutText}> ₹ {product.crossOutText}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.rating}>Category : {product.category} </Text>
      </View>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      <Button title="Add to Cart" onPress={handleAddToCart} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: '#017185',
    marginRight: 5,
  },
  ratingCount: {
    fontSize: 16,
    color: '#555',
    marginLeft: 5
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#017185',
    marginRight: 10,
  },
  mrp: {
    fontSize: 16,
    color: 'grey',
  },
  crossOutText: {
    fontSize: 16,
    color: 'grey',
    textDecorationLine: 'line-through',
  },
  deliveryDate: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
    marginBottom:10
  },
});

export default ProductPage;
