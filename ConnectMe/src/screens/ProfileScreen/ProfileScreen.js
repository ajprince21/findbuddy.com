import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";

const WelcomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: "https://i.pravatar.cc/300" }}
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Welcome to FindMyBuddy.com!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          /* Handle Login Logic */
        }}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          /* Handle Register Logic */
        }}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6f7ff", // Light blue background
    padding: 16,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75, // Circle for a better profile picture effect
    overflow: "hidden",
  },
  welcomeText: {
    fontSize: 28,
    marginBottom: 40,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default WelcomeScreen;
