import React from "react";
import { View, ActivityIndicator, StyleSheet, Modal, Text } from "react-native";

const LoadingOverlay = ({ visible = false, type }) => {
  const renderContent = () => {
    switch (type) {
      case "full":
        return (
          <>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.text}>Loading in progress...</Text>
          </>
        );
      default:
        return (
          <View style={styles.notFullContainer}>
            <ActivityIndicator size="large" color="#000000" />
            <Text style={styles.textBlack}>Please wait...</Text>
          </View>
        );
    }
  };

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View
        style={type === "full" ? styles.fullOverlay : styles.notFullOverlay}
      >
        {renderContent()}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  notFullOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  notFullContainer: {
    width: 200,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  text: {
    color: "#ffffff",
    marginTop: 10,
    fontSize: 16,
  },
  textBlack: {
    color: "#000000",
    marginTop: 10,
    fontSize: 16,
  },
});

export default LoadingOverlay;
