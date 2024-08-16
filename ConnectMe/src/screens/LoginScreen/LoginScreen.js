import { View, StyleSheet, ImageBackground, Alert } from "react-native";
import React, { useState } from "react";
import { Input, Button, Text } from "@rneui/themed";
import styles from "./LoginScreen.styles";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../services/thunks/authThunks";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const resultAction = dispatch(loginUser({ username, password }));

      if (loginUser.fulfilled.match(resultAction)) {
        navigation.navigate("root", {
          screen: "ChattingScreen",
        });
      } else {
        console.log("Failed to log in:", resultAction.error);
      }
    } catch (err) {
      console.error("An error occurred during login:", err);
    }
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
          autoCapitalize={"none"}
          accessibilityLabel="Username"
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry
          containerStyle={styles.input}
          leftIcon={{ type: "font-awesome", name: "lock" }}
          inputStyle={styles.inputStyle}
          accessibilityLabel="Password"
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
