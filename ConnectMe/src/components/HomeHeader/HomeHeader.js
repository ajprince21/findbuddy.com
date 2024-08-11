import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import Colors from "../../utlis/Colors";

const HomeHeader = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>findMyBuddy.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    height: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 20,
  },
});

export default HomeHeader;
