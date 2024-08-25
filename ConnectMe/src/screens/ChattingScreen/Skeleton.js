import { View, StyleSheet, FlatList } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/themed";

const ChattingSkeleton = () => {
  const renderItem = () => {
    return (
      <>
        <View style={styles.leftBubble}>
          <Skeleton
            animation="pulse"
            width={200}
            height={20}
            borderRadius={10}
          />
        </View>
        <View style={styles.spaceBetween} />

        <View style={styles.rightBubble}>
          <Skeleton
            animation="pulse"
            width={150}
            height={20}
            borderRadius={10}
          />
        </View>
        <View style={styles.spaceBetween} />

        <View style={styles.leftBubble}>
          <Skeleton
            animation="pulse"
            width={180}
            height={20}
            borderRadius={10}
          />
        </View>
        <View style={styles.spaceBetween} />

        <View style={styles.rightBubble}>
          <Skeleton
            animation="pulse"
            width={100}
            height={20}
            borderRadius={10}
          />
        </View>
        <View style={styles.spaceBetween} />
      </>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList data={[1, 2]} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  leftBubble: {
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  rightBubble: {
    alignSelf: "flex-end",
    marginBottom: 12,
  },
  spaceBetween: {
    height: 8,
  },
});

export default ChattingSkeleton;
