import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from "react-native";

import color from "../../constants/color/color";
import { useCallback, useEffect, useRef, useState } from "react";
import { Avatar } from "../home-screen/Avatar";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
export const MessageCard = ({
  id,
  name,
  avatar,
  lastMessage,
  lastMessageTime,
}) => {
  const convertLastMessageTime = (lastMessageTime) => {
    const time = new Date(lastMessageTime);
    const now = new Date();
    if (now.getFullYear() - time.getFullYear() > 0) {
      return time.toDateString().substring(4, time.toDateString().length);
    } else {
      if (now.getMonth() - time.getMonth() > 0) {
        return time.toDateString().substring(4, 10);
      } else {
        if (now.getDate() - time.getDate() > 7) {
          return time.toDateString().substring(4, 10);
        } else {
          if (now.getDate() - time.getDate() > 1) {
            return time.toDateString().substring(0, 4);
          } else {
            return time.toISOString().substring(11, 16);
          }
        }
      }
    }
  };

  const convertLastMessage = (lastMessage) => {
    if (lastMessage.length > 30) {
      return lastMessage.substring(0, 27) + "...";
    } else {
      return lastMessage;
    }
  };
  return (
    <View style={styles.container}>
      <Avatar source={avatar} width={60} height={60} style={styles.avatar} />
      <View style={styles.messageCardRight}>
        <Text style={styles.messageCardName}>{convertLastMessage(name)}</Text>
        <View style={styles.messageCardFooter}>
          <Text style={styles.lastMessage}>
            {convertLastMessage(lastMessage)}
          </Text>
          <Text style={styles.lastMessageTime}>
            {` • ${convertLastMessageTime(lastMessageTime)}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginHorizontal: 12,
  },
  messageCardRight: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginStart: 12,
  },
  messageCardName: {
    fontSize: 16,
    fontWeight: "600",
  },
  messageCardFooter: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
