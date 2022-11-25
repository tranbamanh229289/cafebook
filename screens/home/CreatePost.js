import { Animated, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { Avatar } from "../../components/home-screen/Avatar";
import color from "../../constants/color/color";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";

export const CreatePost = () => {
    const [firstFocus, setFirstFocus] = useState(false);
    const animatedValue = new Animated.Value(0);
    Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
    }).start();
    const onContentSizeChange = (e) => {
        Animated.timing(animatedValue, {
            toValue: e.nativeEvent.contentSize.height >= 116 ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
        if (e.nativeEvent.contentSize.height > 116) {
            Animated.timing(animatedValue, {
            toValue: e.nativeEvent.contentSize.height >= 200 ? 2 : 1,
            duration: 200,
            useNativeDriver: false,
            }).start();
        }
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Avatar width={46} height={46} />
          <View style={styles.headerRight}>
            <Text style={styles.name}>Nguyễn Sơn</Text>
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
        <View style={styles.textInput}>
          <Animated.View
            style={{
              flex: 1,
              transform: [
                {
                  scale: animatedValue.interpolate({
                    inputRange: [0, 2],
                    outputRange: [1, 0.85],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          >
            <TextInput
              placeholder="What's on your mind?"
              multiline={true}
              style={styles.input}
              onContentSizeChange={onContentSizeChange}
              onFocus={() => setFirstFocus(true)}
            />
          </Animated.View>
        </View>
        {firstFocus ? (
          <View style={styles.bottomButton}>
            <TouchableHighlight
              style={styles.iconButton}
              onPress={() => {}}
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
              onPress={() => {}}
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
      </View>
    );
}

const Size = 14;
const FriendIcon = () => <FontAwesome5 name="user-friends" size={Size} color={color.IconGray} />;
const PlusIcon = () => <AntDesign name="plus" size={Size-3} color={color.IconGray} />;
const DownIcon = () => <AntDesign name="caretdown" size={Size - 6} color={color.IconGray} />
const ImageIcon = () => <Feather name="image" size={Size + 12} color={color.greenIcon} />
const TagIcon = () => <AntDesign name="tags" size={Size + 12} color={color.MainBlue} />
const SmileIcon = () => <Fontisto name="smiley" size={Size + 12} color={color.Orange} />;
const LocationIcon = () => <Ionicons name="ios-location-sharp" size={Size + 12} color={color.Red} />;
const MoreIcon = () => <MaterialCommunityIcons name="more" size={Size + 12} color={color.IconGray} />;
const UpIcon = () => <AntDesign name="up" size={Size + 3} color={color.IconGray} />;
const LiveVideoIcon = () => <Entypo name="video-camera" size={Size + 12} color={color.PaleVioletRed} />;
const CameraIcon = () => <AntDesign name="camera" size={Size + 12} color={color.PaleVioletRed} />;
const GIFIcon = () => <MaterialIcons name="gif" size={Size + 12} color={color.PaleGreen} />;
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
        fontSize: 16
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
        fontSize: 12
    },
    wrapItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    textInput: {
        marginTop: 10,
        flex: 1,
        paddingHorizontal: 10,
    },
    input: {
        fontSize: 24,
        textAlignVertical: "top",
        fontFamily: "Roboto-Light",
        height: "100%",
    },
    bottomButton: {
        height: 46,
        borderTopColor: color.BorderTinyButtonGray,
        borderTopWidth: 0.5,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 3,
        
    },
    iconButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        borderRadius: 6
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
    }
});

const ScrollViewBottom = () => (
  <View style={styles.scrollViewBottom}>
    <View style={[styles.scrollViewIconButton, {justifyContent: "center"}]}>
        <UpIcon/>
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