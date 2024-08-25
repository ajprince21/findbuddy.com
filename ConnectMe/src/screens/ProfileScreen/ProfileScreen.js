import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Icon } from "@rneui/themed";
import styles from "./ProfileScreen.style";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../../store/slices/authSlice";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          dispatch(logoutSuccess());
          navigation.navigate("WelcomeScreen");
        },
      },
    ]);
  };

  const actions = [
    { icon: "edit", text: "Edit Profile" },
    { icon: "settings", text: "Settings" },
    { icon: "help", text: "Help & Support" },
    { icon: "logout", text: "Logout", onPress: handleLogout },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{
              uri: user?.profile_picture || "https://i.pravatar.cc/300",
            }}
            style={styles.profilePicture}
          />
          <Text style={styles.name}>{`${user?.first_name || ""} ${
            user?.last_name || ""
          }`}</Text>
          <Text style={styles.status}>{user?.bio || "Available"}</Text>
        </View>

        <View style={styles.infoSection}>
          <InfoItem icon="phone" text={user?.phone || "+1 (123) 456-7890"} />
          <InfoItem icon="mail" text={user?.email || "johndoe@example.com"} />
          <InfoItem
            icon="location-on"
            text={user?.location || "New York, USA"}
          />
        </View>

        <View style={styles.actionsSection}>
          {actions.map((action, index) => (
            <ActionButton
              key={action.text}
              icon={action.icon}
              text={action.text}
              onPress={action.onPress}
              style={index === actions.length - 1 ? styles.lastAction : null}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoItem = ({ icon, text }) => (
  <View style={styles.infoItem}>
    <Icon name={icon} type="material" color="#007BFF" size={24} />
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

const ActionButton = React.memo(({ icon, text, onPress, style }) => (
  <TouchableOpacity
    style={[styles.actionButton, style]}
    onPress={onPress}
    accessibilityLabel={text}
  >
    <Icon name={icon} type="material" color="#007BFF" size={24} />
    <Text style={styles.actionText}>{text}</Text>
  </TouchableOpacity>
));

export default ProfileScreen;
