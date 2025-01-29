import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Platform, Modal } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BackHandler } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../utils/UserContext';

const Profile = () => {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { userData, updateUserProfile } = useUser();
  const [editedData, setEditedData] = useState({ ...userData });
  const [profileImage, setProfileImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    setModalVisible(false); 
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], 
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    setModalVisible(false); 
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access the camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleAvatarPress = () => {
    setModalVisible(true); 
  };

  const handleSave = () => {
    updateUserProfile(editedData);
    setIsEditing(false);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setEditedData({ ...editedData, dob: selectedDate });
    }
  };

  const navigateToWishlist = () => {
    navigation.navigate('WishlistPage');
  };

  const navigateToOrders = () => {
    navigation.navigate('(tabs)', { screen: 'order' });
  };

  const handleLogout = () => {
    BackHandler.exitApp();
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderDetailItem = (icon, label, value, key) => {
    if (key === 'dob') {
      return (
        <View style={styles.detailItem}>
          <Ionicons name={icon} size={20} color="#666" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>{label}</Text>
            {isEditing ? (
              <TouchableOpacity 
                onPress={() => setShowDatePicker(true)}
                style={styles.datePickerButton}
              >
                <Text style={styles.datePickerButtonText}>
                  {formatDate(editedData.dob)}
                </Text>
                <Ionicons name="calendar" size={20} color="#4A90E2" />
              </TouchableOpacity>
            ) : (
              <Text style={styles.detailValue}>{formatDate(value)}</Text>
            )}
          </View>
        </View>
      );
    }

    if (['address', 'city', 'state', 'pincode'].includes(key)) {
      return (
        <View style={styles.detailItem}>
          <Ionicons name={icon} size={20} color="#666" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>{label}</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editedData[key]}
                onChangeText={(text) => setEditedData({ ...editedData, [key]: text })}
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            ) : (
              <Text style={styles.detailValue}>{value}</Text>
            )}
          </View>
        </View>
      );
    }

    return (
      <View style={styles.detailItem}>
        <Ionicons name={icon} size={20} color="#666" />
        <View style={styles.detailTextContainer}>
          <Text style={styles.detailLabel}>{label}</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={editedData[key]}
              onChangeText={(text) => setEditedData({ ...editedData, [key]: text })}
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          ) : (
            <Text style={styles.detailValue}>{value}</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={profileImage ? { uri: profileImage } : require('../assetss/default-avatar.png')}
              defaultSource={require('../assetss/default-avatar.png')}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarButton}  onPress={handleAvatarPress}>
              <Ionicons name="camera-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.email}>{userData.email}</Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={navigateToWishlist}
          >
            <Ionicons name="heart-outline" size={24} color="#FF4785" />
            <Text style={styles.actionText}>Wishlist</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={navigateToOrders}
          >
            <Ionicons name="cart-outline" size={24} color="#4A90E2" />
            <Text style={styles.actionText}>Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Ionicons name={isEditing ? "close-outline" : "create-outline"} size={24} color="#2ECC71" />
            <Text style={styles.actionText}>{isEditing ? 'Cancel' : 'Edit'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings-outline" size={24} color="#2ECC71" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          {renderDetailItem('person-outline', 'Name', userData.name, 'name')}
          {renderDetailItem('mail-outline', 'Email', userData.email, 'email')}
          {renderDetailItem('call-outline', 'Phone', userData.phone, 'phone')}
          {renderDetailItem('calendar-outline', 'Date of Birth', userData.dob, 'dob')}
      
          <View style={styles.addressSection}>
            <Text style={styles.sectionTitle}>Address Details</Text>
            {renderDetailItem('home-outline', 'Street Address', userData.address, 'address')}
            {renderDetailItem('business-outline', 'City', userData.city, 'city')}
            {renderDetailItem('map-outline', 'State', userData.state, 'state')}
            {renderDetailItem('location-outline', 'Pincode', userData.pincode, 'pincode')}
          </View>
          
        </View>

        {isEditing && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Ionicons name="save-outline" size={20} color="white" />
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={editedData.dob || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()} 
          />
        )}

        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Choose an option</Text>
              <TouchableOpacity 
                style={styles.modalOption} 
                onPress={pickImage}
              >
                <Text style={styles.modalOptionText}>Pick from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalOption} 
                onPress={openCamera}
              >
                <Text style={styles.modalOptionText}>Take a Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalCancel} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </ScrollView>
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
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0', 
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4A90E2',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#4A90E2',
  },
  datePickerButtonText: {
    fontSize: 16,
    color: '#333',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: -25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButton: {
    alignItems: 'center',
    padding: 10,
  },
  actionText: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
  detailsContainer: {
    padding: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    marginTop: 2,
  },
  input: {
    fontSize: 16,
    color: '#333',
    marginTop: 2,
    padding: Platform.OS === 'ios' ? 4 : 0,
    borderBottomWidth: 1,
    borderBottomColor: '#4A90E2',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2ECC71',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 15,
    borderRadius: 10,
  },
  saveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4785',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 15,
    borderRadius: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  addressSection: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    paddingLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalOption: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#4A90E2',
  },
  modalCancel: {
    marginTop: 15,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#FF4785',
  },
});

export default Profile;