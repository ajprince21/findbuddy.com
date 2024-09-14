import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

export const registerForPushNotificationsAsync = async () => {
  let token ="";
  console.log("HEY THIS IS CALLED")
  if (Platform.OS === "android") {
    await Notification.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  console.log("finalStatus",token)
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("TOKEN",token);

  return token;
};
