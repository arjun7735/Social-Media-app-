import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text) => {
    setSearchQuery(text);
    // Perform search functionality based on the text entered
    // You can implement your search logic here
  };

  // Dummy photo data
  const photos = [
    require('./Search/photo1.jpeg'),
    require('./Search/photo2.jpeg'),
    require('./Search/photo3.jpeg'),
    require('./Search/photo4.jpeg'),
    require('./Search/photo5.jpeg'),
    // Add more photo paths as needed
  ];

  const navigateToHomeScreen = () => {
    navigation.navigate('Feed');
  };

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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <ScrollView style={styles.photoContainer}>
        {photos.map((photo, index) => (
          <Image key={index} source={photo} style={styles.photo} />
        ))}
      </ScrollView>

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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  input: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 5,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  photoContainer: {
    flex: 1,
    width: '100%',
  },
  photo: {
    width: '100%',
    height: 200, // Adjust the height as needed
    marginBottom: 10, // Add some space between photos
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

export default SearchScreen;
