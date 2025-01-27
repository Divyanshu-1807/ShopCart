import {Text, StyleSheet} from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from '@expo/vector-icons/Feather';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const Delivery = () => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}>
      <Feather name="map-pin" size={16} color='#ffffff' />
      <Text style={styles.deliver}>Deliver to Sarthak - Jaipur 302016</Text>
      <SimpleLineIcons name="arrow-down" size={10} color='#ffffff'/>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliver: {
    fontSize: 13,
    color:'#ffffff',
    paddingHorizontal: 6,
  },
});

export default Delivery;