import React from 'react';
import { View, Text, Button } from 'react-native';

const MessagesScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Messages</Text>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text></Text>
      </View>
    </View>
  );
}

export default MessagesScreen;
