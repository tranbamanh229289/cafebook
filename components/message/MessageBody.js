import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  BackHandler,
  ScrollView,
  FlatList,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import color from "../../constants/color/color";
import { useNavigation } from "@react-navigation/native";
import { MessageTop } from "./MessageTop";
import { MessageCard } from "./MessageCard";
import { useDispatch, useSelector } from "react-redux";

import axiosClient from "../../utils/axiosClient";

const { height } = Dimensions.get("screen");

export const MessageBody = () => {

  const userId = useSelector((state) => state.auth.data.id);
  const token = useSelector((state) => state.auth.data.token);
  // console.log(token)
  // console.log(userId)
  const navigation = useNavigation();

  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);

  const ItemSeparatorComponent = () => (
    <View style={{ height: 20, backgroundColor: color.White }} />
  );

  useEffect(() => {
    setRefresh(true);
    axiosClient("GET", "chat/get_list_conversation", {}, {
      token: token,
      index: 0,
      count: 10,
    }).then((res) => {
      console.log(res.data.data)
      setData(res.data.data)
    }).catch((e) => console.log(e))
    setTimeout(()=> setRefresh(false), 1000)
   
  }, [])

  return (
    <View style={styles.container}>
      <Animated.FlatList
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={(props) => (
          <TouchableOpacity
            onPress={() => {
              //console.log(props.item.id);
              navigation.navigate("Chat", {
                itemId: props.item.partner.id,
              });
            }}
          >
            <MessageCard
              id={props.item.id}
              name={props.item.partner.username}
              avatar={props.item.partner.avatar}
              lastMessage={props.item.lastMessage.message}
              lastMessageTime={props.item.lastMessage.created}
              lastMessageSender={props.item.lastMessage.sender}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        refreshing={refresh}
        ListHeaderComponent={MessageTop}
        ItemSeparatorComponent={ItemSeparatorComponent}
        onRefresh={() => {
          setRefresh(true);
          axiosClient("GET", "chat/get_list_conversation", {}, {
            token: token,
            index: 0,
            count: 10,
          }).then((res) => {
            console.log(res.data.data)
            setData(res.data.data)
          }).catch((e) => console.log(e));
          setRefresh(false);
        }}
        scrollEventThrottle={16}
        onEndReached={() => {
          if (data.length > 9) {
            setRefresh(true);
            setTimeout(() => {
              axiosClient("GET", "chat/get_list_conversation", {}, {
                token: token,
                index: data.length,
                count: 10,
              }).then((res) => {
                setData([...data, ...res.data.data])
              }).catch((e) => console.log(e))

              setRefresh(false);
            }, 1000);
          }

        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: color.White,
  },
  contentContainerStyle: {
    backgroundColor: color.White,
  },
});
