import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
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

const DEVICE_HEIGHT = Dimensions.get("screen").height;
const DEVICE_WIDTH = Dimensions.get("screen").width;

export const MyProfileListHeader = ({data}) => {
  console.log(data)
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.backgroundImageView}>
        <ImageBackground
          style={styles.backgroundImage}
          resizeMode="cover"
          source={{
            uri: "https://i.pinimg.com/originals/29/21/61/292161866ea60cb8995d44aaba1ec84a.jpg",
          }}
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
          <TouchableOpacity style={styles.imageButton} activeOpacity={0.6}>
            <CameraIcon />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.avatarView} activeOpacity={0.8}>
          <Avatar
            width={DEVICE_HEIGHT * 0.23}
            height={DEVICE_HEIGHT * 0.23}
            source={
              "https://thpt-phamhongthai.edu.vn/wp-content/uploads/2022/08/anh-avatar-viet-nam-cute-ngau-tuyet-dep-10.jpg"
            }
          />
          <TouchableOpacity style={styles.avatarButtonView} activeOpacity={0.6}>
            <CameraIcon />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View style={styles.infomation}>
        <Text style={styles.textName}>{Object.keys(data).length > 0 ? data.username : ""}</Text>
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
            <Text style={styles.subText}>122 friends</Text>
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
            <View style={styles.friendItem}>
              <TouchableHighlight
                style={styles.friendImage}
                underlayColor={color.TouchableHighlightBorderWhite}
                onPress={() => {}}
              >
                <ImageBackground
                  source={{
                    uri: "https://avatarfiles.alphacoders.com/244/244597.jpg",
                  }}
                  style={styles.image}
                  imageStyle={styles.imageStyle}
                  resizeMode={"cover"}
                />
              </TouchableHighlight>
              <Text style={styles.friendName}>Lionel Messi</Text>
            </View>
            <View style={styles.friendItem}>
              <TouchableHighlight
                style={styles.friendImage}
                underlayColor={color.TouchableHighlightBorderWhite}
                onPress={() => {}}
              >
                <ImageBackground
                  source={{
                    uri: "https://external-preview.redd.it/cristiano-ronaldo-commits-to-al-nassr-v0-lHSPuLLXaP4pPB04IXXE7eG2jYuOk3tyaSHJOKABAuE.jpg?auto=webp&s=cdbc91e11f3b4cd8332d42ba8458baec9eaa9d71",
                  }}
                  style={styles.image}
                  imageStyle={styles.imageStyle}
                  resizeMode={"cover"}
                />
              </TouchableHighlight>
              <Text style={styles.friendName}>CR 7</Text>
            </View>
            <View style={styles.friendItem}>
              <TouchableHighlight
                style={styles.friendImage}
                underlayColor={color.TouchableHighlightBorderWhite}
                onPress={() => {}}
              >
                <ImageBackground
                  source={{
                    uri: "https://mega.com.vn/media/news/2752_hinh_nen_neymar__89_.jpg",
                  }}
                  style={styles.image}
                  imageStyle={styles.imageStyle}
                  resizeMode={"cover"}
                />
              </TouchableHighlight>
              <Text style={styles.friendName}>Neymar</Text>
            </View>
          </View>
          <View style={styles.friendRow}>
            <View style={styles.friendItem}>
              <TouchableHighlight
                style={styles.friendImage}
                underlayColor={color.TouchableHighlightBorderWhite}
                onPress={() => {}}
              >
                <ImageBackground
                  source={{
                    uri: "https://static.independent.co.uk/2022/12/04/22/SEI136346324.jpg?quality=75&width=1200&auto=webp",
                  }}
                  style={styles.image}
                  imageStyle={styles.imageStyle}
                  resizeMode={"cover"}
                />
              </TouchableHighlight>
              <Text style={styles.friendName}>Kylian Mbappé</Text>
            </View>
            <View style={styles.friendItem}>
              <TouchableHighlight
                style={styles.friendImage}
                underlayColor={color.TouchableHighlightBorderWhite}
                onPress={() => {}}
              >
                <ImageBackground
                  source={{
                    uri: "https://znews-photo.zingcdn.me/w660/Uploaded/wobjcak/2022_08_24/son.jpeg",
                  }}
                  style={styles.image}
                  imageStyle={styles.imageStyle}
                  resizeMode={"cover"}
                />
              </TouchableHighlight>
              <Text style={styles.friendName}>Son Heung-min</Text>
            </View>
            <View style={styles.friendItem}>
              <TouchableHighlight
                style={styles.friendImage}
                underlayColor={color.TouchableHighlightBorderWhite}
                onPress={() => {}}
              >
                <ImageBackground
                  source={{
                    uri: "https://nld.mediacdn.vn/291774122806476800/2021/8/19/2021-08-18t162420z205616511rc2s7p9kje83rtrmadp3soccer-england-tot-kane-16293458499411269082832.jpg",
                  }}
                  style={styles.image}
                  imageStyle={styles.imageStyle}
                  resizeMode={"cover"}
                />
              </TouchableHighlight>
              <Text style={styles.friendName}>Harry Kane</Text>
            </View>
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
              <Avatar
                source={
                  "https://thpt-phamhongthai.edu.vn/wp-content/uploads/2022/08/anh-avatar-viet-nam-cute-ngau-tuyet-dep-10.jpg"
                }
                width={46}
                height={46}
              />
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