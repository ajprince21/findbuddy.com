import React from "react";
import { View, StyleSheet, ImageBackground, Image, Button } from "react-native";
import { Text } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import styles from "./WelcomeScreen.styles";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate("LoginScreen");
  };
  const handleRegister = () => {
    navigation.navigate("RegisterScreen");
  };
  return (
    <ImageBackground
      source={{ uri: "https://source.unsplash.com/random/1920x1080" }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={{ uri: "https://i.pravatar.cc/300" }}
          style={styles.logo}
        />
        <Text h2 style={styles.welcomeText}>
          Welcome to FindMyBuddy.com!
        </Text>
        <Text style={styles.subtitleText}>Your adventure starts here</Text>
        <View
          style={{
            alignSelf: "center",
          }}
        >
          <Button title="Log In" onPress={handleLogin} />
          <Button title="Register" onPress={handleRegister} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;
