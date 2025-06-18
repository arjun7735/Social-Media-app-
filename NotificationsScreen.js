import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const NotificationsScreen = ({ navigation }) => {
  const navigateToSearch = () => {
    navigation.navigate('Search');
  };

  const handleNewPost = () => {
    navigation.navigate('NewPost');
  };

  const navigateToNotifications = () => {
    navigation.navigate('Notifications');
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const navigateToHomeScreen = () => {
    navigation.navigate('Feed');
  };

  return (
    
    <View style={styles.container}>
      {/* Footer */}
      <View style={styles.footer}>
        
        {/* Home button */}
        <TouchableOpacity onPress={navigateToHomeScreen}>
          <Image source={require('./Buttons/home (1).png')} style={styles.actionIcon} />
        </TouchableOpacity>
        {/* Search button */}
        <TouchableOpacity onPress={navigateToSearch}>
          <Image source={require('./Buttons/search.png')} style={styles.actionIcon} />
        </TouchableOpacity>
        {/* New post button */}
        <TouchableOpacity onPress={handleNewPost}>
          <Image source={require('./Buttons/picture.png')} style={styles.actionIcon} />
        </TouchableOpacity>
        {/* Notifications button */}
        <TouchableOpacity onPress={navigateToNotifications}>
          <Image source={require('./Buttons/bell.png')} style={styles.actionIcon} />
        </TouchableOpacity>
        {/* Profile button */}
        <TouchableOpacity onPress={handleProfile}>
          <Image source={require('./Buttons/account.png')} style={styles.actionIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'lightgray',
    paddingVertical: 10,
  },
  actionIcon: {
    width: 30,
    height: 30,
  },
});

export default NotificationsScreen;
