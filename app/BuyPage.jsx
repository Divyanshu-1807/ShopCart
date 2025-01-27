import React, { useState } from 'react';
import {View,Text,StyleSheet,FlatList,Image,TouchableOpacity,Animated,Easing,Alert,Modal} from 'react-native';
import { useCart } from './utils/CartContext';
import { useNavigation } from 'expo-router';
import LottieView from 'lottie-react-native';

const BuyPage = () => {
  const { cartItems, proceedToPay, clearCart, addOrder } = useCart();
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showWheel, setShowWheel] = useState(false);
  const [spinValue] = useState(new Animated.Value(0)); 
  const [spinning, setSpinning] = useState(false);
  const [showProceedButton, setShowProceedButton] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const navigation = useNavigation();

  const parsePrice = (price) => parseFloat(price.replace(/,/g, ''));

  const calculateTotalPrice = () => {
    const total = cartItems.reduce(
      (total, item) =>
        total + parsePrice(item.price) * parseInt(item.quantity, 10),
      0
    );
    const discountAmount = (total * discountPercentage) / 100;
    return total - discountAmount; 
  };

  const wheelItems = [
    { color: 'red', text: '5% Off' },
    { color: 'blue', text: '10% Off' },
    { color: 'green', text: '15% Off' },
    { color: 'yellow', text: '20% Off' },
    { color: 'purple', text: '25% Off' },
  ];

  const handleSpinWheel = () => {
    if (spinning) return; 
    setSpinning(true);

    const numSegments = wheelItems.length;
    const segmentAngle = 360 / numSegments;

    const randomIndex = Math.floor(Math.random() * numSegments);
    const endRotation = randomIndex * segmentAngle + 360 * 5; 

    Animated.timing(spinValue, {
      toValue: endRotation,
      duration: 3000,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      const finalIndex = randomIndex % numSegments;
      setDiscountPercentage(getDiscount(finalIndex));
      setSpinning(false);
      setShowWheel(false); 
      setShowProceedButton(true); 
    });
  };

  const getDiscount = (index) => {
    const discounts = [5, 10, 15, 20, 25]; 
    return discounts[index];
  };

  const spinInterpolate = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const handleProceedToPay = () => {
    // proceedToPay();
    const newOrder = {
      id: Date.now().toString(), 
      items: cartItems,
      totalAmount: calculateTotalPrice().toFixed(2),
    };
    addOrder(newOrder); 
    clearCart(); 
    setOrderPlaced(true);
    // navigation.navigate('(tabs)', { screen: 'index' });
    setShowAnimation(true); 
    setTimeout(() => {
      setShowAnimation(false); 
      navigation.navigate('(tabs)', { screen: 'index' });
    }, 1000); 
  };

  return (
    <View style={styles.container}>

      {!showWheel && !showAnimation &&(
        <>
          <Text style={styles.title}>Order Summary</Text>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.productItem}>
                <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{item.productName}</Text>
                  <Text style={styles.productInfo}>
                    Price: ₹{item.price} | Quantity: {item.quantity} | Total: ₹
                    {parsePrice(item.price) * parseInt(item.quantity, 10)}
                  </Text>
                </View>
              </View>
            )}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
              Total to Pay: ₹{calculateTotalPrice().toFixed(2)}
            </Text>
            {discountPercentage > 0 && (
              <Text style={styles.discountText}>
                You got a {discountPercentage}% discount!
              </Text>
            )}
          </View>
        </>
      )}

      {!showProceedButton && !showWheel && !showAnimation &&(
        <TouchableOpacity
          style={styles.discountButton}
          onPress={() => setShowWheel(true)} 
        >
          <Text style={styles.discountButtonText}>
            {spinning ? 'Spinning...' : 'Spin the Wheel for Discount'}
          </Text>
        </TouchableOpacity>
      )}

      {showWheel && (
        <View style={styles.wheelContainer}>
          <Animated.View
            style={[styles.wheel, { transform: [{ rotate: spinInterpolate }] }]}
          >
            {wheelItems.map((item, index) => {
              const angle = (360 / wheelItems.length) * index; 
              return (
                <View
                  key={index}
                  style={[
                    styles.wheelSegment,
                    {
                      backgroundColor: item.color,
                      transform: [
                        { rotate: `${angle}deg` },
                        { translateY: -125 },
                      ],
                    },
                  ]}
                >
                  <Text style={styles.wheelText}>{item.text}</Text>
                </View>
              );
            })}
          </Animated.View>

          <TouchableOpacity
            style={styles.spinButton}
            onPress={handleSpinWheel}
            disabled={spinning}
          >
            <Text style={styles.spinButtonText}>Spin</Text>
          </TouchableOpacity>
        </View>
      )}

      {showProceedButton && !showWheel && !showAnimation && (
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={handleProceedToPay} 
          disabled={orderPlaced}
        >
          <Text style={styles.proceedButtonText}>
            {orderPlaced ? 'Order Placed' : 'Proceed to Pay'}
          </Text>
        </TouchableOpacity>
        
      )}

      <Modal visible={showAnimation} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <LottieView
            source={require('./assetss/success-animation.json')} 
            autoPlay
            loop={false}
            style={styles.animation}
          />
          <Text style={styles.successText}>Order Placed Successfully!</Text>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  productItem: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  productImage: { width: 80, height: 80, marginRight: 10, borderRadius: 10 },
  productDetails: { flex: 1, justifyContent: 'center' },
  productName: { fontSize: 18, fontWeight: 'bold' },
  productInfo: { fontSize: 16, color: '#555' },
  totalContainer: {
    marginTop: 20,
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalText: { fontSize: 20, fontWeight: 'bold', color: '#017185' },
  discountText: { fontSize: 18, fontWeight: 'bold', color: 'green', marginTop: 10 },
  discountButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 10,
  },
  discountButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
  wheelContainer: {
    top: '40%',
    left: '14%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    // marginTop: 40,
    alignItems: 'center'
  },
  wheel: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 5,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  wheelSegment: {
    position: 'absolute',
    width: '55%',
    height: '55%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: "100%"
  },
  wheelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    transform: [{ rotate: '-45deg' }],
  },
  spinButton: {
    position: 'absolute', 
    top: '50%',
    left: '50%',
    width: '29%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -50 }, { translateY: -50 }], 
    padding: 15,
    backgroundColor: '#f39c12',
    borderRadius: 100,
    zIndex: 1,
  },
  spinButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  proceedButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#3498db',
    borderRadius: 10,
  },
  proceedButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  animation: { width: 150, height: 150 },
  successText: { marginTop: 20, fontSize: 18, fontWeight: 'bold', color: 'white' },
});

export default BuyPage;

