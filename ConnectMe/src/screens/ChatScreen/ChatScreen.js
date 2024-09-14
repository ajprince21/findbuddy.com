import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Styles from "./ChatScreen.style";
import { SpeedDial } from "@rneui/themed";
import ChatItem from "../../components/ChatItem/ChatItem";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import Colors from "../../utlis/Colors";
import { useDispatch, useSelector } from "react-redux";
import { getUserChatList } from "../../services/thunks/chatThunks";
import { useIsFocused } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../../utlis/registerPushNotification";

const ChatScreen = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chat.chatList);
  const chatListLoading = useSelector((state) => state.chat.chatListLoading);
  const error = useSelector((state) => state.chat.error);
  const [expoPushToken, setExpoPushToken] = useState("");
  const isFocused = useIsFocused()

  useEffect(() => {
    const registerNotifications = async () => {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        setExpoPushToken(token);
      } 
    };

    if (isFocused) {
      registerNotifications();

      // Handle notifications that are received or selected
      const notificationListener = Notifications.addNotificationReceivedListener(
        (notification) => {
          // Handle notification
        }
      );

      const responseListener =
        Notifications.addNotificationResponseReceivedListener((response) => {
          // Handle notification response
        });

      // Return cleanup function
      return () => {
        Notifications.removeNotificationSubscription(notificationListener);
        Notifications.removeNotificationSubscription(responseListener);
      };
    }
  }, [isFocused]);

  console.log({ expoPushToken });
  useEffect(() => {
    dispatch(getUserChatList());
  }, []);

  const updateSearch = (search) => {
    setSearch(search);
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        <ChatItem data={item} />
      </View>
    );
  };

  if (chatListLoading)
    return (
      <SafeAreaView style={Styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  if (error)
    return (
      <SafeAreaView style={Styles.container}>
        <Text>Error...{error}</Text>
      </SafeAreaView>
    );
  return (
    <SafeAreaView style={Styles.container}>
      <HomeHeader />
      <FlatList data={chatList} renderItem={renderItem} />
      <SpeedDial
        isOpen={open}
        icon={{ name: "add", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        buttonStyle={{
          backgroundColor: Colors.primary,
        }}
      >
        <SpeedDial.Action
          icon={{ name: "add", color: "#fff" }}
          title="Add Buddy"
          onPress={() => console.log("Add Something")}
          buttonStyle={{
            backgroundColor: Colors.secondary,
          }}
        />
      </SpeedDial>
    </SafeAreaView>
  );
};

export default ChatScreen;
