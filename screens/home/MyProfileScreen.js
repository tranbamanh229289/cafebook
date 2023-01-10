import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import color from "../../constants/color/color";
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from "@expo/vector-icons";
import { Avatar } from "../../components/home-screen/Avatar";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const DEVICE_HEIGHT = Dimensions.get("screen").height;

export const MyProfileScreen = () => {
    return (
      <ScrollView style={styles.container}>
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
              <CameraIcon/>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View style={styles.infomation}>
          <Text style={styles.textName}>Son Ngu yen</Text>
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
          <View
            style={{ borderTopWidth: 0.5, borderTopColor: color.BorderTopGray, marginTop: 10, }}
          />
        </View>
      </ScrollView>
    );
}

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
    alignItems: "center"
  },
  infomation: {
    flex: 1,
    padding: 10,
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
});