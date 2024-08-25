import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Styles from "./ChatScreen.style";
import { SpeedDial } from "@rneui/themed";
import ChatItem from "../../components/ChatItem/ChatItem";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import Colors from "../../utlis/Colors";
import { useDispatch, useSelector } from "react-redux";
import { getUserChatList } from "../../services/thunks/chatThunks";

const ChatScreen = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chat.chatList);
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
