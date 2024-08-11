import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Icon, Image } from "@rneui/themed";
import Colors from "../../utlis/Colors";
import { useNavigation } from "@react-navigation/native";

const ChattingScreen = ({ route }) => {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hey there!", sender: "them", time: "10:00 AM" },
    { id: "2", text: "Hi! How are you?", sender: "me", time: "10:01 AM" },
    {
      id: "3",
      text: "I'm good, thanks! How about you?",
      sender: "them",
      time: "10:02 AM",
    },
    {
      id: "4",
      text: "I'm good, thanks! How about you?",
      sender: "them",
      time: "10:02 AM",
    },
    {
      id: "5",
      text: "I'm good, thanks! How about you?",
      sender: "them",
      time: "10:02 AM",
    },
    {
      id: "6",
      text: "I'm good, thanks! How about you?",
      sender: "them",
      time: "10:02 AM",
    },
    { id: "7", text: "Hi! How are you?", sender: "me", time: "10:01 AM" },
    { id: "8", text: "Hi! How are you?", sender: "me", time: "10:01 AM" },
    { id: "9", text: "Hi! How are you?", sender: "me", time: "10:01 AM" },
    {
      id: "10",
      text: "I'm good, thanks! How about you?",
      sender: "them",
      time: "10:02 AM",
    },
    {
      id: "11",
      text: "I'm good, thanks! How about you?",
      sender: "them",
      time: "10:02 AM",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const { name } = route.params;
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "me" ? styles.myMessage : styles.theirMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  const sendMessage = () => {
    if (inputMessage.trim().length > 0) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputMessage.trim(),
        sender: "me",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  };

  const goBack = () => {
    navigation.goBack();
  };
  const handlecalling = () => {
    navigation.navigate("CallingScreen");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <TouchableOpacity onPress={goBack}>
            <Icon
              name="arrow-back"
              type="material"
              color={Colors.text.primary}
              size={32}
            />
          </TouchableOpacity>
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            style={styles.avatar}
          />
          <Text style={styles.headerTitle}>{name}</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={handlecalling}>
            <Icon
              name="call"
              type="material"
              color={Colors.text.primary}
              size={24}
            />
          </TouchableOpacity>

          <TouchableOpacity style={{ marginLeft: 12 }}>
            <Icon
              name="more-vert"
              type="material"
              color={Colors.text.primary}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        automaticallyAdjustKeyboardInsets
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type a message…"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Icon name="send" type="material" color={Colors.primary} size={24} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

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
  messageList: {
    paddingHorizontal: 10,
    paddingVertical: 5,
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

export default ChattingScreen;
