import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import color from "../../constants/color/color";
import { useCallback, useEffect, useRef, useState } from "react";
import { Avatar } from "../home-screen/Avatar";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

export const MessageNav = () => {
  const user = useSelector((state) => state.user.data)
  // console.log(user)
  const navigation = useNavigation();
  return (
    <View style={styles.topBar}>
      <View style={styles.topBarLeft}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MyProfile")}
        >
          <Avatar source={user.avatar} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.header}>cafebook</Text>
      </View>
      <View style={styles.topBarRight}>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="camera" size={24} color={color.Black} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('CreateMessage') }}>
          <Feather name="edit" size={20} color={color.Black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    paddingTop: 8,
    paddingBottom: 8,
    shadowColor: color.BackgroundIcon,
    shadowRadius: 2,
    borderBottomWidth: 1,
    borderBottomColor: color.BackgroundGray,
    width: "100%",
    paddingHorizontal: 12,
    backgroundColor: color.White,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topBarLeft: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  topBarRight: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  avatar: {
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-end",
  },

  header: {
    fontFamily: "klavika-bold",
    fontSize: 32,
    color: color.MainBlue,
    marginStart: 16,
  },
  btn: {
    height: 36,
    width: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.BackgroundIcon,
    marginEnd: 8,
  },
});
