import { StyleSheet } from "react-native";
import Colors from "../../utlis/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 8,
  },
  typing: {
    color: "green",
    fontSize: 10,
    fontWeight: "400",
    paddingLeft: 12,
  },
  messageList: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexGrow:1,
    minHeight:"100%",
  },
  messageBubble: {
    maxWidth: "75%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginBottom: 10,
  },
  myMessage: {
    backgroundColor: Colors.primary,
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },
  theirMessage: {
    backgroundColor: Colors.background.dark,
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: Colors.text.onLight,
    fontSize: 16,
  },
  messageTime: {
    fontSize: 10,
    color: Colors.text.secondary,
    marginTop: 5,
    textAlign: "right",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.background.light,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.inputBackground,
    borderRadius: 25,
    marginRight: 10,
    fontSize: 16,
    color: Colors.text.primary,
  },
  sendButton: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 32,
    marginLeft: 8,
  },
});

export default styles;
