import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useState } from "react";
import Styles from "./ChatScreen.style";
import { SearchBar } from "@rneui/themed";
import { Icon } from "@rneui/themed";

const ChatScreen = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  const renderItem = () => {
    return (
      <View>
        <Text>Hii</Text>
      </View>
    );
  };
  const renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        platform="ios"
        searchIcon={<Icon name="search" type="material" color={"#888"} />}
        clearIcon={<Icon name="clear" type="material" color={"#888"} />}
        cancelIcon={<Icon name="arrow-back" type="material" color={"#888"} />}
      />
    );
  };

  return (
    <SafeAreaView style={Styles.container}>
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        stickyHeaderIndices={[0]}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
