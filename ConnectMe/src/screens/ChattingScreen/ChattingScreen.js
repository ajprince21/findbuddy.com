import React, { useState, useRef, useCallback, useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";
import styles from "./ChattingScreen.style";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../services/thunks/chatThunks";
import { format } from "date-fns";
import ChattingSkeleton from "./Skeleton";
import io from "socket.io-client";
import { addMessage } from "../../../store/slices/chatSlice";
import Config from "../../../src/services/config/default.env";
const { MS_MY_BUDDY_PUBLIC } = Config;

const ChattingScreen = ({ route }) => {
  const dispatch = useDispatch();
  const socket = useRef();
  const { user } = route.params;
  const token = useSelector((state) => state.auth.token);
  const messages = useSelector((state) => state.chat.messages);
  const isLoading = useSelector((state) => state.chat.chatListLoading);
  const [inputMessage, setInputMessage] = useState("");
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    dispatch(fetchMessages(user?._id));
  }, [user?._id]);

  useEffect(() => {
    const setupSocket = async () => {
      socket.current = io(MS_MY_BUDDY_PUBLIC, {
        query: { token },
      });

      socket.current.emit("joinRoom", user._id);

      socket.current.on("receive_message", (newMessage) => {
        dispatch(addMessage(newMessage));
      });
      socket.current.on("typing", ({ isTyping, userId }) => {
        setTyping(isTyping);
      });

      return () => {
        if (socket.current) {
          socket.current.off("receive_message");
          socket.current.off("typing");
          socket.current.disconnect();
        }
      };
    };

    setupSocket();
  }, [dispatch, user._id]);

  useEffect(() => {
    if (inputMessage) {
      socket.current.emit("typing", { receiver_id: user._id, isTyping: true });
    } else {
      socket.current.emit("typing", { receiver_id: user._id, isTyping: false });
    }
  }, [inputMessage]);

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const messageData = {
        content: inputMessage,
        receiver_id: route.params.user._id,
      };
      socket.current.emit("send_message", messageData);
      setInputMessage("");
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  };
  const goBack = () => {
    navigation.goBack();
  };
  const handlecalling = () => {
    navigation.navigate("CallingScreen", user);
  };

  const renderMessage = useCallback(
    ({ item }) => (
      <View
        style={[
          styles.messageBubble,
          item.sender === "me" ? styles.myMessage : styles.theirMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.content}</Text>
        <Text style={styles.messageTime}>
          {format(new Date(item.updated_at), "HH:mm")}
        </Text>
      </View>
    ),
    []
  );

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
          <View>
            <Text style={styles.headerTitle}>{user?.name}</Text>
            {typing && <Text style={styles.typing}>typing...</Text>}
          </View>
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
      {isLoading ? (
        <ChattingSkeleton />
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          automaticallyAdjustKeyboardInsets
          showsVerticalScrollIndicator={false}
        />
      )}

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

export default ChattingScreen;
