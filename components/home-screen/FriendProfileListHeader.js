import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from "./Avatar";
import color from "../../constants/color/color";
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { get_user_friends, set_request_friend } from "../../api/friendApi";
import { useNavigation } from "@react-navigation/native";
import { EvilIcons } from '@expo/vector-icons';

const DEVICE_HEIGHT = Dimensions.get("screen").height;
const DEVICE_WIDTH = Dimensions.get("screen").width;

export const FriendProfileListHeader = ({linkAvatar, username,cover_image, is_friend, id}) => {
  const token = useSelector((state)=> state.auth.data.token);
  const [mutualFriend, setMutualFriend] = useState(0);
  const [friends, setFriends] = useState([]);
  const navigation = useNavigation();
  const [addFriend, setAddFriend] = useState(true);

  useEffect(()=>{
    get_user_friends(token,id,0,999)
    .then((res)=> {
      setMutualFriend(res.data.data.total);
      setFriends(res.data.data.friends);
    })
    .catch(err => console.log(err));
  },[]);

  const handlePressOnFriendAvatar = (id) => {
    navigation.navigate("FriendProfile", {id});
  }

  const handlePressAddFriend = () => {
    set_request_friend(token, id);
    setAddFriend(prev => !prev)
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.backgroundImageView}>
        <ImageBackground
          style={styles.backgroundImage}
          resizeMode="cover"
          source={
            cover_image !== null && cover_image !== undefined
              ? { uri: cover_image }
              : null
          }
        />
        <TouchableOpacity style={styles.avatarView} activeOpacity={0.8}>
          <Avatar
            width={DEVICE_HEIGHT * 0.23}
            height={DEVICE_HEIGHT * 0.23}
            source={linkAvatar}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.infomation}>
        <Text style={styles.textName}>{username}</Text>
        <View style={styles.nameButtonView}>
          {is_friend === "false" ? (
            <TouchableHighlight
              style={[
                styles.nameButton,
                { backgroundColor: color.WhiteTextMainBlue },
              ]}
              underlayColor={color.MainBlue}
              onPress={handlePressAddFriend}
            >
              <View style={styles.buttonText}>
                {addFriend ? <AddFriendIcon /> : <FriendRequestSentIcon/>}
                <Text style={[{ color: color.White }, styles.text]}>
                  {addFriend ? "Add Friend" : "Request Sent"}
                </Text>
              </View>
            </TouchableHighlight>
          ) : (
            <TouchableHighlight
              style={styles.nameButton}
              underlayColor={color.TouchableHighlightBorderWhite}
              onPress={() => {}}
            >
              <View style={styles.buttonText}>
                <FriendCheckIcon />
                <Text style={styles.text}>Friends</Text>
              </View>
            </TouchableHighlight>
          )}
          <View style={styles.nameButtonBr} />
          <TouchableHighlight
            style={styles.nameButton}
            underlayColor={color.TouchableHighlightBorderWhite}
            onPress={() => {}}
          >
            <View style={styles.buttonText}>
              <MessageIcon />
              <Text style={styles.text}>Message</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.nameButtonBr} />
          <TouchableHighlight
            style={styles.moreButton}
            underlayColor={color.TouchableHighlightBorderWhite}
            onPress={() => {}}
          >
            <View style={styles.buttonText}>
              <MoreIcon />
            </View>
          </TouchableHighlight>
        </View>
        <Br />
        <View style={styles.about}>
          <View style={styles.infomationRow}>
            <View style={styles.aboutIconView}>
              <HomeIcon />
            </View>
            <View style={styles.aboutTextView}>
              <Text style={styles.normalText}>Lives in </Text>
              <Text style={styles.textBold}>Hòa Bình, Hòa Bình, Vietnam</Text>
            </View>
          </View>
          <View style={styles.infomationRow}>
            <View style={styles.aboutIconView}>
              <LocationIcon />
            </View>
            <View style={styles.aboutTextView}>
              <Text style={styles.normalText}>From </Text>
              <Text style={styles.textBold}>Lương Sơn, Hòa Bình, Vietnam</Text>
            </View>
          </View>
          <View style={styles.infomationRow}>
            <View style={styles.aboutIconView}>
              <HeartIcon />
            </View>
            <View style={styles.aboutTextView}>
              <Text style={styles.normalText}>Single </Text>
            </View>
          </View>
          <View style={styles.infomationRow}>
            <View style={styles.aboutIconView}>
              <TimeIcon />
            </View>
            <View style={styles.aboutTextView}>
              <Text style={styles.normalText}>Joined March 2013 </Text>
            </View>
          </View>
          <View style={styles.infomationRow}>
            <View style={styles.aboutIconView}>
              <TickIcon />
            </View>
            <View style={styles.aboutTextView}>
              <Text style={styles.normalText}>Follow by 248 people </Text>
            </View>
          </View>
          <View style={styles.infomationRow}>
            <View style={styles.aboutIconView}>
              <MoreIconSm />
            </View>
            <View style={styles.aboutTextView}>
              <Text style={styles.normalText}>{`See ${
                username !== null &&
                username !== undefined &&
                username.split(" ")[0] + "'s"
              } About info`}</Text>
            </View>
          </View>
        </View>
        <View style={styles.featureCollection}>
          <View style={styles.featureRow}>
            <View style={styles.collection}>
              <TouchableHighlight
                style={styles.newCollection}
                underlayColor={color.TouchableHighlightBorderWhite}
                onPress={() => {}}
              >
                <View>
                  <PlusIconSm />
                </View>
              </TouchableHighlight>
              <Text style={styles.collectionText}>New</Text>
            </View>
            <View style={styles.collection}>
              <TouchableHighlight
                style={styles.newCollection}
                underlayColor={color.TouchableHighlightBorderWhite}
                onPress={() => {}}
              >
                <ImageBackground
                  source={{
                    uri: "https://i.pinimg.com/550x/1f/75/1c/1f751cd55f2853a18c2e4a23e01e86a0.jpg",
                  }}
                  style={styles.image}
                  resizeMode={"cover"}
                  imageStyle={styles.imageStyle}
                />
              </TouchableHighlight>
              <Text style={styles.collectionText}>Featured</Text>
            </View>
            <View style={styles.collection}>
              <TouchableHighlight
                style={styles.newCollection}
                underlayColor={color.TouchableHighlightBorderWhite}
                onPress={() => {}}
              >
                <ImageBackground
                  source={{
                    uri: "https://i.pinimg.com/564x/b1/31/0a/b1310a301398dc8c87f59e5dc9b37f40.jpg",
                  }}
                  style={styles.image}
                  resizeMode={"cover"}
                  imageStyle={styles.imageStyle}
                />
              </TouchableHighlight>
              <Text style={styles.collectionText}>1</Text>
            </View>
            <View style={styles.collection}>
              <TouchableHighlight
                style={styles.newCollection}
                underlayColor={color.TouchableHighlightBorderWhite}
                onPress={() => {}}
              >
                <ImageBackground
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
                  }}
                  style={styles.image}
                  resizeMode={"cover"}
                  imageStyle={styles.imageStyle}
                />
              </TouchableHighlight>
              <Text style={styles.collectionText}>2</Text>
            </View>
          </View>
        </View>
      </View>
      <Br />
      <View style={styles.friend}>
        <View style={styles.friendTopView}>
          <View style={styles.friendSubView}>
            <Text style={styles.textHeader}>Friends</Text>
            <Text style={styles.subText}>{mutualFriend} Friends</Text>
          </View>
          <View
            style={[styles.friendSubView, { alignItems: "flex-end" }]}
          ></View>
        </View>
        <View style={styles.friendShow}>
          <View style={styles.friendRow}>
            {friends.length > 0 ? (
              <View style={styles.friendItem}>
                <TouchableHighlight
                  style={styles.friendImage}
                  underlayColor={color.TouchableHighlightBorderWhite}
                  onPress={() => handlePressOnFriendAvatar(friends[0]["id"])}
                >
                  <ImageBackground
                    source={
                      friends[0].hasOwnProperty("avatar")
                        ? { uri: friends[0]["avatar"] }
                        : require("../../assets/default-avatar.jpg")
                    }
                    style={styles.image}
                    imageStyle={styles.imageStyle}
                    resizeMode={"cover"}
                  />
                </TouchableHighlight>
                <Text style={styles.friendName}>
                  {friends[0].hasOwnProperty("username") &&
                    friends[0]["username"]}
                </Text>
              </View>
            ) : (
              <View style={styles.friendItem} />
            )}
            {friends.length > 1 ? (
              <View style={styles.friendItem}>
                <TouchableHighlight
                  style={styles.friendImage}
                  underlayColor={color.TouchableHighlightBorderWhite}
                  onPress={() => handlePressOnFriendAvatar(friends[1]["id"])}
                >
                  <ImageBackground
                    source={
                      friends[1].hasOwnProperty("avatar")
                        ? { uri: friends[1]["avatar"] }
                        : require("../../assets/default-avatar.jpg")
                    }
                    style={styles.image}
                    imageStyle={styles.imageStyle}
                    resizeMode={"cover"}
                  />
                </TouchableHighlight>
                <Text style={styles.friendName}>
                  {friends[1].hasOwnProperty("username") &&
                    friends[1]["username"]}
                </Text>
              </View>
            ) : (
              <View style={styles.friendItem} />
            )}
            {friends.length > 2 ? (
              <View style={styles.friendItem}>
                <TouchableHighlight
                  style={styles.friendImage}
                  underlayColor={color.TouchableHighlightBorderWhite}
                  onPress={() => handlePressOnFriendAvatar(friends[2]["id"])}
                >
                  <ImageBackground
                    source={
                      friends[2].hasOwnProperty("avatar")
                        ? { uri: friends[2]["avatar"] }
                        : require("../../assets/default-avatar.jpg")
                    }
                    style={styles.image}
                    imageStyle={styles.imageStyle}
                    resizeMode={"cover"}
                  />
                </TouchableHighlight>
                <Text style={styles.friendName}>
                  {friends[2].hasOwnProperty("username") &&
                    friends[2]["username"]}
                </Text>
              </View>
            ) : (
              <View style={styles.friendItem} />
            )}
          </View>
          <View style={styles.friendRow}>
            {friends.length > 3 ? (
              <View style={styles.friendItem}>
                <TouchableHighlight
                  style={styles.friendImage}
                  underlayColor={color.TouchableHighlightBorderWhite}
                  onPress={() => handlePressOnFriendAvatar(friends[3]["id"])}
                >
                  <ImageBackground
                    source={
                      friends[3].hasOwnProperty("avatar")
                        ? { uri: friends[3]["avatar"] }
                        : require("../../assets/default-avatar.jpg")
                    }
                    style={styles.image}
                    imageStyle={styles.imageStyle}
                    resizeMode={"cover"}
                  />
                </TouchableHighlight>
                <Text style={styles.friendName}>
                  {friends[3].hasOwnProperty("username") &&
                    friends[3]["username"]}
                </Text>
              </View>
            ) : (
              <View style={styles.friendItem} />
            )}
            {friends.length > 4 ? (
              <View style={styles.friendItem}>
                <TouchableHighlight
                  style={styles.friendImage}
                  underlayColor={color.TouchableHighlightBorderWhite}
                  onPress={() => handlePressOnFriendAvatar(friends[4]["id"])}
                >
                  <ImageBackground
                    source={
                      friends[4].hasOwnProperty("avatar")
                        ? { uri: friends[4]["avatar"] }
                        : require("../../assets/default-avatar.jpg")
                    }
                    style={styles.image}
                    imageStyle={styles.imageStyle}
                    resizeMode={"cover"}
                  />
                </TouchableHighlight>
                <Text style={styles.friendName}>
                  {friends[4].hasOwnProperty("username") &&
                    friends[4]["username"]}
                </Text>
              </View>
            ) : (
              <View style={styles.friendItem} />
            )}
            {friends.length > 5 ? (
              <View style={styles.friendItem}>
                <TouchableHighlight
                  style={styles.friendImage}
                  underlayColor={color.TouchableHighlightBorderWhite}
                  onPress={() => handlePressOnFriendAvatar(friends[5]["id"])}
                >
                  <ImageBackground
                    source={
                      friends[5].hasOwnProperty("avatar")
                        ? { uri: friends[5]["avatar"] }
                        : require("../../assets/default-avatar.jpg")
                    }
                    style={styles.image}
                    imageStyle={styles.imageStyle}
                    resizeMode={"cover"}
                  />
                </TouchableHighlight>
                <Text style={styles.friendName}>
                  {friends[5].hasOwnProperty("username") &&
                    friends[5]["username"]}
                </Text>
              </View>
            ) : (
              <View style={styles.friendItem} />
            )}
          </View>
          <TouchableHighlight
            style={[
              styles.editButtonXl,
              { backgroundColor: color.MenuBackgroundGray },
            ]}
            underlayColor={color.IconBackgroundGray}
            onPress={() => {}}
          >
            <Text
              style={[styles.editButtonXlText, { color: color.TextTinyGray }]}
            >
              See all friends
            </Text>
          </TouchableHighlight>
        </View>
      </View>
      <DarkBr height={25} />
    </ScrollView>
  );
};

const Br = ({withoutMargin}) => (
  <View
    style={[{
      borderTopWidth: 0.5,
      borderTopColor: color.BorderTopGray,
    }, withoutMargin !== true && {marginVertical: 10}]}
  />
);

const DarkBr = ({height}) => (
  <View
    style={{
      flex: 1,
      height: height,
      backgroundColor: color.DarkGray
    }}
  />
);

const MessageIcon = () => (
    <FontAwesome5 name="facebook-messenger" size={18} color={color.Black} />
);

const MoreIcon = () => (
  <Feather name="more-horizontal" size={24} color="black" />
);
const HomeIcon = () => <FontAwesome name="home" size={30} color={color.IconGray} />;
const LocationIcon = () => (
  <Entypo name="location-pin" size={30} color={color.IconGray} />
);
const HeartIcon = () => (
  <AntDesign name="heart" size={20} color={color.IconGray} />
);
const TimeIcon = () => <Ionicons name="time-sharp" size={24} color={color.IconGray} />;
const TickIcon = () => (
  <MaterialCommunityIcons
    name="sticker-check"
    size={20}
    color={color.IconGray}
  />
);
const MoreIconSm = () => (
  <Feather name="more-horizontal" size={20} color={color.IconGray} />
);

const AddFriendIcon = () => (
    <FontAwesome5 name="user-plus" size={18} color={color.White} />
);

const PlusIconSm = () => (
    <AntDesign name="plus" size={18} color={color.IconGray} />
  );

const FriendCheckIcon = () => (
  <FontAwesome5 name="user-check" size={18} color={color.Black} />
);

const FriendRequestSentIcon = () => (
  <EvilIcons name="check" size={18} color={color.White} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.White,
  },
  backgroundImageView: {
    height: DEVICE_HEIGHT * 0.28,
    flex: 1,
  },
  backgroundImage: {
    backgroundColor: color.BackgroundGray,
    flex: 1,
  },
  avatarView: {
    position: "absolute",
    backgroundColor: color.White,
    bottom: -DEVICE_HEIGHT * 0.06,
    left: 5,
    width: DEVICE_HEIGHT * 0.24,
    height: DEVICE_HEIGHT * 0.24,
    borderRadius: DEVICE_HEIGHT * 0.12,
    borderColor: "orange",
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  infomation: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textName: {
    marginTop: DEVICE_HEIGHT * 0.06,
    fontFamily: "Roboto-Bold",
    fontSize: 24,
  },
  nameButtonView: {
    flexDirection: "row",
    flex: 1,
    marginVertical: 10,
  },
  nameButton: {
    flex: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 6,
    backgroundColor: color.IconBackgroundGray,
    height: 36,
  },
  moreButton: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 6,
    backgroundColor: color.IconBackgroundGray,
    height: 36,
  },
  buttonText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nameButtonBr: {
    flex: 1,
  },
  text: {
    marginLeft: 5,
    fontFamily: "Roboto-Medium",
  },
  about: {
    flexDirection: "column",
    flex: 1,
  },
  infomationRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  aboutIconView: {
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
  },
  aboutTextView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  textBold: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
  },
  normalText: {
    fontSize: 16,
  },
  featureCollection: {
    flexDirection: "column",
    flex: 1,
    marginVertical: 5,
  },
  featureRow: {
    flex: 1,
    flexDirection: "row",
  },
  collection: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  newCollection: {
    height: DEVICE_WIDTH * 0.35,
    width: "80%",
    backgroundColor: color.Gray95,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  collectionText: {
    fontFamily: "Roboto-Medium"
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    borderRadius: 12,
  },
  editButtonXl: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 4,
    backgroundColor: color.MainBlueBlur,
    marginVertical: 10,
  },
  editButtonXlText: {
    color: color.MainBlue,
    fontFamily: "Roboto-Bold"
  },
  friend: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  friendTopView: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 5,
  },
  friendSubView: {
    flex: 1,
  },
  textHeader: {
    fontFamily: "Roboto-Bold",
    fontSize: 22,
  },
  subText: {
    marginTop: 5,
    color: color.TextGray,
    fontSize: 16
  },
  friendShow: {
    flexDirection: "column",
    flex: 1,
  },
  friendRow: {
    flexDirection: "row",
    marginVertical: 10
  },
  friendItem: {
    flex: 1,
    alignItems: "center"
  },
  friendImage: {
    width: DEVICE_WIDTH * 0.29,
    height: DEVICE_WIDTH * 0.29,
    borderRadius: 12
  },
  friendName: {
    marginTop: 5,
    fontFamily: "Roboto-Medium"
  },
});