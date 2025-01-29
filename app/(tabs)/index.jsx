import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import DealsForYou from '../components/DealsForYou';
import PopularProducts from '../components/PopularProducts';
import Delivery from '../components/Delivery'
import { getAllProductsFromApi } from '../utils/helper';
import { useNavigation } from 'expo-router';
import { useUser } from '../utils/UserContext';

const Index = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const { userData } = useUser();

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

  const renderSearchOverlay = () => {
    if (searchQuery.length > 0) {
      return (
        <View style={styles.searchOverlay}>
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.sys.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.productContainer}
                onPress={() => {
                  navigation.navigate('ProductPage', { productId: item.sys.id });
                  setSearchQuery(''); 
                }}
              >
                <Text style={styles.productName}>{item.fields.productName}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header onSearch={setSearchQuery} />

        {renderSearchOverlay()}
        
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={true}
        >
          <Delivery 
            userName={userData.name}
            userCity={userData.city}
            userPincode={userData.pincode}
          />
          <Banner />
          <Categories />
          <DealsForYou products={products} />
          <PopularProducts products={products} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  searchOverlay: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    maxHeight: 300,
    backgroundColor: '#ffffff',
    zIndex: 999,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  productName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default Index;