import React from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import {useTheme} from '../contexts/ThemeProvider';
import useProductsData from '../hooks/useProductsData';
import ItemCard from '../components/ItemCard';
import {FLIPKART_URL} from '../utils/constants';

const AllProductsScreen = () => {
  const {theme} = useTheme();
  const {products, error, isLoading} = useProductsData(FLIPKART_URL);

  const cards = (
    <FlatList
      data={products}
      renderItem={({item}) => <ItemCard {...item} />}
      keyExtractor={item => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flatListContent}
    />
  );

  let screen = <ActivityIndicator size={50} color={'rgb(21 123 212)'} />;

  if (!isLoading) {
    screen = cards;
  }

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.backgroundStyle.backgroundColor},
      ]}>
      {screen}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListContent: {
    flexGrow: 1,
    paddingVertical: 10,
  },
});

export default AllProductsScreen;
