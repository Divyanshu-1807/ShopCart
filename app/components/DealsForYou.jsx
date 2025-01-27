import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,Dimensions } from 'react-native';
import { useNavigation } from 'expo-router';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { getRating } from '../utils/helper';

const parsePrice = (price) => parseFloat(price.replace(/,/g, ''));

const DealsForYou = ({ products }) => {
  const navigation = useNavigation();
  
  const dealsProducts = products.filter(product => 
    product.fields.crossOutText && product.fields.crossOutText > product.fields.price
  );

  const calculateDiscount = (crossOutText, Price) => {
    return Math.round(((crossOutText - Price) / crossOutText) * 100);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>Deals For You</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {dealsProducts.map((product) => (
          <TouchableOpacity
            key={product.sys.id}
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductPage', { productId: product.sys.id })}
          >

            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {calculateDiscount(parsePrice(product.fields.crossOutText), parsePrice(product.fields.price))}% OFF
              </Text>
            </View>

            <Image
              source={{ uri: product.fields.imageUrl }}
              style={styles.productImage}
              resizeMode="cover"
            />

            <View style={styles.productInfo}>
              <Text numberOfLines={2} style={styles.productName}>
                {product.fields.productName}
              </Text>
              
              <View style={styles.ratingContainer}>
                {getRating(product.fields.rating)}
              </View>

              <View style={styles.priceContainer}>
                <Text style={styles.price}>
                ₹{product.fields.price}
                </Text>
                <Text style={styles.oldPrice}>
                ₹{product.fields.crossOutText}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  seeAll: {
    fontSize: 14,
    color: '#5B86E5',
    fontWeight: '600',
  },
  scrollContainer: {
    paddingHorizontal: 12,
  },
  productCard: {
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    overflow: 'hidden',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF4B4B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  productImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5B86E5',
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'line-through',
  },
});

export default DealsForYou;