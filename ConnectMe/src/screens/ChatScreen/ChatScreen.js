import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useState } from "react";
import Styles from "./ChatScreen.style";
import { SpeedDial } from "@rneui/themed";
import ChatItem from "../../components/ChatItem/ChatItem";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import Colors from "../../utlis/Colors";

const ChatScreen = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = React.useState(false);
  const chatData = [
    {
      id: "1",
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      time: "10:30 AM",
      unreadCount: 2,
      avatarUrl: "https://i.pravatar.cc/150",
    },
    {
      id: "2",
      name: "Jane Smith",
      lastMessage: "See you later!",
      time: "Yesterday",
      unreadCount: 0,
      avatarUrl: "https://i.pravatar.cc/150",
    },
    {
      id: "3",
      name: "Bob Johnson",
      lastMessage: "Can we meet tomorrow?",
      time: "2:45 PM",
      unreadCount: 1,
      avatarUrl: "https://i.pravatar.cc/150",
    },
    {
      id: "4",
      name: "Alice Brown",
      lastMessage: "Thanks for your help!",
      time: "Tuesday",
      unreadCount: 0,
      avatarUrl: "https://i.pravatar.cc/150",
    },
  ];

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
  return (
    <SafeAreaView style={Styles.container}>
      <HomeHeader />
      <FlatList data={chatData} renderItem={renderItem} />
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
