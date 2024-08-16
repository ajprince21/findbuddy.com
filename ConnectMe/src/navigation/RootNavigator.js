import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import ChattingScreen from "../screens/ChattingScreen/ChattingScreen";
import CallingScreen from "../screens/CallingScreen/CallingScreen";
import WelcomeScreen from "../screens/WelcomeScreen/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { useSelector } from "react-redux";

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [initialRoute, setInitialRoute] = useState(
    isAuthenticated ? "root" : "WelcomeScreen"
  );

  useEffect(() => {
    setInitialRoute(isAuthenticated ? "root" : "WelcomeScreen");
  }, [isAuthenticated]);

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
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
          title: "",
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
