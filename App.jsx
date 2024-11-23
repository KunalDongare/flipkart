import React from 'react';
import {StatusBar, Image, View, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AllProductsScreen from './screens/AllProductsScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CartScreen from './screens/CartScreen';
import BuyNowScreen from './screens/BuyNowScreen';
import {ThemeProvider, useTheme} from './contexts/ThemeProvider';
import {CartProvider} from './contexts/CartContext';
import Icons from 'react-native-vector-icons/Ionicons';
import {useCart} from './contexts/CartContext';
import CameraScreen from './screens/CameraScreen';

const Stack = createStackNavigator();

const NavigationStack = () => {
  const {theme} = useTheme();
  const {cart, dispatch} = useCart();
  const totalItems = new Set(cart.map(item => item.id)).size; // Calculate total number of items

  return (
    <>
      <StatusBar
        barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AllProducts"
          screenOptions={({navigation, route}) => ({
            headerStyle: {
              backgroundColor: theme.backgroundStyle.backgroundColor,
            },
            headerTintColor: theme.textStyle.textColor,
            headerTitle: () => (
              <Image
                source={require('./assets/flipkart.png')}
                style={{width: 100, height: 40}}
                resizeMode="contain"
              />
            ),
            headerTitleAlign: 'center',
            headerRight: () =>
              route.name !== 'Cart' && (
                <>
                  <Icons
                    name="cart-outline"
                    size={30}
                    color={theme.textStyle.color}
                    onPress={() => {
                      navigation.navigate('Cart');
                    }}
                    style={{marginRight: 15}}
                  />
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{totalItems}</Text>
                  </View>
                </>
              ),
            headerBackImage: () => (
              <Icons
                name="arrow-back"
                size={25}
                color={theme.textStyle.color}
              />
            ),
          })}>
          <Stack.Screen
            name="AllProducts"
            component={AllProductsScreen}
            options={({navigation, route}) => ({
              headerLeft: () =>
                route.name !== 'Camera' && (
                  <Icons
                    name="camera-outline"
                    size={30}
                    color={theme.textStyle.color}
                    onPress={() => {
                      navigation.navigate('Camera');
                    }}
                    style={{marginLeft: 15}}
                  />
                ),
            })}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{
              title: 'Cart',
              totalItems: totalItems,
            }}
          />
          <Stack.Screen
            name="BuyNow"
            component={BuyNowScreen}
            options={{
              title: 'OrderPlaced',
            }}
          />
          <Stack.Screen
            name="Camera"
            component={CameraScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <NavigationStack />
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
