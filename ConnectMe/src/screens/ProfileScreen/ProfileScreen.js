import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Icon } from "@rneui/themed";
import styles from "./ProfileScreen.style";

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            style={styles.profilePicture}
          />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.status}>Available</Text>
        </View>

        <View style={styles.infoSection}>
          <InfoItem icon="phone" text="+1 (123) 456-7890" />
          <InfoItem icon="mail" text="johndoe@example.com" />
          <InfoItem icon="location-on" text="New York, USA" />
        </View>

        <View style={styles.actionsSection}>
          <ActionButton icon="edit" text="Edit Profile" />
          <ActionButton icon="settings" text="Settings" />
          <ActionButton icon="help" text="Help & Support" />
          <ActionButton icon="logout" text="Logout" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoItem = ({ icon, text }) => (
  <View style={styles.infoItem}>
    <Icon name={icon} type="material" color="#4A4A4A" size={24} />
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

const ActionButton = ({ icon, text }) => (
  <TouchableOpacity style={styles.actionButton}>
    <Icon name={icon} type="material" color="#4A4A4A" size={24} />
    <Text style={styles.actionText}>{text}</Text>
  </TouchableOpacity>
);

export default ProfileScreen;
