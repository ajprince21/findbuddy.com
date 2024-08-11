import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import ChattingScreen from "../screens/ChattingScreen/ChattingScreen";
import CallingScreen from "../screens/CallingScreen/CallingScreen";
import WelcomeScreen from "../screens/WelcomeScreen/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  const isLoggedIn = true;
  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? "Root" : "WelcomeScreen"}>
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
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title:""
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title:""
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
