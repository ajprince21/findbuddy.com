import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import ChattingScreen from "../screens/ChattingScreen/ChattingScreen";
import CallingScreen from "../screens/CallingScreen/CallingScreen";

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="root"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChattingScreen"
        component={ChattingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CallingScreen"
        component={CallingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
