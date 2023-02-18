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
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { Avatar } from "../../components/home-screen/Avatar";
import { SuggestFriendScreen } from "./FriendSuggestScreen";
import { AllFriendScreen } from "./FriendAllScreen";
import { getRequestedFriend } from "../../redux/features/friend/requestedFriendSlice";
import TimeToString from "../../utils/TimeToString";
import { BlockModal } from "../../components/home-screen/BlockModal";

export const FriendScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [index, setIndex] = useState(0);
  const token = useSelector((state) => state.auth.data.token);
  const dispatch = useDispatch();
  const requestedFriendData = useSelector(
    (state) => state.requestedFriend.data.request
  );

  useEffect(() => {
    dispatch(getRequestedFriend({ token, index }));
  }, [token]);

  return (
    <View style={styles.container}>
      <ListHeaderComponent />

      {requestedFriendData.length > 0 ? (
        <FlatList
          refreshing={refreshing}
          showsVerticalScrollIndicator={false}
          data={requestedFriendData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          // stickyHeaderHiddenOnScroll
          // stickyHeaderIndices={[0]}
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
              // setFriendRequests((prev) => [
              //   ...prev,
              //   {
              //     id: prev.length,
              //     username: "Minh Chu",
              //     avatar:
              //       "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
              //     same_friends: "144",
              //     created: "40 phút",
              //   },
              // ]);
              setRefreshing(false);
            }, 1000);
          }}
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Don't have any friend requests</Text>
        </View>
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
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    fontColor: color.Black,
  },
  textWatchAll: {
    fontSize: 20,
    color: color.MainBlue,
  },
  subText1: {
    fontSize: 22,
    fontFamily: "Roboto-Bold",
  },
});

const SearchIcon = () => <Feather name="search" size={22} color="black" />;
const OptionIcon = () => (
  <SimpleLineIcons name="options" size={22} color="black" />
);

const ListHeaderComponent = () => {
  const [suggestFriendModal, setSuggestFriendModal] = useState(false);
  const [allFriendModal, setAllFriendModal] = useState(false);
  const total = useSelector((state) => state.requestedFriend.data.total);
  return (
    <>
      <View style={headerStyles.listHeaderContainer}>
        <View style={headerStyles.headerItem1}>
          <Text style={headerStyles.friendText}>Bạn bè</Text>
          <TouchableOpacity style={headerStyles.iconButton}>
            <SearchIcon />
          </TouchableOpacity>
        </View>
      </View>

      <>
        <SuggestFriendScreen
          modalVisible={suggestFriendModal}
          setModalVisible={setSuggestFriendModal}
        />
        <AllFriendScreen
          modalVisible={allFriendModal}
          setModalVisible={setAllFriendModal}
        />

        <View style={headerStyles.headerItem2}>
          <TouchableOpacity
            style={headerStyles.textButton}
            onPress={() => setSuggestFriendModal(true)}
          >
            <Text style={headerStyles.text}>Gợi ý</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={headerStyles.textButton}
            onPress={() => setAllFriendModal(true)}
          >
            <Text style={headerStyles.text}>Tất cả bạn bè</Text>
          </TouchableOpacity>
        </View>
        <View style={headerStyles.headerItem1}>
          <View style={{ flexDirection: "row" }}>
            <Text style={headerStyles.subText1}>Lời mời kết bạn </Text>
            <Text style={[headerStyles.subText1, { color: color.Red }]}>
              {total}
            </Text>
          </View>

          {/* <TouchableOpacity style={headerStyles.watchAllTextButton}>
  <Text style={headerStyles.textWatchAll}>Xem tất cả</Text>
</TouchableOpacity> */}
        </View>
      </>
    </>
  );
};

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
  const [friendState, setFriendState] = useState(0);
  const [blockModalVisible, setBlockModalVisible] = useState(false)

  const onOptionPress = () => {
    setBlockModalVisible(true)
  };

  const onAcceptPress = () => {
    setFriendState(1)
  };

  const onCancelPress = () => {
    setFriendState(2)
  };

  return (
    <>
    <BlockModal
      modalVisible = {blockModalVisible}
      setModalVisible = {setBlockModalVisible}
      username = {username}
    />
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
            {friendState === 0 && (
              <Text style={{ color: color.TextGray }}>
                {TimeToString(created)}
              </Text>
            )}
          </View>

          {parseInt(same_friends) > 0 && friendState === 0 ? (
            <Text style={styles.sameFriendText}>{same_friends} bạn chung</Text>
          ) : (
            <View style={{ height: 10 }} />
          )}

          {friendState === 0 && (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity style={{ flex: 1, marginRight: 10 }} onPress={onAcceptPress}>
                <View
                  style={[styles.button, { backgroundColor: color.MainBlue }]}
                >
                  <Text style={[styles.textButton, { color: color.White }]}>
                    Chấp nhận
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1 }} onPress={onCancelPress}>
                <View
                  style={[
                    styles.button,
                    { backgroundColor: color.IconBackgroundGray },
                  ]}
                >
                  <Text style={styles.textButton}>Xóa</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {friendState === 1 && (
            <Text style={styles.sameFriendText}>Đã chấp nhận lời mời</Text>
          )}
          {friendState === 2 && (
            <Text style={styles.sameFriendText}>Đã hủy lời mời</Text>
          )}
        </View>

        {friendState === 2 && (
          <TouchableOpacity style={{...headerStyles.iconButton, backgroundColor: color.White}} onPress={onOptionPress}>
            <OptionIcon />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

