import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#007BFF",
    marginBottom: 15,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
  },
  status: {
    fontSize: 18,
    color: "#999999",
    marginBottom: 20,
  },
  infoSection: {
    backgroundColor: "#ffffff",
    margin: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  infoText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#4A4A4A",
    flex: 1,
  },
  actionsSection: {
    backgroundColor: "#ffffff",
    margin: 15,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  actionText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#007BFF",
  },
  lastAction: {
    borderBottomWidth: 0,
  },
});

export default styles;
