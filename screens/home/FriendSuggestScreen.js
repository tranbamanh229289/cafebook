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
import { useDispatch, useSelector } from "react-redux";
import { getSuggestedFriend } from "../../redux/features/friend/suggestedSlice";
import { ConfirmModal } from "../../components/home-screen/ConfirmModal";
import { setRequestFriend } from "../../redux/features/friend/requestedFriendSlice";

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

  const token = useSelector((state) => state.auth.data.token);
  const dispatch = useDispatch();
  const allFriendData = useSelector(
    (state) => state.suggestedFriend.data.list_users
  );

  useEffect(() => {
    dispatch(getSuggestedFriend({ token: token, index: 0 }));
  }, [token]);

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
        data={allFriendData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.user_id}
        stickyHeaderIndices={[0]}
        overScrollMode="never"
      />
    </Modal>
  );
};

const renderItem = ({ item, index }) => (
  <Item
    avatar={item.avatar}
    id={item.user_id}
    index={index}
    username={item.username}
    same_friends={item.same_friends}
  />
);

const Item = ({ avatar, index, username, same_friends, id }) => {
  const [friendState, setFriendState] = useState(0);
  const dispatch =  useDispatch()
  const token = useSelector((state) => state.auth.data.token);

  const [acceptModalVisible, setAcceptModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  const [acceptBool, setAcceptBool] = useState(false);
  const [cancelBool, setCancelBool] = useState(false);

  const onAcceptPress = () => {
    setAcceptModalVisible(true);
  };

  const onCancelPress = () => {
    setCancelModalVisible(true);
  };

  const onDenyPress = () => {
    setAcceptBool(false)
    setCancelBool(false)
    setFriendState(4)
  }

  useEffect(() => {
    if(acceptBool){
      dispatch(setRequestFriend({token: token, user_id: id}))
      setFriendState(1)
    }else if(cancelBool){
      setFriendState(2)
    }
  },[acceptBool, cancelBool])

  return (
    <>
      {index === 0 && (
        <Text style={styles.subText1}>Những người bạn có thể biết</Text>
      )}

      <ConfirmModal
        modalVisible={acceptModalVisible}
        setModalVisible={setAcceptModalVisible}
        header="Xác nhận"
        body="Thêm bạn bè"
        returnBool={setAcceptBool}
      />
      <ConfirmModal
        modalVisible={cancelModalVisible}
        setModalVisible={setCancelModalVisible}
        header="Xác nhận"
        body="Gỡ người này"
        returnBool={setCancelBool}
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
          </View>

          {friendState === 0 && (
            <>
              {parseInt(same_friends) > 0 ? (
                <Text style={styles.sameFriendText}>
                  {same_friends} bạn chung
                </Text>
              ) : (
                <View style={{ height: 10 }} />
              )}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{ flex: 1, marginRight: 10 }}
                  onPress={onAcceptPress}
                >
                  <View
                    style={[styles.button, { backgroundColor: color.MainBlue }]}
                  >
                    <Text style={[styles.textButton, { color: color.White }]}>
                      Thêm bạn bè
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
                    <Text style={styles.textButton}>Gỡ</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}

          {friendState === 2 && (
            <Text style={styles.sameFriendText}>Đã gỡ</Text>
          )}

          {friendState === 1 && (
            <>
              <Text style={styles.sameFriendText}>Đã gửi yêu cầu</Text>

              <TouchableOpacity style={{ flex: 1 }} onPress={onDenyPress}>
                <View
                  style={[
                    styles.button,
                    { backgroundColor: color.IconBackgroundGray },
                  ]}
                >
                  <Text style={styles.textButton}>Hủy</Text>
                </View>
              </TouchableOpacity>
            </>
          )}

          {friendState === 4 && (
            <>
              <Text style={styles.sameFriendText}>Đã hủy yêu cầu</Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{ flex: 1, marginRight: 10 }}
                  onPress={onAcceptPress}
                >
                  <View
                    style={[styles.button, { backgroundColor: color.MainBlue }]}
                  >
                    <Text style={[styles.textButton, { color: color.White }]}>
                      Thêm bạn bè
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
                    <Text style={styles.textButton}>Gỡ</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </>
  );
};

const SearchIcon = () => <Feather name="search" size={22} color="black" />;

const ListHeaderComponent = ({ setModalVisible }) => (
  <>
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

    {/* <Text style={styles.subText1}>Những người bạn có thể biết</Text> */}
  </>
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
