import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import color from "../../constants/color/color";
import { Feather } from "@expo/vector-icons";

export const FriendScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [friendRequests, setFriendRequests] = useState([
    {
      id: 0,
      username: "Minh Chu",
      avatar:
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
      same_friends: "144",
      created: "40 phút",
    },
    {
      id: 1,
      username: "Minh Chu",
      avatar:
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
      same_friends: "144",
      created: "40 phút",
    },
    {
      id: 2,
      username: "Minh Chu",
      avatar:
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
      same_friends: "144",
      created: "40 phút",
    },
    {
      id: 3,
      username: "Minh Chu",
      avatar:
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
      same_friends: "144",
      created: "40 phút",
    },
    {
      id: 4,
      username: "Minh Chu",
      avatar:
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
      same_friends: "144",
      created: "40 phút",
    },
    {
      id: 5,
      username: "Minh Chu",
      avatar:
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
      same_friends: "144",
      created: "40 phút",
    },
    {
      id: 6,
      username: "Minh Chu",
      avatar:
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
      same_friends: "144",
      created: "40 phút",
    },
    {
      id: 7,
      username: "Minh Chu",
      avatar:
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
      same_friends: "144",
      created: "40 phút",
    },
    {
      id: 8,
      username: "Minh Chu",
      avatar:
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
      same_friends: "144",
      created: "40 phút",
    },
    {
        id: 9,
        username: "Minh Chu",
        avatar:
          "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
        same_friends: "144",
        created: "40 phút",
      },
      {
        id: 10,
        username: "Minh Chu",
        avatar:
          "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
        same_friends: "144",
        created: "40 phút",
      },
      {
        id: 11,
        username: "Minh Chu",
        avatar:
          "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
        same_friends: "144",
        created: "40 phút",
      },
      {
        id: 12,
        username: "Minh Chu",
        avatar:
          "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
        same_friends: "144",
        created: "40 phút",
      },
  ]);

  return (
    <View style={styles.container}>
      {friendRequests.length > 0 ? (
        <FlatList
          refreshing={refreshing}
          ListHeaderComponent={ListHeaderComponent}
          data={friendRequests}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          stickyHeaderIndices={[0]}
          onRefresh={() => {
            setRefreshing(true);
            setTimeout(() => {
              console.log("notification refreshed");
              setRefreshing(false);
            }, 1000);
          }}
          onEndReached={() => {
            setRefreshing(true);
            setTimeout(() => {
                setFriendRequests((prev) => [
                  ...prev,
                  {
                    id: prev.length,
                    username: "Minh Chu",
                    avatar:
                      "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
                    same_friends: "144",
                    created: "40 phút",
                  },
                ]);
              setRefreshing(false);
            }, 1000);
          }}
        />
      ) : (
        <Text>Don't have any notifications</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: color.White,
    paddingHorizontal: 15,
  },
  subTextView: {
    backgroundColor: "#111111",
  },
  subText: {
    fontFamily: "Roboto-Bold",
    fontSize: 18,
    paddingLeft: 10,
    fontColor: color.Black
  },
});

const headerStyles = StyleSheet.create({
  listHeaderContainer: {
    backgroundColor: color.greenIcon,
    flexDirection: "column",
    paddingVertical: 8,
    marginBottom: 5,
  },
  headerItem1: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  friendText: {
    fontSize: 28,
    fontFamily: "Roboto-Bold",
  },
  iconButton: {
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.IconBackgroundGray,
    borderRadius: 16,
  },
});

const SearchIcon = () => <Feather name="search" size={22} color="black" />;

const ListHeaderComponent = () => (
  <View style={headerStyles.listHeaderContainer}>
    <View style={headerStyles.headerItem1}>
      <Text style={headerStyles.friendText}>Bạn bè</Text>
      <TouchableOpacity style={headerStyles.iconButton}>
        <SearchIcon />
      </TouchableOpacity>
    </View>
  </View>
);

const renderItem = ({ item }) => (
  <Item
    avatar={item.avatar}
    index={item.id}
    username={item.username}
    same_friends={item.same_friends}
    created={item.created}
  />
);

const Item = ({ avatar, index, username, same_friends, created }) => {
  <>
    {/* {console.log(index)}
    {console.log(typeof(index))}
    {index === 0 && (
      <View style={styles.subTextView}>
        <Text style={styles.subText}>Lời mời kết bạn</Text>
      </View>
    )} */}

{console.log(avatar, index, username, same_friends, created )}
<View style={{height: 250, width: 50, backgroundColor: color.Red}}></View>

  </>
};
