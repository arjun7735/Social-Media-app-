import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleEmailChange = (text) => {
    setEmail(text);
    updateButtonState(text, password);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    updateButtonState(email, text);
  };

  const updateButtonState = (email, password) => {
    setIsButtonDisabled(!(email && password));
  };

  const handleLogin = () => {
    // Perform login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    // For now, we directly navigate to Home screen
    navigation.navigate('Feed');
  };

  return (
    <ImageBackground source={require('./Account/back.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleEmailChange}
            value={email}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            accessibilityLabel="Email"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordInput}>
            <TextInput
              style={styles.input}
              onChangeText={handlePasswordChange}
              value={password}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              accessibilityLabel="Password"
            />
            <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
              <Text>{showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Button
            title="Login"
            onPress={handleLogin}
            accessibilityLabel="Login"
            disabled={isButtonDisabled}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.link}>New to Application? Create Account</Text>
          <Button
            title="Create Account"
            onPress={() => navigation.navigate('CreateAccount')}
            accessibilityLabel="Create Account"
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    borderRadius: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    textAlign: 'center',
  },
});

export default LoginScreen;
