import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/Home/HomeScreen'; // Ensure you have this screen defined
import CartScreen from './screens/Cart/CartScreen'; // Add your CartScreen here
import LoginScreen from './screens/Login/LoginScreen'; // Login screen
import RegisterScreen from './screens/Register/Registerscreen';
import AddBookScreen from './screens/AddBook/AddBook';
import OrderScreen from './screens/YourOrders/Orderscreen';
import BookInfoScreen from './screens/Book/BookScreen'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './screens/Profile/ProfileScreen'; // Import the ProfileScreen
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

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
    <Tab.Screen name="AddBook" component={AddBookScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Orders" component={OrderScreen} />
  </Tab.Navigator>
);
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Book" component={BookInfoScreen} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
