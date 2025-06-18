import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';

const CreateAccountScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSaveDetails = () => {
    const passwordValidation = validatePassword(password);
    if (passwordValidation !== true) {
      setPasswordStrength(passwordValidation);
      return;
    }
    if (!email.endsWith('@gmail.com')) {
      // Invalid email format
      return;
    }
    if (password !== confirmPassword) {
      // Passwords do not match
      return;
    }
    // Perform saving details logic here
    // For now, let's show an alert
    Alert.alert(
      'Success',
      'Details saved successfully',
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Login');
          }
        }
      ],
      { cancelable: false }
    );
  };

  const validateMobileNumber = (text) => {
    // Remove non-numeric characters
    const cleaned = text.replace(/[^0-9]/g, '');

    // Limit the length to 10 digits
    if (cleaned.length <= 10) {
      setMobileNumber(cleaned);
    }
  };

  const validatePassword = (password) => {
    // Password must be at least 8 characters long
    if (password.length < 8) return "Password must be at least 8 characters long.";

    // Password must contain at least one uppercase letter
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";

    // Password must contain at least one lowercase letter
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";

    // Password must contain at least one digit
    if (!/\d/.test(password)) return "Password must contain at least one digit.";

    // Password must contain at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must contain at least one special character.";

    return true;
  };

  return (
    <ImageBackground source={require('./Account/back.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account Screen</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setFullName(text)}
            value={fullName}
            placeholder="Enter your full name"
            accessibilityLabel="Full Name"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={validateMobileNumber}
            value={mobileNumber}
            placeholder="Enter your mobile number"
            keyboardType="phone-pad"
            accessibilityLabel="Mobile Number"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text)}
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
              onChangeText={text => setPassword(text)}
              value={password}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              accessibilityLabel="Password"
            />
            <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
              <Text>{showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableWithoutFeedback>
          </View>
          {passwordStrength !== '' && <Text style={styles.passwordStrength}>{passwordStrength}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordInput}>
            <TextInput
              style={styles.input}
              onChangeText={text => setConfirmPassword(text)}
              value={confirmPassword}
              placeholder="Confirm your password"
              secureTextEntry={!showConfirmPassword}
              accessibilityLabel="Confirm Password"
            />
            <TouchableWithoutFeedback onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Text>{showConfirmPassword ? 'Hide' : 'Show'}</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <Button
          title="Save Details"
          onPress={handleSaveDetails}
          accessibilityLabel="Save Details"
        />
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
  title: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
  passwordStrength: {
    color: '#FF0000',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 5,
  },
});

export default CreateAccountScreen;
