import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "./Avatar";
import color from "../../constants/color/color";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { setAvatar, setCoverImage} from "../../redux/features/user/userSlice";
import { get_user_friends } from "../../api/friendApi";
import { useEffect, useState } from "react";

const DEVICE_HEIGHT = Dimensions.get("screen").height;
const DEVICE_WIDTH = Dimensions.get("screen").width;

export const MyProfileListHeader = () => {
  const navigation = useNavigation();
  const linkAvatar = useSelector((state) => state.user.data.avatar);
  const username = useSelector((state) => state.user.data.username);
  const token = useSelector((state) => state.auth.data.token);
  const cover_image = useSelector((state) => state.user.data.cover_image);
  const userId = useSelector((state) => state.auth.data.id);
  const [total, setToltal] = useState(0);
  const [friends, setFriends] = useState([]);

  useEffect(()=> {
    get_user_friends(token,userId,0,999)
    .then((res) => {
      setToltal(res.data.data.total);
      setFriends(res.data.data.friends);
    })
    .catch(err => console.log(err));
  }, [token]);

  const dispatch = useDispatch();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false,
      allowsEditing: true,
    });
    if (!result.cancelled) {
      dispatch(setAvatar({token, uri: result.uri}))
    }
  }

  const pickCoverImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [16, 9],
      quality: 1,
      allowsMultipleSelection: false,
      allowsEditing: true,
    });
    if (!result.cancelled) {
      dispatch(setCoverImage({token, uri: result.uri}))
    }
  }

  const handlePressOnFriendAvatar = (id) => {
    navigation.navigate("FriendProfile", {id});
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
        <View style={styles.imageButtonView}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.imageButton,
              { backgroundColor: color.TextMainBlue },
            ]}
          >
            <MakeupIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imageButton}
            activeOpacity={0.6}
            onPress={pickCoverImage}
          >
            <CameraIcon />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.avatarView} activeOpacity={0.8}>
          <Avatar
            width={DEVICE_HEIGHT * 0.23}
            height={DEVICE_HEIGHT * 0.23}
            source={linkAvatar}
          />
          <TouchableOpacity
            style={styles.avatarButtonView}
            activeOpacity={0.6}
            onPress={pickImage}
          >
            <CameraIcon />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View style={styles.infomation}>
        <Text style={styles.textName}>{username}</Text>
        <View style={styles.nameButtonView}>
          <TouchableHighlight
            style={[
              styles.nameButton,
              { backgroundColor: color.WhiteTextMainBlue },
            ]}
            underlayColor={color.MainBlue}
            onPress={() => {}}
          >
            <View style={styles.buttonText}>
              <PlusIcon />
              <Text style={[{ color: color.White }, styles.text]}>
                Add to story
              </Text>
            </View>
          </TouchableHighlight>
          <View style={styles.nameButtonBr} />
          <TouchableHighlight
            style={styles.nameButton}
            underlayColor={color.TouchableHighlightBorderWhite}
            onPress={() => {}}
          >
            <View style={styles.buttonText}>
              <EditIcon />
              <Text style={styles.text}>Edit profile</Text>
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
              <Text style={styles.textBold}>H??a B??nh, H??a B??nh, Vietnam</Text>
            </View>
          </View>
          <View style={styles.infomationRow}>
            <View style={styles.aboutIconView}>
              <LocationIcon />
            </View>
            <View style={styles.aboutTextView}>
              <Text style={styles.normalText}>From </Text>
              <Text style={styles.textBold}>L????ng S??n, H??a B??nh, Vietnam</Text>
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
              <Text style={styles.normalText}>See your About info </Text>
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
        <TouchableHighlight
          style={styles.editButtonXl}
          underlayColor={color.IconBackgroundGray}
          onPress={() => {}}
        >
          <Text style={styles.editButtonXlText}>Edit public details</Text>
        </TouchableHighlight>
      </View>
      <Br />
      <View style={styles.friend}>
        <View style={styles.friendTopView}>
          <View style={styles.friendSubView}>
            <Text style={styles.textHeader}>Friends</Text>
            <Text style={styles.subText}>{total} friends</Text>
          </View>
          <View style={[styles.friendSubView, { alignItems: "flex-end" }]}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Friends")}
            >
              <Text style={[styles.subText, { color: color.MainBlue }]}>
                Find Friends
              </Text>
            </TouchableWithoutFeedback>
          </View>
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
      <View style={styles.post}>
        <View style={styles.postTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.textHeader}>Post</Text>
          </View>
          <View style={styles.postSetting}>
            <TouchableHighlight
              style={styles.postSettingButton}
              onPress={() => {}}
              underlayColor={color.TouchableHighlightBorderWhite}
            >
              <SwitchSettingIcon />
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.postSettingButton}
              onPress={() => {}}
              underlayColor={color.TouchableHighlightBorderWhite}
            >
              <SettingIcon />
            </TouchableHighlight>
          </View>
        </View>
        <TouchableHighlight
          underlayColor={color.TouchableHighlightBorderWhite}
          onPress={() => {
            navigation.navigate("CreatePost");
          }}
        >
          <View style={styles.postBody}>
            <View style={styles.avatar}>
              <Avatar source={linkAvatar} width={46} height={46} />
            </View>
            <View style={styles.postBodyText}>
              <Text style={styles.postBodyTextStyle}>
                What is on your mind?
              </Text>
            </View>
            <View style={styles.postImageButton}>
              <TouchableHighlight
                style={styles.circleButton}
                underlayColor={color.TouchableHighlightBorderWhite}
                onPress={() => {}}
              >
                <ImageIcon />
              </TouchableHighlight>
            </View>
          </View>
        </TouchableHighlight>
        <Br withoutMargin={true} />
        <View style={styles.postFooter}>
          <TouchableHighlight
            style={styles.postFooterTouchable}
            underlayColor={color.TouchableHighlightBorderWhite}
            onPress={() => {}}
          >
            <View style={styles.postFooterButton}>
              <ReelIcon />
              <Text style={styles.postFooterButtonText}>Reel</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.postFooterTouchable}
            underlayColor={color.TouchableHighlightBorderWhite}
            onPress={() => {}}
          >
            <View style={styles.postFooterButton}>
              <LiveIcon />
              <Text style={styles.postFooterButtonText}>Live</Text>
            </View>
          </TouchableHighlight>
        </View>
        <DarkBr height={15} />
        <View style={styles.SomeButtonView}>
          <TouchableHighlight
            style={styles.SomeButtonTouchable}
            underlayColor={color.TouchableHighlightBorderWhite}
            onPress={() => {}}
          >
            <View style={styles.buttonTextView}>
              <Photo />
              <Text style={styles.someButtonText}>Photos</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.SomeButtonTouchable}
            underlayColor={color.TouchableHighlightBorderWhite}
            onPress={() => {}}
          >
            <View style={styles.buttonTextView}>
              <AvatarIcon />
              <Text style={styles.someButtonText}>Avatars</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.SomeButtonTouchable}
            underlayColor={color.TouchableHighlightBorderWhite}
            onPress={() => {}}
          >
            <View style={styles.buttonTextView}>
              <MusicIcon />
              <Text style={styles.someButtonText}>Musics</Text>
            </View>
          </TouchableHighlight>
        </View>
        <DarkBr height={15} />
      </View>
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

const CameraIcon = () => <Fontisto name="camera" size={16} color={color.Black} />;
const MakeupIcon = () => <Foundation name="torso-female" size={24} color={color.White} />;
const PlusIcon = () => (
  <View
    style={{
      width: 20,
      height: 20,
      backgroundColor: color.White,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <AntDesign name="plus" size={18} color={color.MainBlue} />
  </View>
);
const EditIcon = () => <MaterialIcons name="edit" size={24} color="black" />;
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
const PlusIconSm = () => (
  <AntDesign name="plus" size={18} color={color.IconGray} />
);
const SwitchSettingIcon = () => (
  <MaterialCommunityIcons
    name="electric-switch-closed"
    size={20}
    color="black"
  />
);
const SettingIcon = () => (
  <Ionicons name="ios-settings-sharp" size={20} color="black" />
);
const ImageIcon = () => <Feather name="image" size={24} color={color.greenIcon} />;
const LiveIcon = () => <Entypo name="video-camera" size={24} color={color.Red} />
const ReelIcon = () => <MaterialCommunityIcons name="clipboard-play" size={24} color={color.Red} />;
const Photo = () => <Feather name="image" size={20} color={color.Black} />;
const MusicIcon = () => <FontAwesome name="music" size={20} color={color.Black} />;
const AvatarIcon = () => <MaterialCommunityIcons name="face-woman-profile" size={20} color={color.Black} />;
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
  imageButtonView: {
    position: "absolute",
    zIndex: 100,
    right: 0,
    bottom: 0,
    paddingVertical: 8,
  },
  imageButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: color.Gray95,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 3,
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
  avatarButtonView: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: color.BackgroundGray,
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
  post: {
    flex: 1,
  },
  postTop: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10
  },
  postSetting: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  postSettingButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.Gray95,
    width: 46,
    height: 36,
    borderRadius: 6,
    marginLeft: 5,
  },
  postBody: {
    height: 60,
    flexDirection: "row",
  },
  avatar: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  postBodyText: {
    flex: 5,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  postImageButton: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  postBodyTextStyle: {
    fontSize: 16,
  },
  circleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  postFooter: {
    height: 60,
    backgroundColor: color.ProfilePostFooterBackgroundGray,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  postFooterButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 40,
    backgroundColor: color.White,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: color.BorderProfilePostFooterButton
  },
  postFooterButtonText: {
    marginLeft: 5,
    fontFamily: "Roboto-Medium"
  },
  postFooterTouchable: {
    borderRadius: 20,
    marginLeft: 15,
  },
  SomeButtonView: {
    flex: 1,
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  buttonTextView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 36,
    borderRadius: 24,
    backgroundColor: color.IconBackgroundGray
  },
  SomeButtonTouchable: {
    borderRadius: 24,
    marginLeft: 15
  },
  someButtonText: {
    marginLeft: 5,
    fontFamily: "Roboto-Medium",
    fontSize: 14,
  }
});