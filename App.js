import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/Home/HomeScreen';
import CartScreen from './screens/Cart/CartScreen';
import LoginScreen from './screens/Login/LoginScreen';
import RegisterScreen from './screens/Register/Registerscreen';
import AddBookScreen from './screens/AddBook/AddBook';
import OrderScreen from './screens/YourOrders/Orderscreen';
import BookInfoScreen from './screens/Book/BookScreen';
import ProfileScreen from './screens/Profile/ProfileScreen';

import { CartProvider } from './utils/cartContext';
import { OrdersProvider } from './utils/ordersContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Cart') {
          iconName = 'cart';
        } else if (route.name === 'AddBook') {
          iconName = 'add';
        } else if (route.name === 'Profile') {
          iconName = 'person';
        } else if (route.name === 'Orders') {
          iconName = 'list';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#007AFF',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Cart" component={CartScreen} />

    <Tab.Screen name="Orders" component={OrderScreen} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <OrdersProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Book" component={BookInfoScreen} />
            <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </OrdersProvider>
  );
};

export default App;
