import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)", 
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  addressTitle: {
    marginVertical: 10,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
});

export default styles;
