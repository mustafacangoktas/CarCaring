import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';

export default function Search() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Araç Sorgu!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
