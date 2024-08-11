import React, { useState } from "react";
import { View, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { Input, Button, Text } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";

const RegisterScreen = () => {
  // State variables for user input
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    mobileNumber: "",
    profileImage: "https://i.pravatar.cc/150",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = () => {
    console.log("Registering user:", formData);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      automaticallyAdjustKeyboardInsets
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text h3 style={styles.title}>
          Create Account
        </Text>

        {/* Input Fields */}
        <Input
          placeholder="First Name"
          value={formData.firstName}
          onChangeText={(value) => handleInputChange("firstName", value)}
          leftIcon={<FontAwesome name="user" size={20} color="#007bff" />}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputStyle}
        />
        <Input
          placeholder="Last Name"
          value={formData.lastName}
          onChangeText={(value) => handleInputChange("lastName", value)}
          leftIcon={<FontAwesome name="user" size={20} color="#007bff" />}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputStyle}
        />
        <Input
          placeholder="Username"
          value={formData.username}
          onChangeText={(value) => handleInputChange("username", value)}
          leftIcon={<FontAwesome name="user" size={20} color="#007bff" />}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputStyle}
        />
        <Input
          placeholder="Password"
          value={formData.password}
          secureTextEntry
          onChangeText={(value) => handleInputChange("password", value)}
          leftIcon={<FontAwesome name="lock" size={20} color="#007bff" />}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputStyle}
        />
        <Input
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          secureTextEntryajay
          onChangeText={(value) => handleInputChange("confirmPassword", value)}
          leftIcon={<FontAwesome name="lock" size={20} color="#007bff" />}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputStyle}
        />
        <Input
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
          leftIcon={<FontAwesome name="envelope" size={20} color="#007bff" />}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputStyle}
        />
        <Input
          placeholder="Mobile Number"
          value={formData.mobileNumber}
          onChangeText={(value) => handleInputChange("mobileNumber", value)}
          leftIcon={<FontAwesome name="phone" size={20} color="#007bff" />}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputStyle}
          keyboardType="number-pad"
        />
        <Input
          placeholder="Profile Image URL"
          value={formData.profileImage}
          onChangeText={(value) => handleInputChange("profileImage", value)}
          leftIcon={<FontAwesome name="image" size={20} color="#007bff" />}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputStyle}
          disabled
        />
        <Input
          placeholder="Street"
          value={formData.street}
          onChangeText={(value) => handleInputChange("street", value)}
          leftIcon={<FontAwesome name="road" size={20} color="#007bff" />}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputStyle}
        />
        <Input
          placeholder="City"
          value={formData.city}
          onChangeText={(value) => handleInputChange("city", value)}
          leftIcon={<FontAwesome name="building" size={20} color="#007bff" />}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputStyle}
        />
        <Input
          placeholder="State"
          value={formData.state}
          onChangeText={(value) => handleInputChange("state", value)}
          leftIcon={<FontAwesome name="flag" size={20} color="#007bff" />}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputStyle}
        />
        <Input
          placeholder="Zip Code"
          value={formData.zipCode}
          onChangeText={(value) => handleInputChange("zipCode", value)}
          leftIcon={<FontAwesome name="map-pin" size={20} color="#007bff" />}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputStyle}
          keyboardType="number-pad"
        />
        <Input
          placeholder="Country"
          value={formData.country}
          onChangeText={(value) => handleInputChange("country", value)}
          leftIcon={<FontAwesome name="globe" size={20} color="#007bff" />}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputStyle}
        />

        {/* Register Button */}
        <Button
          title="Register"
          buttonStyle={styles.button}
          onPress={handleRegister}
          containerStyle={styles.buttonContainer}
        />
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  container: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
    color: "#007bff",
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#007bff",
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 15,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

export default RegisterScreen;
