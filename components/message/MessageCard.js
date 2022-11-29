import { StyleSheet, Text, TouchableOpacity, TouchableHighlight,View } from "react-native";

import color from "../../constants/color/color";
import { useCallback, useEffect, useRef, useState } from "react";
import { Avatar } from "../home-screen/Avatar";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
export const MessageCard = ({id, name, avatar, lastMessage, lastMessageTime}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Avatar source={avatar} width={60} height={60} style={styles.avatar} />
      <View style={styles.messageCardRight}>
        <Text style={styles.messageCardName}>{name}</Text>
        <View style={styles.messageCardFooter}>
            <Text style={styles.lastMessage}>{lastMessage}</Text>
            <Text style={styles.lastMessageTime}>{lastMessageTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginHorizontal: 12,
    },
    messageCardRight:{
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
    }
});
