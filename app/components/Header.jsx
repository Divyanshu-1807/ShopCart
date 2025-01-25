import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

const Header = ({onSearch}) => {
  return (
    <View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.container}>
        <View style={styles.inputBox}>
          <View style={styles.row}>
            <Ionicons name="search" size={22} color="#1f1f1f" />
            <TextInput
              placeholder="Search Product"
              placeholderTextColor="#848484"
              style={styles.textInput}
              onChangeText={onSearch}
            />
          </View>
          <AntDesign name="scan1" size={22} color="#909594" />
        </View>
        <Feather name="mic" size={20} color="#ffffff" />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a1bcc0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    width: '90%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    padding: 8,
  },
});

export default Header;
