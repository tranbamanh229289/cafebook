import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import color from "../../constants/color/color";
import { deletePost, reportPost } from "../../redux/features/post/postSlice";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const PostOperation = ({ setModalVisible, postId }) => {
  const dispatch = useDispatch();
  const mapData = useSelector((state) => state.post.mapData);
  const token = useSelector((state) => state.auth.data.token);
  const navigation = useNavigation();

  const handlePressDelete = () => {
    Alert.alert(
      "Delete pernamently",
      "This action will delete this post pernamently. Are you sure ?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          style: "destructive",
          text: "OK",
          onPress: () => {
            dispatch(deletePost({ token: token, id: postId }));
            StatusBar.setBackgroundColor(color.White);
            StatusBar.setBarStyle("dark-content");
            setModalVisible(false);
          },
        },
      ]
    );
  };

  const handleReport = () => {
    dispatch(reportPost({ token: token, id: postId }))
    .then(() => console.log("report post success"));
    StatusBar.setBackgroundColor(color.White);
    StatusBar.setBarStyle("dark-content");
    setModalVisible(false);
  };

  const handlePressEdit = () => {
    StatusBar.setBackgroundColor(color.White);
    StatusBar.setBarStyle("dark-content");
    setModalVisible(false);
    navigation.navigate("EditPost", {postId})
  };

  const pressCloseModal = () => {
    StatusBar.setBackgroundColor(color.White);
    StatusBar.setBarStyle("dark-content");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <View style={styles.top}>
          <View style={styles.bar} />
        </View>
        <View style={styles.buttons}>
          <TouchableHighlight onPress={() => {}} underlayColor={color.Gray95}>
            <View style={styles.buttonView}>
              <View style={styles.iconView}>
                <AntDesign name="pushpin" size={24} color="black" />
              </View>
              <View>
                <Text style={styles.buttonTitle}>Pin post</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => {}} underlayColor={color.Gray95}>
            <View style={styles.buttonView}>
              <View style={styles.iconView}>
                <MaterialCommunityIcons name="post" size={24} color="black" />
              </View>
              <View>
                <Text style={styles.buttonTitle}>Save post</Text>
                <Text style={styles.buttonSubTitle}>
                  Add this to your saved items.
                </Text>
              </View>
            </View>
          </TouchableHighlight>
          {mapData.hasOwnProperty(postId) &&
            mapData[postId]["can_edit"] === "1" && (
              <TouchableHighlight
                onPress={handlePressEdit}
                underlayColor={color.Gray95}
              >
                <View style={styles.buttonView}>
                  <View style={styles.iconView}>
                    <MaterialIcons name="mode-edit" size={24} color="black" />
                  </View>
                  <View>
                    <Text style={styles.buttonTitle}>Edit post</Text>
                  </View>
                </View>
              </TouchableHighlight>
            )}
          {mapData.hasOwnProperty(postId) &&
            mapData[postId]["can_edit"] === "1" && (
              <TouchableHighlight
                onPress={() => {}}
                underlayColor={color.Gray95}
              >
                <View style={styles.buttonView}>
                  <View style={styles.iconView}>
                    <FontAwesome name="history" size={24} color="black" />
                  </View>
                  <View>
                    <Text style={styles.buttonTitle}>View edit history</Text>
                  </View>
                </View>
              </TouchableHighlight>
            )}
          <TouchableHighlight onPress={() => {}} underlayColor={color.Gray95}>
            <View style={styles.buttonView}>
              <View style={styles.iconView}>
                <Ionicons name="notifications-off" size={24} color="black" />
              </View>
              <View>
                <Text style={styles.buttonTitle}>
                  Turn off notifications for this post
                </Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => {}} underlayColor={color.Gray95}>
            <View style={styles.buttonView}>
              <View style={styles.iconView}>
                <Ionicons name="copy" size={24} color="black" />
              </View>
              <View>
                <Text style={styles.buttonTitle}>Copy link</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.buttons}>
          <TouchableHighlight onPress={() => {}} underlayColor={color.Gray95}>
            <View style={styles.buttonView}>
              <View style={styles.iconView}>
                <Entypo name="untag" size={24} color="black" />
              </View>
              <View>
                <Text style={styles.buttonTitle}>Remove tag</Text>
                <Text style={styles.buttonSubTitle}>
                  You won't be tagged in this post anymore.
                </Text>
              </View>
            </View>
          </TouchableHighlight>
          {mapData.hasOwnProperty(postId) &&
            mapData[postId]["can_edit"] === "0" && (
              <TouchableHighlight
                onPress={handleReport}
                underlayColor={color.Gray95}
              >
                <View style={styles.buttonView}>
                  <View style={styles.iconView}>
                    <Octicons name="report" size={24} color="black" />
                  </View>
                  <View>
                    <Text style={styles.buttonTitle}>Report post</Text>
                    <Text style={styles.buttonSubTitle}>
                      I'm concerned about this post.
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            )}

          {mapData.hasOwnProperty(postId) &&
            mapData[postId]["can_edit"] === "1" && (
              <TouchableHighlight
                onPress={handlePressDelete}
                underlayColor={color.Gray95}
              >
                <View style={styles.buttonView}>
                  <View style={styles.iconView}>
                    <EvilIcons name="trash" size={30} color={color.IconGray} />
                  </View>
                  <View>
                    <Text style={styles.buttonTitle}>Delete post</Text>
                  </View>
                </View>
              </TouchableHighlight>
            )}

          <TouchableHighlight
            onPress={pressCloseModal}
            underlayColor={color.Gray95}
          >
            <View style={styles.buttonView}>
              <View style={styles.iconView}>
                <MaterialIcons name="done" size={30} color={color.MainBlue} />
              </View>
              <View>
                <Text style={[styles.buttonTitle, { color: color.MainBlue }]}>
                  Done
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: color.BackgroundGray,
    alignItems: "center",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 10,
  },
  buttons: {
    width: "95%",
    backgroundColor: color.White,
    marginTop: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  buttonView: {
    flexDirection: "row",
    height: 55,
    alignItems: "center",
    padding: 15,
  },
  iconView: {
    width: 40,
    height: "100%",
    justifyContent: "center",
  },
  buttonSubTitle: {
    fontSize: 12,
    color: color.GrayText,
  },
  buttonTitle: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
  },
  top: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  bar: {
    width: "10%",
    height: 3,
    backgroundColor: color.DarkGray,
    borderRadius: 2,
  },
});
