import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const categories = [
  { 
    id: 1, 
    name: 'Electronics',
    icon: 'television',
    gradient: ['#FF6B6B', '#FF8E8E'],
    items: '2.5k items'
  },
  { 
    id: 2, 
    name: 'Clothing',
    icon: 'tshirt-crew',
    gradient: ['#4ECDC4', '#45B7AF'],
    items: '3.8k items'
  },
  { 
    id: 3, 
    name: 'Home Appliances',
    icon: 'washing-machine',
    gradient: ['#96E6A1', '#78D189'],
    items: '1.2k items'
  },
  { 
    id: 4, 
    name: 'Cosmetics',
    icon: 'lipstick',
    gradient: ['#FFD93D', '#FFD023'],
    items: '2.1k items'
  },
];

const windowWidth = Dimensions.get('window').width;

const Categories = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.container}>
        {categories.map((category, index) => (
          <TouchableOpacity 
            key={category.id}
            style={[
              styles.categoryBox,
              index % 2 === 0 ? styles.marginRight : null,
            ]}
            onPress={() => navigation.navigate('ProductScreen', { category: category.name })}
          >
            <View style={[
              styles.iconContainer,
              { backgroundColor: category.gradient[0] }
            ]}>
              <MaterialCommunityIcons 
                name={category.icon} 
                size={24} 
                color="#FFF"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.categoryText}>{category.name}</Text>
              <Text style={styles.itemCount}>{category.items}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryBox: {
    width: (windowWidth - 48) / 2,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
});

export default Categories;