import React from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useTheme} from '../contexts/ThemeProvider';
import useProductDetails from '../hooks/useProductDetails';
import {FLIPKART_URL} from '../utils/constants';
import FloatingText from '../components/FloatingText';
import {useNavigation} from '@react-navigation/native';
import {useCart} from '../contexts/CartContext';
import Carousel from 'react-native-reanimated-carousel';

export default function ProductDetailsScreen({route}) {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const selectedId = route.params?.selectedId;
  const {productDetails, error, isLoading} = useProductDetails(
    FLIPKART_URL + `/${selectedId}`,
  );

  const {dispatch} = useCart();
  const selectedProduct = productDetails;

  const addToCartHandler = () => {
    dispatch({type: 'ADD_TO_CART', payload: selectedProduct});
    navigation.navigate('Cart');
  };

  function buyNowHandler() {
    navigation.navigate('BuyNow');
  }

  const width = Dimensions.get('window').width;

  const product = (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        {productDetails && (
          <View style={styles.container}>
            <View style={{flex: 1}}>
              <Carousel
                loop
                width={width}
                height={width}
                autoPlay={true}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={1000}
                renderItem={({index}) => (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={{uri: productDetails?.image}}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </View>
                )}
              />
            </View>

            {/* <Image
              source={{uri: productDetails?.image}}
              style={styles.image}
              resizeMode="contain"
            /> */}

            <FloatingText
              backgroundColor="rgb(21 123 212)"
              position={{top: 25, right: 25}}
              text={`Ratings: ${productDetails?.rating?.rate}`}
            />
            <FloatingText
              backgroundColor="rgb(248 228 44)"
              position={{top: 423, left: 9}}
              text={`${productDetails?.category}`}
            />

            <View
              style={[
                styles.detailsContainer,
                {borderTopColor: theme.textStyle.color},
              ]}>
              <Text style={[styles.title, {color: theme.textStyle.color}]}>
                {productDetails?.title}
              </Text>

              <View style={styles.priceAndReviewsContainer}>
                <Text
                  style={
                    styles.price
                  }>{`Price: $${productDetails?.price}`}</Text>

                <Text style={[styles.review]}>
                  Reviews({productDetails?.rating?.count})
                </Text>
              </View>

              <View
                style={[
                  styles.descriptionContainer,
                  {
                    borderTopColor: theme.textStyle.color,
                    borderBottomColor: theme.textStyle.color,
                  },
                ]}>
                <Text style={[styles.description]}>Description</Text>
                <Text
                  style={[
                    styles.descriptionText,
                    {color: theme.textStyle.color},
                  ]}>
                  {productDetails?.description}
                </Text>
                <Text
                  style={[
                    styles.descriptionText,
                    {color: theme.textStyle.color},
                  ]}>
                  {productDetails?.description}
                </Text>
                <Text
                  style={[
                    styles.descriptionText,
                    {color: theme.textStyle.color},
                  ]}>
                  {productDetails?.description}
                </Text>
                <Text
                  style={[
                    styles.descriptionText,
                    {color: theme.textStyle.color},
                  ]}>
                  {productDetails?.description}
                </Text>
                <Text
                  style={[
                    styles.descriptionText,
                    {color: theme.textStyle.color},
                  ]}>
                  {productDetails?.description}
                </Text>
                <Text
                  style={[
                    styles.descriptionText,
                    {color: theme.textStyle.color},
                  ]}>
                  {productDetails?.description}
                </Text>
                <Text
                  style={[
                    styles.descriptionText,
                    {color: theme.textStyle.color},
                  ]}>
                  {productDetails?.description}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button onPress={addToCartHandler} title="Add to cart" />
        </View>
        <View style={styles.button}>
          <Button
            color="rgb(248 228 44)"
            title="Buy now"
            onPress={buyNowHandler}
          />
        </View>
      </View>
    </>
  );

  let screen = <ActivityIndicator size={50} color={'rgb(21 123 212)'} />;

  if (!isLoading) {
    screen = product;
  }

  return (
    <>
      <View
        style={{
          backgroundColor: theme.backgroundStyle.backgroundColor,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {screen}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  scrollViewContent: {
    paddingVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 4,
    borderTopWidth: 0.2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  priceAndReviewsContainer: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTopWidth: 0.2,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'rgb(0 147 3)',
  },
  review: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'red',
  },
  descriptionContainer: {
    marginTop: 4,
    padding: 3,
    alignItems: 'center',
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'rgb(21 123 212)',
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    margin: 5,
  },
});
