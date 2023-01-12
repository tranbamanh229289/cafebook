import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  Animated,
  StyleSheet,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import color from "../../constants/color/color";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Avatar } from "../../components/home-screen/Avatar";

export const SuggestFriendScreen = ({ modalVisible, setModalVisible }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [friendSuggests, setFriendSuggests] = useState([
    {
      id: 0,
      username: "Minh Chu",
      avatar:
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
      same_friends: "0",
    },
    {
      id: 1,
      username: "Minh Chu",
      avatar:
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
      same_friends: "144",
    },
    {
      id: 2,
      username: "Minh Chu",
      avatar:
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
      same_friends: "0",
    },
    {
      id: 3,
      username: "Minh Chu",
      avatar:
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
      same_friends: "144",
    },
    {
      id: 4,
      username: "Minh Chu",
      avatar:
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
      same_friends: "144",
    },
    {
      id: 5,
      username: "Minh Chu",
      avatar:
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
      same_friends: "144",
    },
    {
      id: 6,
      username: "Minh Chu",
      avatar:
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
      same_friends: "144",
    },
  ]);

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle="overFullScreen"
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <FlatList
        refreshing={refreshing}
        ListHeaderComponent={
          <ListHeaderComponent setModalVisible={setModalVisible} />
        }
        data={friendSuggests}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        stickyHeaderIndices={[0]}
        overScrollMode='never'
      />
    </Modal>
  );
};

const renderItem = ({ item }) => (
  <Item
    avatar={item.avatar}
    index={item.id}
    username={item.username}
    same_friends={item.same_friends}
  />
);

const Item = ({ avatar, index, username, same_friends }) => (
  <>
    {index === 0 && (
      <Text style={styles.subText1}>Những người bạn có thể biết</Text>
    )}

    <View style={styles.itemContainer}>
      <View style={styles.avatar}>
        <Avatar width={90} height={90} source={avatar} />
      </View>

      <View style={styles.subItemContainer}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={styles.usernameText}>{username}</Text>
        </View>

        {parseInt(same_friends) > 0 && (
          <Text style={styles.sameFriendText}>{same_friends} bạn chung</Text>
        )}

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity style={{ flex: 1, marginRight: 10 }}>
            <View style={[styles.button, { backgroundColor: color.MainBlue }]}>
              <Text style={[styles.textButton, { color: color.White }]}>
                Thêm bạn bè
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }}>
            <View
              style={[
                styles.button,
                { backgroundColor: color.IconBackgroundGray },
              ]}
            >
              <Text style={styles.textButton}>Gỡ</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </>
);

const SearchIcon = () => <Feather name="search" size={22} color="black" />;

const ListHeaderComponent = ({ setModalVisible }) => (
  <View style={styles.container}>
    <View style={styles.headerContainer}>
      <View style={{ flexDirection: "row" }}>
        <Ionicons
          name="arrow-back-outline"
          size={26}
          color="black"
          onPress={() => setModalVisible(false)}
        />
        <Text
          style={{
            fontSize: 20,
            paddingLeft: 15,
          }}
        >
          Gợi ý
        </Text>
      </View>

      <SearchIcon />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.White,
  },
  headerContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d9dbda",
  },
  subText1: {
    fontSize: 22,
    fontFamily: "Roboto-Bold",
    paddingHorizontal: 15,
    paddingTop: 10,
  },

  itemContainer: {
    marginTop: 15,
    alignItems: "center",
    flexDirection: "row",
  },

  subText: {
    fontFamily: "Roboto-Bold",
    fontSize: 18,
  },
  itemContainer: {
    marginTop: 15,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  subItemContainer: {
    flexDirection: "column",
    flex: 1,
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  button: {
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  textButton: {
    fontSize: 18,
    fontFamily: "Roboto-Bold",
  },
  usernameText: {
    fontSize: 20,
    fontFamily: "Roboto-Bold",
  },
  sameFriendText: {
    fontSize: 16,
    color: color.GrayText,
    paddingBottom: 5,
  },
});
