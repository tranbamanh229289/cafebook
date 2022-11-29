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
} from "react-native";
import color from "../../constants/color/color";
import { useNavigation } from "@react-navigation/native";
import { MessageTop} from "./MessageTop";
import { MessageCard} from "./MessageCard";


const DATA = [
  {
    lastMessageTime: "2022-11-28T15:09:12.558Z",
    name: "Seth Marks III",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/521.jpg",
    lastMessage: "lastMessage 1",
    id: "1",
  },
  {
    lastMessageTime: "2022-11-29T13:06:04.282Z",
    name: "Mabel Moen",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/308.jpg",
    lastMessage: "lastMessage 2",
    id: "2",
  },
  {
    lastMessageTime: "2022-11-29T02:51:27.015Z",
    name: "Wilma Wilkinson",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/519.jpg",
    lastMessage: "lastMessage 3",
    id: "3",
  },
  {
    lastMessageTime: "2022-11-28T17:12:35.744Z",
    name: "Ralph Koch",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1119.jpg",
    lastMessage: "lastMessage 4",
    id: "4",
  },
  {
    lastMessageTime: "2022-10-20T05:57:57.200Z",
    name: "Steve Hammes",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/368.jpg",
    lastMessage: "lastMessage 5",
    id: "5",
  },
  {
    lastMessageTime: "2022-11-28T17:19:41.227Z",
    name: "Kelly Boyer",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/165.jpg",
    lastMessage: "lastMessage 6",
    id: "6",
  },
  {
    lastMessageTime: "2022-11-28T19:50:04.121Z",
    name: "Joanne Schmeler",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/263.jpg",
    lastMessage: "lastMessage 7",
    id: "7",
  },
  {
    lastMessageTime: "2022-11-29T10:06:34.583Z",
    name: "Doris Miller",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/377.jpg",
    lastMessage: "lastMessage 8",
    id: "8",
  },
  {
    lastMessageTime: "2022-11-28T22:23:35.290Z",
    name: "Mrs. Desiree Witting MD",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/227.jpg",
    lastMessage: "lastMessage 9",
    id: "9",
  },
  {
    lastMessageTime: "2022-11-28T17:12:09.715Z",
    name: "Mr. Muriel Rempel",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/51.jpg",
    lastMessage: "lastMessage 10",
    id: "10",
  },
  {
    lastMessageTime: "2022-11-28T22:04:07.268Z",
    name: "Robin Dibbert DDS",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/754.jpg",
    lastMessage: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/754.jpg",
    id: "11",
  },
];

const Item = ({ id, name, avatar, lastMessage, lastMessageTime }) => (
  <MessageCard
    id={id}
    name={name}
    avatar={avatar}
    lastMessage={lastMessage}
    lastMessageTime={lastMessageTime}
  />
);

const { height } = Dimensions.get("screen");

export const MessageBody = (scrollY) => {
   
  const renderItem = (item) => {
    return (
    <Item
      id={item.item.id}
      name={item.item.name}
      avatar={item.item.avatar}
      lastMessage={item.item.lastMessage}
      lastMessageTime={item.item.lastMessageTime}
    />);
    };
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState(DATA);

  const ItemSeparatorComponent = () => (
    <View style={{ height: 20, backgroundColor: color.White }} />
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshing={refresh}
        ListHeaderComponent={ MessageTop}
        ItemSeparatorComponent={ItemSeparatorComponent}
        onRefresh={() => {
          console.log("refreshed");
        }}

        scrollEventThrottle={16}
        onEndReached={() => {
          setRefresh(true);
          setTimeout(() => {
            setData([{
              lastMessageTime: "2021-03-28T22:04:07.268Z",
              name: "Robin Dibbert DDS",
              avatar:
                "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/754.jpg",
              lastMessage: "lastMessage 11",
              id: "12"+Math.random().toString(),
            },...data]);
            setRefresh(false);
          }, 1000);
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
