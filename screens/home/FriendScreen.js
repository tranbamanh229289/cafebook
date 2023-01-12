import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  FlatList,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import color from "../../constants/color/color";
import { Feather } from "@expo/vector-icons";
import { Avatar } from "../../components/home-screen/Avatar";
import { SuggestFriendScreen } from "./FriendSuggestScreen";
import { AllFriendScreen } from "./FriendAllScreen";


export const FriendScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  

  const [friendRequests, setFriendRequests] = useState([
    {
      id: 0,
      username: "Minh Chu",
      avatar:
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
      same_friends: "0",
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
      same_friends: "0",
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
          showsVerticalScrollIndicator={false}
          data={friendRequests}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          stickyHeaderHiddenOnScroll
          stickyHeaderIndices={[0]}
          onRefresh={() => {
            setRefreshing(true);
            setTimeout(() => {
              console.log("Friend requests refreshed");
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
        <Text>Don't have any friend requests</Text>
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
  subText: {
    fontFamily: "Roboto-Bold",
    fontSize: 18,
  },
  itemContainer: {
    marginTop: 15,
    alignItems: "center",
    flexDirection: "row",
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
    borderRadius: 10,
  },
  textButton:{
    fontSize: 18,
    fontFamily: "Roboto-Bold",
  },
  usernameText:{
    fontSize: 20,
    fontFamily: "Roboto-Bold",
  },
  sameFriendText:{
    fontSize: 16,
    color: color.GrayText,
    paddingBottom: 5
  }
});

const headerStyles = StyleSheet.create({
  listHeaderContainer: {
    flexDirection: "column",
    paddingVertical: 8,
    marginBottom: 5,
    backgroundColor: color.White,
  },
  headerItem1: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerItem2: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 16,
    borderBottomColor: color.BorderTinyButtonGray,
    borderBottomWidth: 1,
    marginBottom: 8,
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
  textButton: {
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.IconBackgroundGray,
    borderRadius: 25,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  watchAllTextButton: {
    height: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    fontColor: color.Black,
  },
  textWatchAll: {
    fontSize: 20,
    color: color.MainBlue,
  },
  subText1:{
    fontSize: 22,
    fontFamily: "Roboto-Bold",
  }
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
  const [suggestFriendModal, setSuggestFriendModal] = useState(false)
  const [allFriendModal, setAllFriendModal] = useState(false)
  return(
  <>
    {index === 0 && (
      <>
      <SuggestFriendScreen modalVisible={suggestFriendModal} setModalVisible={setSuggestFriendModal}/>
      <AllFriendScreen modalVisible={allFriendModal} setModalVisible={setAllFriendModal}/>

        <View style={headerStyles.headerItem2}>
          <TouchableOpacity style={headerStyles.textButton} onPress={() => setSuggestFriendModal(true)}>
            <Text style={headerStyles.text }>Gợi ý</Text>
          </TouchableOpacity>

          <TouchableOpacity style={headerStyles.textButton} onPress={() => setAllFriendModal(true)}>
            <Text style={headerStyles.text}>Tất cả bạn bè</Text>
          </TouchableOpacity>
        </View>
        <View style={headerStyles.headerItem1}>
          <View style={{ flexDirection: "row" }}>
            <Text style={headerStyles.subText1}>Lời mời kết bạn </Text>
            <Text style={[headerStyles.subText1, { color: color.Red }]}>9</Text>
          </View>

          {/* <TouchableOpacity style={headerStyles.watchAllTextButton}>
            <Text style={headerStyles.textWatchAll}>Xem tất cả</Text>
          </TouchableOpacity> */}
        </View>
      </>
    )}

    <View style={styles.itemContainer}>
      <View style={styles.avatar}>
        <Avatar width={90} height={90} source={avatar} />
      </View>

      <View style={styles.subItemContainer}>
        <View style={{alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={styles.usernameText}>{username}</Text>
          <Text style={{color: color.TextGray}}>{created}</Text>
      </View>

      {parseInt(same_friends) > 0 && (
        <Text style={styles.sameFriendText}>{same_friends} bạn chung</Text>
      )}

        <View style={{ flexDirection: "row" , justifyContent:"space-between"}}>
          <TouchableOpacity style={{flex:1, marginRight: 10}}>
            <View style={[styles.button,{backgroundColor: color.MainBlue}]}>
              <Text style={[styles.textButton,{color:color.White}]}>Chấp nhận</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1,}}>
            <View style={[styles.button,{backgroundColor: color.IconBackgroundGray}]}>
              <Text style={styles.textButton}>Xóa</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </>
)};
