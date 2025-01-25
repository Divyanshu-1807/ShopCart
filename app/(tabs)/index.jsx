import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import { getAllProductsFromApi } from '../utils/helper';
import {useNavigation} from 'expo-router';

const Index = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getAllProductsFromApi(setProducts);
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.fields.productName
        .toLowerCase()
        .startsWith(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <View style={styles.container}>
      <Header onSearch={setSearchQuery} />
      {searchQuery.length > 0 && (
        <FlatList
          style={styles.dropdown}
          data={filteredProducts}
          keyExtractor={(item) => item.sys.id}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <TouchableOpacity 
                onPress={() =>navigation.navigate('ProductPage', {productId: item.sys.id})
              }>
                <Text style={styles.productName}>{item.fields.productName}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      <Banner />
      <Categories />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  dropdown: {
    position: 'absolute',
    top: 55, 
    zIndex: 1,
    alignSelf: 'center',
    width: '100%', 
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    maxHeight: 300,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  productContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default Index;
