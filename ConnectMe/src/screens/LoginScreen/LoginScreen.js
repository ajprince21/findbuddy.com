import { View, StyleSheet, ImageBackground } from "react-native";
import React, { useState } from "react";
import { Input, Button, Text } from "@rneui/themed";
import styles from "./LoginScreen.styles";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Logic for handling login goes here
    console.log("Logging in with", username, password);
  };

  return (
    <ImageBackground
      source={{ uri: "https://source.unsplash.com/random/1920x1080" }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text h3 style={styles.title}>
          Login
        </Text>
        <Input
          placeholder="Username"
          value={username}
          onChangeText={(value) => setUsername(value)}
          containerStyle={styles.input}
          leftIcon={{ type: "font-awesome", name: "user" }}
          inputStyle={styles.inputStyle}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry
          containerStyle={styles.input}
          leftIcon={{ type: "font-awesome", name: "lock" }}
          inputStyle={styles.inputStyle}
        />
        <Button
          title="Log In"
          buttonStyle={styles.button}
          onPress={handleLogin}
        />
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
