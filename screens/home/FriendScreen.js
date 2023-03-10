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
import { getRequestedFriend, setAcceptFriend } from "../../redux/features/friend/requestedFriendSlice";
import TimeToString from "../../utils/TimeToString";
import { BlockModal } from "../../components/home-screen/BlockModal";
import { ConfirmModal } from "../../components/home-screen/ConfirmModal";

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
              //     created: "40 ph??t",
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
          <Text style={headerStyles.friendText}>B???n b??</Text>
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
            <Text style={headerStyles.text}>G???i ??</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={headerStyles.textButton}
            onPress={() => setAllFriendModal(true)}
          >
            <Text style={headerStyles.text}>T???t c??? b???n b??</Text>
          </TouchableOpacity>
        </View>
        <View style={headerStyles.headerItem1}>
          <View style={{ flexDirection: "row" }}>
            <Text style={headerStyles.subText1}>L???i m???i k???t b???n </Text>
            <Text style={[headerStyles.subText1, { color: color.Red }]}>
              {total}
            </Text>
          </View>

          {/* <TouchableOpacity style={headerStyles.watchAllTextButton}>
  <Text style={headerStyles.textWatchAll}>Xem t???t c???</Text>
</TouchableOpacity> */}
        </View>
      </>
    </>
  );
};

const renderItem = ({ item }) => (
  <Item
    avatar={item.avatar}
    user_id={item.user_id}
    username={item.username}
    same_friends={item.same_friends}
    created={item.created}
  />
);

const Item = ({ avatar, id, username, same_friends, created, user_id }) => {
  const [friendState, setFriendState] = useState(0);
  const [blockModalVisible, setBlockModalVisible] = useState(false);

  const [acceptModalVisible, setAcceptModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  const [acceptBool, setAcceptBool] = useState(false);
  const [cancelBool, setCancelBool] = useState(false);

  const token = useSelector((state) => state.auth.data.token);
  const dispatch = useDispatch()

  const onOptionPress = () => {
    setBlockModalVisible(true);
  };

  const onAcceptPress = () => {
    setAcceptModalVisible(true)
  };

  const onCancelPress = () => {
    setCancelModalVisible(true)
  };

  useEffect(() => {
    if(acceptBool){
      dispatch(setAcceptFriend({token:token, user_id: id, is_accept: 1}))
      setFriendState(1)
    }else if(cancelBool){
      dispatch(setAcceptFriend({token:token, user_id: id, is_accept: 0}))
      setFriendState(2)
    }
  },[acceptBool, cancelBool])

  return (
    <>
      <BlockModal
        modalVisible={blockModalVisible}
        setModalVisible={setBlockModalVisible}
        username={username}
        user_id={user_id}
      />
      <ConfirmModal
        modalVisible={acceptModalVisible}
        setModalVisible={setAcceptModalVisible}
        header="X??c nh???n"
        body="Ch???p nh???n l???i m???i k???t b???n"
        returnBool={setAcceptBool}
      />
      <ConfirmModal
        modalVisible={cancelModalVisible}
        setModalVisible={setCancelModalVisible}
        header="X??c nh???n"
        body="X??a l???i m???i k???t b???n"
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
            {friendState === 0 && (
              <Text style={{ color: color.TextGray }}>
                {TimeToString(created)}
              </Text>
            )}
          </View>


          {parseInt(same_friends) > 0 && friendState === 0 ? (
            <Text style={styles.sameFriendText}>{same_friends} b???n chung</Text>
          ) : (
            <View style={{ height: 10 }} />
          )}

          {friendState === 0 && (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={{ flex: 1, marginRight: 10 }}
                onPress={onAcceptPress}
              >
                <View
                  style={[styles.button, { backgroundColor: color.MainBlue }]}
                >
                  <Text style={[styles.textButton, { color: color.White }]}>
                    Ch???p nh???n
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
                  <Text style={styles.textButton}>X??a</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {friendState === 1 && (
            <Text style={styles.sameFriendText}>???? ch???p nh???n l???i m???i</Text>
          )}
          {friendState === 2 && (
            <Text style={styles.sameFriendText}>???? h???y l???i m???i</Text>
          )}
        </View>

        {friendState === 2 && (
          <TouchableOpacity
            style={{ ...headerStyles.iconButton, backgroundColor: color.White }}
            onPress={onOptionPress}
          >
            <OptionIcon />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};
