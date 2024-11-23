import {Image, StyleSheet, View, Dimensions, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function BUyNowScreen() {
  const width = Dimensions.get('window').width;
  const navigation = useNavigation();

  function continueShoppingHandler() {
    navigation.navigate('AllProducts');
  }

  return (
    <View style={[styles.container]}>
      <View style={{flex: 3}}>
        <Image
          style={{width: width * 2, height: width, flex: 1}}
          source={require('../assets/Order_placed.png')}
          resizeMode="contain"
        />
      </View>
      <View style={{flex: 1}}>
        <Button onPress={continueShoppingHandler} title="Continue Shopping" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(248 228 44)',
  },
});
