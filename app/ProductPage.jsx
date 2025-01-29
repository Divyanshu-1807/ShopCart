import { View, Text, Image, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { fetchProductDetails, getRating } from './utils/helper';
import { useCart } from './utils/CartContext';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'; 
import { useWishlist } from './utils/WishlistContext';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const params = useLocalSearchParams(); 
  const productId = params.productId; 
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist(); 
  const navigation = useNavigation();

  useEffect(() => {
    console.log('Fetching product for ID:', productId);
    if (productId) {
      fetchProductDetails(setProduct, productId);
    }
  }, [productId]);

  const isProductInWishlist = wishlist.some((item) => item.id === product?.id);

  const handleWishlistToggle = () => {
    if (isProductInWishlist) {
      removeFromWishlist(product.id); 
      showMessage({ message: 'Removed from Wishlist', type: 'info' });
    } else {
      addToWishlist(product); 
      showMessage({ message: 'Added to Wishlist', type: 'success' });
    }
  };

  const handleAddToCart = () => {
    addToCart(product);

    showMessage({
      message: 'Added to Cart',
      description: 'The product has been successfully added.',
      type: 'success',
    });
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

      <View style={styles.header}>
        <Text style={styles.productName}>{product.productName}</Text>
        <TouchableOpacity onPress={handleWishlistToggle}>
          <FontAwesome
            name={isProductInWishlist ? 'heart' : 'heart-o'}
            size={23}
            color={isProductInWishlist ? 'red' : 'grey'}
          />
        </TouchableOpacity>
      </View>

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
  container: { padding: 10, backgroundColor: '#ffffff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  productImage: { width: '100%', height: 300, resizeMode: 'contain', marginBottom: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  productName: { fontSize: 22, fontWeight: 'bold', color: '#333', flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  rating: { fontSize: 16, color: '#017185', marginRight: 5 },
  ratingCount: { fontSize: 16, color: '#555', marginLeft: 5 },
  productPrice: { fontSize: 20, fontWeight: '600', color: '#017185', marginRight: 10 },
  mrp: { fontSize: 16, color: 'grey' },
  crossOutText: { fontSize: 16, color: 'grey', textDecorationLine: 'line-through' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  productDescription: { fontSize: 14, lineHeight: 22, color: '#555', marginBottom: 10 },
});

export default ProductPage;
