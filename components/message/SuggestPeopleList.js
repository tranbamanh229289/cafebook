import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import color from "../../constants/color/color";
import { Avatar } from "../home-screen/Avatar";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../utils/axiosClient";

export const SuggestPeopleList = () => {
  const [people, setPeople] = useState([]);
  const navigation = useNavigation();
  const userId = useSelector((state) => state.auth.data.id);
  const token = useSelector((state) => state.auth.data.token);
  // console.log(token)
  // console.log(userId)

  useEffect(() => {
    axiosClient("POST", "friend/get_user_friends", {}, {
      user_id: userId,
      index: 0,
      count: 10,
      token: token
    }).then((res) => {
      console.log(res.data.data.friends);
      setPeople(res.data.data.friends)
    }).catch((e) => console.log(e))
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        data={people}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              //console.log(item.id);
              navigation.navigate("Chat", {
                itemId: item.id,
              })
            }}
          >
            {item.avatar ? <Avatar
              source={item.avatar}
              width={60}
              height={60}
              style={styles.avatar}
            /> : <Avatar
              width={60}
              height={60}
              style={styles.avatar}
            />}
            <Text style={styles.name}>{item.username}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.White,
    height: 120,
  },
  item: {
    width: 80,
    height: 120,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: color.Black,
    borderStyle: "solid",
    borderWidth: 0,
  },

  name: {
    marginTop: 4,
    padding: 2,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  contentContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
});
