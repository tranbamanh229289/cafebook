import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import color from "../../constants/color/color";
import { useCallback, useEffect, useRef, useState } from "react";
import { Avatar } from "../home-screen/Avatar";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SampleUser = {
  id: 1234,
  name: "Trịnh Văn Thoại",
  avatar:
    "https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg",
};

export const ChatNav = (props) => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    avatar: "https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg",
  });

  useEffect(() => {
    //get data with id
    console.log(props.userId);
    setUserData(SampleUser);
  }, [props.userId]);

  return (
    <View style={styles.topBar}>
      <View style={styles.topBarLeft}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="arrowleft" size={24} color={color.Black} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Avatar source={userData.avatar} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.header}>{userData.name}</Text>
      </View>
      <View style={styles.topBarRight}>
        <TouchableOpacity style={styles.btn}>
          <FontAwesome5 name="info-circle" size={24} color="black" />
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
  backIcon: {
    paddingTop: 4,
    paddingEnd: 20,
    alignItems: "center",
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
    fontSize: 16,
    fontWeight: "600",
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
