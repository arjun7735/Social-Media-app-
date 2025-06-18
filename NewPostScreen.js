import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Platform, ImageBackground, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const NewPostScreen = ({ navigation }) => {
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission required', 'Sorry, we need camera roll permissions to make this work!');
        }
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus !== 'granted') {
          Alert.alert('Permission required', 'Sorry, we need camera permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleChooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleTakePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handlePost = () => {
    // Implement logic to post the content and image
    console.log('Posted:', postText);
    console.log('Image:', image);
    navigation.navigate('Feed'); // Navigate back to the previous screen
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

  const navigateToHomeScreen = () => {
    navigation.navigate('Feed');
  };

  return (
    <ImageBackground source={require('./Account/back.jpeg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.heading}>Add Your New Post</Text>
        <View style={styles.transparentBox}>
          <TextInput
            style={styles.input}
            placeholder="Enter your post..."
            value={postText}
            onChangeText={setPostText}
            multiline={true}
          />
          {image && (
            <Image source={{ uri: image }} style={styles.image} />
          )}
          <TouchableOpacity style={styles.button} onPress={handleChooseImage}>
            <Text style={styles.buttonText}>Choose Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePost}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading:{
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  transparentBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker transparent black
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
  input: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#6495ED', // Light blue color
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: '100%', // Adjusted to display the image in full width
    height: 200, // Keeping fixed height
    marginBottom: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '112%',
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

export default NewPostScreen;
