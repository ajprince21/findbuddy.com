import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Icon, Image } from "@rneui/themed";
import Colors from "../../utlis/Colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import styles from "./ChattingScreen.style";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../services/thunks/chatThunks";
import { format } from "date-fns";

const ChattingScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { user } = route.params;
  const messages = useSelector((state) => state.chat.messages);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchMessages(user?._id));
    }, [])
  );

  const [inputMessage, setInputMessage] = useState("");

  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "me" ? styles.myMessage : styles.theirMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.content}</Text>
      <Text style={styles.messageTime}>{format(item.updated_at, "HH MM")}</Text>
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
          <Image source={{ uri: user?.avatarUrl }} style={styles.avatar} />
          <Text style={styles.headerTitle}>{user?.name}</Text>
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
        <TouchableOpacity style={styles.sendButton}>
          <Icon name="send" type="material" color={Colors.primary} size={24} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChattingScreen;
