import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {useTheme} from '../contexts/ThemeProvider';
import {useNavigation} from '@react-navigation/native';

export default function ItemCard({title, price, image, rating, id}) {
  const {theme} = useTheme();
  const navigation = useNavigation();

  function productPressHandler() {
    navigation.navigate('ProductDetails', {
      selectedId: id,
    });
  }

  return (
    <View style={{borderRadius: 10, overflow: 'hidden'}}>
      <Pressable android_ripple={{color: 'grey'}} onPress={productPressHandler}>
        <View style={styles.container}>
          <Image
            source={{uri: image}}
            style={styles.image}
            resizeMode="center"
          />
          <View style={[styles.ratingContainer]}>
            <Text style={[styles.ratingText]}>{`Ratings: ${rating.rate}`}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={[styles.title, {color: theme.textStyle.color}]}>
              {title}
            </Text>
            <Text
              style={[
                styles.price,
                {color: theme.textStyle.color},
              ]}>{`Price: $${price}`}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    margin: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgb(193 190 190)',
    width: 210,
    height: 283,
    flex: 1,
  },
  image: {
    width: '100%',
    height: 190,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 3,
  },
  ratingContainer: {
    position: 'absolute',
    top: 145,
    right: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgb(0 147 3)',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  detailsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    marginBottom: 5,
  },
});
