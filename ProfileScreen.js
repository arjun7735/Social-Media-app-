import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Alert, Animated } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const [magnify, setMagnify] = useState(false);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      setGreeting('Good morning');
    } else if (currentTime < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  const handleLongPress = () => {
    setMagnify(true);
  };

  const handleRelease = () => {
    setMagnify(false);
  };

  return (
    <View style={styles.container}>
      {/* Greeting */}
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>{greeting}, Eliza</Text>
      </View>
      {/* Profile Photo */}
      <TouchableWithoutFeedback
        onPressIn={handleLongPress}
        onPressOut={handleRelease}
      >
        <View style={styles.profileContainer}>
          <Animated.Image
            source={require('./Profile/Profilepic.jpeg')} // Assuming the image is in a folder named 'assets'
            style={[
              styles.profileImage,
              magnify && { transform: [{ scale: 1.5 }] }, // Magnify the image when state is true
              { width: 230, height: 230, borderRadius: 150, marginTop: 55 }
            ]}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.logoutButton}>
        <Button
          title="Logout"
          color="red"
          onPress={() => Alert.alert('Logout Confirmation', 'Are you sure you want to logout?', [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => navigation.navigate('Login'),
            },
          ], { cancelable: false })}
        />
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        {/* Home button */}
        <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
          <Image source={require('./Buttons/home (1).png')} style={styles.actionIcon} />
        </TouchableOpacity>
        {/* Search button */}
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Image source={require('./Buttons/search.png')} style={styles.actionIcon} />
        </TouchableOpacity>
        {/* New post button */}
        <TouchableOpacity onPress={() => navigation.navigate('NewPost')}>
          <Image source={require('./Buttons/picture.png')} style={styles.actionIcon} />
        </TouchableOpacity>
        {/* Notifications button */}
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Image source={require('./Buttons/bell.png')} style={styles.actionIcon} />
        </TouchableOpacity>
        {/* Profile button */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('./Buttons/account.png')} style={styles.actionIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white', // Set background color to white initially
  },
  greetingContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileContainer: {
    marginVertical: 50,
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  logoutButton: {
    marginBottom: 60,
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

export default ProfileScreen;
