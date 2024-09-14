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
  Alert,
  ActivityIndicator,
} from "react-native";
import { Icon, Image } from "@rneui/themed";
import Colors from "../../utlis/Colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import styles from "./ChattingScreen.style";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  fetchMessagesCount,
} from "../../services/thunks/chatThunks";
import { format } from "date-fns";
import ChattingSkeleton from "./Skeleton";
import io from "socket.io-client";
import {
  addMessage,
  resetMessage,
  setLoading,
} from "../../../store/slices/chatSlice";
import Config from "../../../src/services/config/default.env";
const { MS_MY_BUDDY_PUBLIC } = Config;

const ChattingScreen = ({ route }) => {
  const dispatch = useDispatch();
  const socket = useRef();
  const { user } = route.params;
  const token = useSelector((state) => state.auth.token);
  const loggedInUser = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.chat.messages);
  const hasMoreMessages = useSelector((state) => state.chat.hasMoreMessages);
  const isLoading = useSelector((state) => state.chat.chatListLoading);
  const isLoadingMore = useSelector((state) => state.chat.loadingMore);
  const totalMessage = useSelector((state) => state.chat.totalMessage);
  const [inputMessage, setInputMessage] = useState("");
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const [typing, setTyping] = useState(false);
  const [skip, setSkip] = useState(0);
  const [loading, seIstLoading] = useState(false);

  useEffect(() => {
    const params = {
      user_id: user?._id,
      limit: 15,
      skip: skip,
    };
    dispatch(setLoading(true));

    dispatch(fetchMessages(params));
  }, [user._id, dispatch, skip]);

  useEffect(() => {
    dispatch(
      fetchMessagesCount({
        user_id: user?._id,
      })
    );
  }, [user._id]);

  useEffect(() => {
    const setupSocket = async () => {
      socket.current = io(MS_MY_BUDDY_PUBLIC, {
        query: { token },
      });

      socket.current.emit("joinRoom", loggedInUser._id);

      socket.current.on("receive_message", (newMessage) => {
        console.log("MESSAGE RECEIVED");
        dispatch(addMessage(newMessage));
      });

      socket.current.on("sent_message", (sentMessage) => {
        console.log("HEY MESSAGE SENT");
        dispatch(addMessage(sentMessage));
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
  }, [user._id]);

  useEffect(() => {
    const onBeforeRemove = (event) => {
      dispatch(resetMessage());
      return;
    };

    const unsubscribe = navigation.addListener("beforeRemove", onBeforeRemove);
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  useEffect(() => {
    if (inputMessage) {
      socket.current.emit("typing", { receiver_id: user._id, isTyping: true });
    } else {
      socket.current.emit("typing", { receiver_id: user._id, isTyping: false });
    }
  }, [inputMessage]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        seIstLoading(false);
      }, 500);
    }
  }, [loading]);

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const messageData = {
        content: inputMessage,
        receiver_id: route.params.user._id,
      };
      socket.current.emit("send_message", messageData);
      setInputMessage("");
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  const onStartReached = () => {
    if (
      !isLoadingMore &&
      hasMoreMessages &&
      !loading &&
      messages?.length < totalMessage
    ) {
      seIstLoading(true);
      setSkip((prevSkip) => prevSkip + 15);
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
    [messages]
  );

  const header = useCallback(() => {
    return (
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
    );
  }, [user, typing]);

  const renderFooter = useCallback(() => {
    return <View>{(isLoadingMore || loading) && <ActivityIndicator />}</View>;
  }, [isLoadingMore, loading]);

  return (
    <SafeAreaView style={styles.container}>
      {header()}
      <View
        style={{
          flex: 1,
        }}
      >
        {isLoading ? (
          <ChattingSkeleton />
        ) : (
          <View>
            <FlatList
              inverted
              ref={flatListRef}
              data={messages}
              renderItem={renderMessage}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.messageList}
              onStartReached={onStartReached}
              onStartReachedThreshold={0.1}
              automaticallyAdjustKeyboardInsets
              showsVerticalScrollIndicator={false}
              ListFooterComponent={renderFooter}
            />
          </View>
        )}
      </View>

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
