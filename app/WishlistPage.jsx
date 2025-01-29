import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity,}from 'react-native';
import { useWishlist } from './utils/WishlistContext';
import { useCart } from './utils/CartContext';
import { getRating } from './utils/helper';
import { showMessage } from 'react-native-flash-message';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showMessage({
          message: 'Added to Cart',
          description: 'The product has been successfully added.',
          type: 'success',
    });
  };

  if (wishlist.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your wishlist is empty!</Text>
      </View>
    );
  }

  return (
    <>
      <Text style={styles.title}>Your Wishlist</Text>
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => handleProductClick(item.id)}>
              <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
            </TouchableOpacity>
            <View style={styles.detailsContainer}>
              <TouchableOpacity onPress={() => handleProductClick(item.id)}>
                <Text style={styles.productName}>{item.productName}</Text>
              </TouchableOpacity>

              <View style={styles.row}>
                <Text style={styles.ratingText}>Rating: {item.rating}</Text>
                {getRating(item.rating)}
                <Text style={styles.ratingCount}>({item.ratingCount} reviews)</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.price}>₹ {item.price}</Text>
                <Text style={styles.mrp}>M.R.P.</Text>
                <Text style={styles.crossOutPrice}>₹ {item.crossOutText}</Text>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveFromWishlist(item.id)}
                >
                  <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart(item)}
                >
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'grey',
  },
  listContainer: {
    padding: 10,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#017185',
    marginRight: 5,
  },
  ratingCount: {
    fontSize: 12,
    color: '#555',
    marginLeft: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#017185',
    marginRight: 5,
  },
  mrp: {
    fontSize: 12,
    color: 'grey',
    marginRight: 5,
  },
  crossOutPrice: {
    fontSize: 12,
    color: 'grey',
    textDecorationLine: 'line-through',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  addToCartButton: {
    backgroundColor: '#017185',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WishlistPage;
