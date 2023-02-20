import { Modal, StatusBar, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import color from "../../constants/color/color";
import { Avatar } from "./Avatar";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import TimeToString from "../../utils/TimeToString";
import { useSelector } from "react-redux";
import { PostOperation } from "./PostOperation";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export const PostHeader = ({ postId , detail}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const mapData = useSelector((state) => state.post.mapData);
  const navigation = useNavigation();
  const userId = useSelector((state) => state.auth.data.id);

  const handlePressPostOperation = () => {
    StatusBar.setBackgroundColor(color.StatusBarBackgroundCreatePostBlur);
    StatusBar.setBarStyle("light-content");
    setModalVisible(true);
  }
  
  const handlePressOnName = () => {
    const id = mapData[postId]["author"]["id"];
    if (id === userId) {
      navigation.navigate("MyProfile");
    }
    else {
      navigation.navigate("FriendProfile", {id});
    }
  }

  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate("PostDetail", {
          postId,
        })
      }}
      underlayColor={color.TouchableHighlightBorderWhite}
    >
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <PostOperation setModalVisible={setModalVisible} postId={postId} />
        </Modal>
        <View style={styles.avatar}>
          <Avatar
            source={
              mapData.hasOwnProperty(postId) &&
              mapData[postId]["author"]["avatar"]
            }
          />
        </View>
        <View style={styles.name}>
          <TouchableHighlight underlayColor={color.TouchableHighlightBorderWhite} onPress={handlePressOnName} style={styles.nameTouchable}>
            <Text style={styles.text} numberOfLines={1}>
              {mapData.hasOwnProperty(postId) &&
                mapData[postId]["author"]["username"]}
            </Text>
          </TouchableHighlight>
          <View style={styles.status}>
            <Text style={styles.tinyText}>
              {mapData.hasOwnProperty(postId) &&
                (mapData[postId]["created"] !== mapData[postId]["modified"]
                  ? `Edited ${TimeToString(mapData[postId]["modified"])}`
                  : TimeToString(mapData[postId]["created"]))}
            </Text>
            <Dot />
            <PublicIcon />
          </View>
        </View>
        {!detail && (
          <>
            <TouchableHighlight
              style={styles.moreButton}
              underlayColor={color.TouchableHighlightBorderWhite}
              onPress={handlePressPostOperation}
            >
              <MoreIcon />
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.hideOption}
              underlayColor={color.TouchableHighlightBorderWhite}
              onPress={() => {}}
            >
              <CloseIcon />
            </TouchableHighlight>
          </>
        )}
      </View>
    </TouchableHighlight>
  );
};

const iconSize = 14;
const PublicIcon = () => (
  <MaterialIcons name="public" size={iconSize} color={color.IconGray} />
);
const Dot = () => (
  <Entypo
    name="dot-single"
    size={8}
    color={color.IconGray}
    style={styles.dotSeparate}
  />
);
const MoreIcon = () => (
  <Feather name="more-horizontal" size={22} color={color.IconGray} />
);
const CloseIcon = () => (
  <Ionicons name="close" size={22} color={color.IconGray} />
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "2.5%",
    paddingRight: "2.5%",
  },
  avatar: {
    flex: 3,
    marginTop: 15,
    marginBottom: 15,
  },
  name: {
    flex: 13,
    height: 40,
    flexDirection: "column",
    flexWrap: "wrap"
  },
  moreButton: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    height: 40,
    alignSelf: "flex-start",
  },
  hideOption: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    height: 40,
    alignSelf: "flex-start",
  },
  text: {
    color: color.Black,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "klavika-bold",
  },
  status: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  tinyText: {
    color: color.TextTinyGray,
    fontSize: 13,
  },
  dotSeparate: {
    marginLeft: 5,
    marginRight: 5,
  },
  nameTouchable: {
    flex: 1
  }
});
