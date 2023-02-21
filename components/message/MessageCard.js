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
import { useDispatch, useSelector } from "react-redux";
const Day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const Month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const MessageCard = ({
  id,
  name,
  avatar,
  lastMessage,
  lastMessageTime,
  lastMessageSender
}) => {
  const userId = useSelector((state) => state.auth.data.id);
  const convertLastMessageTime = (lastMessageTime) => {
    const last = new Date(lastMessageTime);
    const now = new Date();
    const lastDate = {
      date: last.getDate(),
      day: Day[last.getDay()],
      month: last.getMonth(),
      year: last.getFullYear(),
      hour: last.getHours(),
      minute: last.getMinutes()
    }
    const nowDate = {
      date: now.getDate(),
      day: Day[last.getDay()],
      month: now.getMonth(),
      year: now.getFullYear(),
      hour: now.getHours(),
      minute: now.getMinutes()
    }
    if (nowDate.year - lastDate.year > 0) {
      return `${Month[lastDate.month]} ${lastDate.date} ${lastDate.year}`
    } else {
      if (nowDate.month - lastDate.month > 0) {
        return `${Month[lastDate.month]} ${lastDate.date}`;
      } else {
        if (nowDate.date - lastDate.date > 7) {
          return `${Month[lastDate.month]} ${lastDate.date}`;
        } else {
          if (nowDate.date - lastDate.date > 1) {
            return lastDate.day;
          } else {
            return `${(lastDate.hour<10)?'0'+lastDate.hour:lastDate.hour}:${lastDate.minute<10?"0"+lastDate.minute:lastDate.minute}`;
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
            { (lastMessageSender===userId)?"You: "+ convertLastMessage(lastMessage):""+ convertLastMessage(lastMessage)}
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
