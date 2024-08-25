// CallingScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import Colors from "../../utlis/Colors";

const CallingScreen = ({ navigation, route }) => {
  const contactName = route?.params?.name;

  const handleEndCall = () => {
    // Handle ending the call, e.g., navigate back
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{`Calling ${contactName}...`}</Text>
      <Icon
        name="phone"
        type="material"
        color={Colors.primary}
        size={100}
        style={styles.icon}
      />

      <TouchableOpacity style={styles.endCallButton} onPress={handleEndCall}>
        <Text style={styles.endCallText}>End Call</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background.light,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 50,
  },
  icon: {
    marginBottom: 50,
  },
  endCallButton: {
    backgroundColor: Colors.error,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 50,
  },
  endCallText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CallingScreen;
