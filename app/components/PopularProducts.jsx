import React, {useMemo} from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image
} from 'react-native';
import { useNavigation } from 'expo-router';
import { getRating } from '../utils/helper';

const PopularProducts = ({ products }) => {
  const navigation = useNavigation();
  const randomProducts = useMemo(() => {
    // Create a copy of the products array to avoid mutating the original
    const shuffled = [...products]
      .sort(() => Math.random() - 0.5) // Shuffle the array
      .slice(0, 7); // Take first 7 items
    return shuffled;
  }, [products]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Products</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {randomProducts.map((product) => (
          <TouchableOpacity
            key={product.sys.id}
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductPage', { productId: product.sys.id })}
          >
            {/* Product Image */}
            <Image
              source={{ uri: product.fields.imageUrl }}
              style={styles.productImage}
              resizeMode="cover"
            />

            {/* Product Details */}
            <View style={styles.productInfo}>
              <Text 
                numberOfLines={2} 
                ellipsizeMode="tail"
                style={styles.productName}
              >
                {product.fields.productName}
              </Text>
              
              {/* Category */}
              <Text style={styles.category}>
                {product.fields.category}
              </Text>

              {/* Rating */}
              <View style={styles.ratingContainer}>
                {getRating(product.fields.rating)}
                <Text style={styles.ratingText}>
                  {product.fields.rating || 0}
                </Text>
              </View>

              {/* Price */}
              <View style={styles.priceContainer}>
              <Text 
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.price}
              >
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
    width: 200,
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
  productImage: {
    width: '100%',
    height: 200,
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
    height: 40,
    lineHeight: 20,
  },
  category: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
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

export default PopularProducts;