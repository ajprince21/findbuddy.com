import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, Badge } from "@rneui/themed"; // Importing Icon and Badge from RNE
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#f8f8f8" },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "grey",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          tabBarLabel: "Chats",
          tabBarIcon: ({ color }) => (
            <Icon name="chat" type="material" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Icon name="person" type="material" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
