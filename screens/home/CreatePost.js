import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Keyboard,
  Image,
  Dimensions,
  Modal,
  BackHandler,
  StatusBar,
} from "react-native";
import { Avatar } from "../../components/home-screen/Avatar";
import color from "../../constants/color/color";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { EmojiKeyboard } from "rn-emoji-keyboard";
import * as ImagePicker from "expo-image-picker";
import { OnBackPressModal } from "../../components/home-screen/OnBackPressModal";
import {
  onChange,
  onPressIcon,
} from "../../redux/features/createPost/createPostSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const DEVICE_HEIGHT = Dimensions.get("screen").height;

export const CreatePost = () => {
  const [images, setImages] = useState([]);
  const [firstFocus, setFirstFocus] = useState(false);
  const [openEmoji, setOpenemoji] = useState(false);
  const animatedValue = new Animated.Value(0);
  const [modalVisible, setModalVisible] = useState(false);
  const text = useSelector((state) => state.createPost.value);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const linkAvatar = useSelector((state) => state.user.user.avatar);
  const username = useSelector((state) => state.user.user.username);

  useEffect(() => {
    const backAction = () => {
      if ((images.length > 0 || text.length > 0) && !modalVisible) {
        StatusBar.setBackgroundColor(color.StatusBarBackgroundCreatePostBlur);
        StatusBar.setBarStyle("light-content");
        setModalVisible(true);
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [images, text]);

  const onChangeText = (value) => {
    dispatch(onChange(value));
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      allowsEditing: false,
      // base64: true
    });

    // console.log(result);

    if (!result.cancelled && result.selected === undefined) {
      setImages((prev) => [...prev, result.uri]);
    } else if (!result.cancelled && result.selected !== undefined) {
      result.selected.map((e) => {
        setImages((prev) => [...prev, e.uri]);
      });
    }
  };

  const handleCloseImage = (i) => {
    setImages((prev) => [...prev.slice(0, i), ...prev.slice(i + 1)]);
  };

  const onContentSizeChange = (e) => {
    const { height } = e.nativeEvent.contentSize;
    if (height < 200) {
      Animated.timing(animatedValue, {
        toValue: height >= 116 ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    if (height >= 200 && height < 250) {
      Animated.timing(animatedValue, {
        toValue: height >= 200 ? 2 : 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleOnEmojiSelected = (selected) => {
    dispatch(onPressIcon(selected.emoji));
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setFirstFocus(true);
      if (openEmoji === true) {
        setOpenemoji(false);
      }
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {});

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [openEmoji]);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <OnBackPressModal setModalVisible={setModalVisible} />
      </Modal>
      <View style={styles.header}>
        <Avatar width={46} height={46} source={linkAvatar}/>
        <View style={styles.headerRight}>
          <Text style={styles.name}>{username}</Text>
          <View style={styles.headerButton}>
            <TouchableHighlight
              style={styles.TouchableHighlightHeader}
              onPress={() => {}}
              underlayColor={color.TouchableHighlightBorderWhite}
            >
              <View style={styles.wrapItem}>
                <FriendIcon />
                <Text style={styles.tinyText}> Public </Text>
                <DownIcon />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.TouchableHighlightHeader, { marginLeft: 5 }]}
              onPress={() => {}}
              underlayColor={color.TouchableHighlightBorderWhite}
            >
              <View style={styles.wrapItem}>
                <PlusIcon />
                <Text style={styles.tinyText}> Album </Text>
                <DownIcon />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
      <View style={[styles.textInput]}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Animated.View
            style={[
              images.length === 0 && { flex: 1 },
              {
                transform: [
                  {
                    scale: animatedValue.interpolate({
                      inputRange: [0, 2],
                      outputRange: [1, 0.85],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              },
            ]}
          >
            <TextInput
              placeholder="What's on your mind?"
              multiline={true}
              style={styles.input}
              onContentSizeChange={onContentSizeChange}
              onFocus={() => setFirstFocus(true)}
              onChangeText={onChangeText}
              value={text}
            />
          </Animated.View>
          {images.length === 1 && (
            <View style={{ height: (DEVICE_HEIGHT * 2) / 3 }}>
              <View style={styles.selectedImagesContainer}>
                <View style={[styles.selectedView, { flex: 1 }]}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                      handleCloseImage(0);
                    }}
                  >
                    <CloseIcon />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: images[0] }}
                    style={styles.selectedImage}
                  />
                </View>
              </View>
            </View>
          )}
          {images.length === 2 && (
            <View style={{ height: (DEVICE_HEIGHT * 1) / 2 }}>
              <View style={styles.selectedImagesContainer}>
                <View style={[styles.selectedView, { flex: 1 }]}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                      handleCloseImage(0);
                    }}
                  >
                    <CloseIcon />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: images[0] }}
                    style={styles.selectedImage}
                  />
                </View>
                <View style={[styles.selectedView, { flex: 1 }]}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                      handleCloseImage(1);
                    }}
                  >
                    <CloseIcon />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: images[1] }}
                    style={styles.selectedImage}
                  />
                </View>
              </View>
            </View>
          )}
          {images.length > 2 && images.length <= 4 && (
            <View style={{ height: (DEVICE_HEIGHT * 1) / 2 }}>
              <View style={styles.selectedImagesContainer}>
                <View style={[styles.selectedView, { flex: 2 }]}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                      handleCloseImage(0);
                    }}
                  >
                    <CloseIcon />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: images[0] }}
                    style={styles.selectedImage}
                  />
                </View>
                <View style={{ flexDirection: "column", flex: 1 }}>
                  <View style={[styles.selectedView, { flex: 1 }]}>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => {
                        handleCloseImage(1);
                      }}
                    >
                      <CloseIcon />
                    </TouchableOpacity>
                    <Image
                      source={{ uri: images[1] }}
                      style={styles.selectedImage}
                    />
                  </View>
                  <View style={[styles.selectedView, { flex: 1 }]}>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => {
                        handleCloseImage(2);
                      }}
                    >
                      <CloseIcon />
                    </TouchableOpacity>
                    <Image
                      source={{ uri: images[2] }}
                      style={styles.selectedImage}
                    />
                  </View>
                  {images.length === 4 && (
                    <View style={[styles.selectedView, { flex: 1 }]}>
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                          handleCloseImage(3);
                        }}
                      >
                        <CloseIcon />
                      </TouchableOpacity>
                      <Image
                        source={{ uri: images[3] }}
                        style={styles.selectedImage}
                      />
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
          {images.length >= 5 && (
            <View
              style={{
                height: DEVICE_HEIGHT * 0.42,
                flexDirection: "column",
              }}
            >
              <View style={{ flex: 4, flexDirection: "row" }}>
                <View style={[styles.selectedView, { flex: 1 }]}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                      handleCloseImage(0);
                    }}
                  >
                    <CloseIcon />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: images[0] }}
                    style={styles.selectedImage}
                  />
                </View>
                <View style={[styles.selectedView, { flex: 1 }]}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                      handleCloseImage(1);
                    }}
                  >
                    <CloseIcon />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: images[1] }}
                    style={styles.selectedImage}
                  />
                </View>
              </View>
              <View style={{ flex: 3 }}>
                <View style={{ flexDirection: "row", flex: 1 }}>
                  <View style={[styles.selectedView, { flex: 1 }]}>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => {
                        handleCloseImage(2);
                      }}
                    >
                      <CloseIcon />
                    </TouchableOpacity>
                    <Image
                      source={{ uri: images[2] }}
                      style={styles.selectedImage}
                    />
                  </View>
                  <View style={[styles.selectedView, { flex: 1 }]}>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => {
                        handleCloseImage(3);
                      }}
                    >
                      <CloseIcon />
                    </TouchableOpacity>
                    <Image
                      source={{ uri: images[3] }}
                      style={styles.selectedImage}
                    />
                  </View>
                  <View style={[styles.selectedView, { flex: 1 }]}>
                    {images.length > 5 && (
                      <View style={styles.selectedImageViewCenter}>
                        <Text style={styles.selectedImageTextCenter}>
                          +{images.length - 4}
                        </Text>
                      </View>
                    )}
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => {
                        handleCloseImage(4);
                      }}
                    >
                      <CloseIcon />
                    </TouchableOpacity>
                    <Image
                      source={{ uri: images[4] }}
                      style={styles.selectedImage}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
      {firstFocus ? (
        <View style={styles.bottomButton}>
          <TouchableHighlight
            style={styles.iconButton}
            onPress={pickImage}
            underlayColor={color.TouchableHighlightBorderWhite}
          >
            <ImageIcon />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.iconButton}
            onPress={() => {}}
            underlayColor={color.TouchableHighlightBorderWhite}
          >
            <TagIcon />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.iconButton}
            onPress={() => {}}
            underlayColor={color.TouchableHighlightBorderWhite}
            onPressOut={() => {
              setOpenemoji((prev) => !prev);
              Keyboard.dismiss();
            }}
          >
            <SmileIcon />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.iconButton}
            onPress={() => {}}
            underlayColor={color.TouchableHighlightBorderWhite}
          >
            <LocationIcon />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.iconButton}
            onPress={() => {
              setFirstFocus(false);
            }}
            underlayColor={color.TouchableHighlightBorderWhite}
          >
            <MoreIcon />
          </TouchableHighlight>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollViewBottomContainer}
          showsVerticalScrollIndicator={false}
        >
          <ScrollViewBottom />
        </ScrollView>
      )}
      {openEmoji && (
        <EmojiKeyboard
          onRequestClose={() => {
            setOpenemoji(false);
          }}
          onEmojiSelected={handleOnEmojiSelected}
          disabledCategories={[
            "travel_places",
            "search",
            "flags",
            "food_drink",
            "objects",
            "symbols",
          ]}
          enableCategoryChangeAnimation={true}
          expandable={false}
          enableRecentlyUsed
          emojiSize={20}
        />
      )}
    </View>
  );
};

const Size = 14;
const FriendIcon = () => (
  <FontAwesome5 name="user-friends" size={Size} color={color.IconGray} />
);
const PlusIcon = () => (
  <AntDesign name="plus" size={Size - 3} color={color.IconGray} />
);
const DownIcon = () => (
  <AntDesign name="caretdown" size={Size - 6} color={color.IconGray} />
);
const ImageIcon = () => (
  <Feather name="image" size={Size + 12} color={color.greenIcon} />
);
const TagIcon = () => (
  <AntDesign name="tags" size={Size + 12} color={color.MainBlue} />
);
const SmileIcon = () => (
  <Fontisto name="smiley" size={Size + 12} color={color.Orange} />
);
const LocationIcon = () => (
  <Ionicons name="ios-location-sharp" size={Size + 12} color={color.Red} />
);
const MoreIcon = () => (
  <MaterialCommunityIcons name="more" size={Size + 12} color={color.IconGray} />
);
const UpIcon = () => (
  <AntDesign name="up" size={Size + 3} color={color.IconGray} />
);
const LiveVideoIcon = () => (
  <Entypo name="video-camera" size={Size + 12} color={color.PaleVioletRed} />
);
const CameraIcon = () => (
  <AntDesign name="camera" size={Size + 12} color={color.PaleVioletRed} />
);
const GIFIcon = () => (
  <MaterialIcons name="gif" size={Size + 12} color={color.PaleGreen} />
);
const CloseIcon = () => (
  <AntDesign name="closecircleo" size={24} color={color.IconGray} />
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.White,
  },
  header: {
    height: 76,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerRight: {
    marginLeft: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
  },
  headerButton: {
    flexDirection: "row",
    width: 150,
  },
  TouchableHighlightHeader: {
    height: 26,
    justifyContent: "center",
    marginTop: 5,
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 6,
    borderColor: color.BorderTinyButtonGray,
  },
  tinyText: {
    color: color.GrayText,
    fontFamily: "Roboto-Medium",
    fontSize: 12,
  },
  wrapItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  selectedImagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  selectedImage: {
    flex: 1,
  },
  selectedView: {
    padding: 1,
  },
  selectedImageView: {
    marginTop: 5,
    height: 320,
    borderWidth: 1,
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 100,
  },
  input: {
    fontSize: 24,
    textAlignVertical: "top",
    fontFamily: "Roboto-Light",
    flex: 1,
  },
  bottomButton: {
    borderTopColor: color.BorderTinyButtonGray,
    borderTopWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 3,
    height: 50,
  },
  iconButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 6,
  },
  scrollViewBottom: {
    flex: 1,
    flexDirection: "column",
  },
  scrollViewIconButton: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    borderBottomColor: color.BorderTinyButtonGray,
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,
  },
  scrollViewButtonText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    marginLeft: 10,
  },
  scrollViewBottomContainer: {
    flex: 1,
  },
  selectedImageTextCenter: {
    color: color.White,
    fontSize: 24,
  },
  selectedImageViewCenter: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.Black,
    opacity: 0.5,
    top: 1,
    left: 1,
  },
});

const ScrollViewBottom = () => (
  <View style={styles.scrollViewBottom}>
    <View style={[styles.scrollViewIconButton, { justifyContent: "center" }]}>
      <UpIcon />
    </View>
    <TouchableHighlight
      onPress={() => {}}
      underlayColor={color.TouchableHighlightBorderWhite}
    >
      <View style={styles.scrollViewIconButton}>
        <ImageIcon />
        <Text style={styles.scrollViewButtonText}>Photo/video</Text>
      </View>
    </TouchableHighlight>
    <TouchableHighlight
      onPress={() => {}}
      underlayColor={color.TouchableHighlightBorderWhite}
    >
      <View style={styles.scrollViewIconButton}>
        <TagIcon />
        <Text style={styles.scrollViewButtonText}>Tag people</Text>
      </View>
    </TouchableHighlight>
    <TouchableHighlight
      onPress={() => {}}
      underlayColor={color.TouchableHighlightBorderWhite}
    >
      <View style={styles.scrollViewIconButton}>
        <SmileIcon />
        <Text style={styles.scrollViewButtonText}>Feeling/activity</Text>
      </View>
    </TouchableHighlight>
    <TouchableHighlight
      onPress={() => {}}
      underlayColor={color.TouchableHighlightBorderWhite}
    >
      <View style={styles.scrollViewIconButton}>
        <LocationIcon />
        <Text style={styles.scrollViewButtonText}>Check in</Text>
      </View>
    </TouchableHighlight>
    <TouchableHighlight
      onPress={() => {}}
      underlayColor={color.TouchableHighlightBorderWhite}
    >
      <View style={styles.scrollViewIconButton}>
        <LiveVideoIcon />
        <Text style={styles.scrollViewButtonText}>Live video</Text>
      </View>
    </TouchableHighlight>
    <TouchableHighlight
      onPress={() => {}}
      underlayColor={color.TouchableHighlightBorderWhite}
    >
      <View style={styles.scrollViewIconButton}>
        <CameraIcon />
        <Text style={styles.scrollViewButtonText}>Camera</Text>
      </View>
    </TouchableHighlight>
    <TouchableHighlight
      onPress={() => {}}
      underlayColor={color.TouchableHighlightBorderWhite}
    >
      <View style={styles.scrollViewIconButton}>
        <GIFIcon />
        <Text style={styles.scrollViewButtonText}>GIF</Text>
      </View>
    </TouchableHighlight>
  </View>
);
