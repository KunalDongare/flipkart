import React from 'react';
import {
  FlatList,
  Button,
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import {useCart} from '../contexts/CartContext';
import {useTheme} from '../contexts/ThemeProvider';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Ionicons';
import ItemCard from '../components/ItemCard';

export default function CartScreen() {
  const {cart, dispatch} = useCart();
  const {theme} = useTheme();
  const navigation = useNavigation();

  const removeFromCartHandler = item => {
    dispatch({type: 'REMOVE_FROM_CART', payload: item});
  };

  const incrementQuantityHandler = item => {
    dispatch({type: 'INCREMENT_QUANTITY', payload: item});
  };

  const decrementQuantityHandler = item => {
    dispatch({type: 'DECREMENT_QUANTITY', payload: item});
  };

  function placeOrder() {
    dispatch({type: 'REMOVE_ALL_FROM_CART'});
    navigation.navigate('BuyNow');
  }

  const renderItem = ({item}) => {
    return (
      <View style={{padding: 3}}>
        <ItemCard {...item} />
        <View style={styles.quantityButtonsContainer}>
          <Icons
            style={styles.quantityButtons}
            color={theme.textStyle.color}
            name="add"
            onPress={() => incrementQuantityHandler(item)}
          />
          <Text
            style={[styles.quantityButtons, {color: theme.textStyle.color}]}>
            {item.quantity}
          </Text>
          <Icons
            style={styles.quantityButtons}
            color={theme.textStyle.color}
            name="remove"
            onPress={() => decrementQuantityHandler(item)}
          />
        </View>
        <Button title="Remove" onPress={() => removeFromCartHandler(item)} />
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.backgroundStyle.backgroundColor},
      ]}>
      {cart.length === 0 ? (
        <>
          <Icons
            name="cart"
            size={30}
            color={theme.textStyle.color}
            onPress={() => navigation.navigate('Cart')}
          />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        </>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
        />
      )}

      <View style={styles.bottomBar}>
        <Pressable
          style={styles.buttomBarButtons}
          onPress={() => navigation.navigate('AllProducts')}>
          <Text style={[styles.buttonText, {color: theme.textStyle.color}]}>
            Back to Home
          </Text>
        </Pressable>

        {cart.length !== 0 && (
          <Pressable style={styles.buttomBarButtons} onPress={placeOrder}>
            <Text style={[styles.buttonText, {color: theme.textStyle.color}]}>
              Place Order
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  buttomBarButtons: {
    width: '50%',
    margin: 5,
    padding: 10,
    backgroundColor: 'rgb(248 228 44)',
  },
  buttonText: {
    textAlign: 'center',
  },
  quantityButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 4,
  },
  quantityButtons: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
