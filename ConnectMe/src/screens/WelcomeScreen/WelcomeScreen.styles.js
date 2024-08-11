import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
    margin: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#fff",
  },
  welcomeText: {
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  subtitleText: {
    marginBottom: 40,
    color: "#777",
    textAlign: "center",
    fontSize: 16,
  },
});

export default styles;
