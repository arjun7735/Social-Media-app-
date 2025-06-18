// MiniFilmsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MiniFilmsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Mini Films Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MiniFilmsScreen;
