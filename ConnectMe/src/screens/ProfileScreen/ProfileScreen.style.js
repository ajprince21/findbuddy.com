import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    color: "#4A4A4A",
  },
  infoSection: {
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    padding: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#4A4A4A",
  },
  actionsSection: {
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    padding: 15,
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
    color: "#4A4A4A",
  },
});
export default styles;
