import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const FloatingText = ({backgroundColor, position, text}) => {
  return (
    <View style={[styles.container, {backgroundColor, ...position}]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default FloatingText;
