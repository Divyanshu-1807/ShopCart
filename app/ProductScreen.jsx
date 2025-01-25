import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getProductFromApi, getRating} from './utils/helper';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from 'expo-router';
import Header from './components/Header'; 

const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const route = useRoute();
  const {category} = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    getProductFromApi(setProducts, category);
  }, [category]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (text) => {
    const filtered = products.filter((item) =>
      item.fields.productName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <View style={styles.container}>
      <Header onSearch={handleSearch} />
      <ScrollView>
        <Text style={styles.title}>Results</Text>
        {filteredProducts.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate('ProductPage', {productId: item.sys.id})
            }
            style={styles.productSection}>
            <View style={styles.productImgSection}>
              <Image
                style={styles.productImg}
                source={{uri: item.fields.imageUrl}}
              />
            </View>
            <View style={styles.productDetailSection}>
              <Text style={styles.productName}>{item.fields.productName}</Text>
              <View style={styles.rows}>
                <Text style={styles.rating}>{item.fields.rating}</Text>
                {getRating(item.fields.rating)}
                <Text style={styles.ratingCount}> {item.fields.ratingCount}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.price}>₹ {item.fields.price}</Text>
                <Text style={styles.mrp}>M.R.P.</Text>
                <Text style={styles.crossout}>₹ {item.fields.crossOutText}</Text>
              </View>
              <Text style={styles.cashback}>
                FREE Delivery by {item.fields.deliveryBy}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    margin: 10,
  },
  productSection: {
    borderWidth: 1,
    borderColor: '#dddddd',
    flexDirection: 'row',
    marginVertical: 15,
  },
  productImgSection: {
    width: '40%',
    backgroundColor: '#dddddd',
    justifyContent: 'center',
  },
  productDetailSection: {
    width: '60%',
    padding: 10,
  },
  productImg: {
    height: 150,
    width: '100%',
    resizeMode: 'contain',
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  row: {
    flexDirection: 'column',
    marginTop: 2,
  },
  rating: {
    fontSize: 12,
    color: '#017185',
    marginRight: 5,
  },
  ratingCount: {
    fontSize: 12,
    color: '#017185',
    marginLeft: 5,
  },
  price: {
    fontSize: 16,
    color: '#000000',
  },
  mrp: {
    fontSize: 10,
    color: 'grey',
  },
  crossout: {
    fontSize: 10,
    color: 'grey',
    textDecorationLine: 'line-through',
  },
  cashback: {
    fontSize: 9,
    marginVertical: 2,
  },
});

export default ProductScreen;
