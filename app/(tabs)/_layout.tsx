import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

const TabRoot = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false ,
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerShown: false ,
          title: 'Cart',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="shopping-cart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          headerShown: false ,
          title: 'My Order',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="shopping-bag" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false ,
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-circle-o" color={color} />,
        }}
      />
    </Tabs>
  );
}

export default TabRoot;