import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';

const categories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Home Appliances' },
  { id: 4, name: 'Cosmetics' },
];


const Categories = () => {
    const navigation=useNavigation();
    return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <TouchableOpacity 
          onPress={() => navigation.navigate('ProductScreen', { category: category.name })}
          key={category.id}
          style={[
            styles.categoryBox,
            index % 2 === 0 ? styles.marginRight : null,
          ]}
        //   onPress={() => console.log(`Selected: ${category.name}`)}
        >
         <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity> 
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 10, 
  },
  categoryBox: {
    width: '48%', 
    height: 100,
    backgroundColor: '#5B86E5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, 
    elevation: 3,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  marginRight: {
    marginRight: '4%', 
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Categories;
