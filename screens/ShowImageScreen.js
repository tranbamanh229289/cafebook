import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View } from "react-native";
import color from "../constants/color/color";
import { Feather } from '@expo/vector-icons';
import { PostFooter } from "../components/home-screen/PostFooter";
import TimeToString from "../utils/TimeToString";
import { useSelector } from "react-redux";

export const ShowImageScreen = ({route, navigation}) => {
    const postId = route.params.postId;
    const mapData = useSelector((state) => state.post.mapData);

    const [showMenu , setShowMenu] = useState(true);
    const [more, setMore] = useState(true);
    const [bodyText , setBodyText] = useState("");

    useEffect(()=>{
      if (mapData.hasOwnProperty(postId)) {
        if (mapData[postId]["described"] !== null) {
          setBodyText(mapData[postId]["described"]);
          setMore(mapData[postId]["described"].length < 120);
        }
      }
    },[]);

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setShowMenu((prev) => !prev);
        }}
      >
        <View style={styles.container}>
          {showMenu && (
            <View style={styles.menu}>
              <MoreIcon size={26} />
            </View>
          )}
          <View style={styles.imageView}>
            <Image
              source={{ uri: route.params.uri }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          {showMenu && (
            <View style={styles.content}>
              <View style={styles.textContent}>
                <Text style={styles.text}>{mapData.hasOwnProperty(postId) && mapData[postId]["author"]["username"]}</Text>
                {more ? (
                  <Text style={styles.text}>{bodyText}</Text>
                ) : (
                  <>
                    <Text style={styles.text}>
                      {bodyText.slice(0, 120) + " ... "}
                      <TouchableHighlight
                        underlayColor={color.Black}
                        onPress={() => {
                          setMore(true);
                        }}
                      >
                        <Text style={styles.textSeeMore}>See more</Text>
                      </TouchableHighlight>
                    </Text>
                  </>
                )}
                <Text style={[styles.text, styles.timeText]}>
                  {mapData.hasOwnProperty(postId) && TimeToString(mapData[postId]["created"])}
                </Text>
              </View>
              <PostFooter dark={true} postId={postId}/>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
}

const MoreIcon = ({size}) => (<Feather name="more-vertical" size={size} color={color.White} />);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Black,
    justifyContent: "center",
  },
  imageView: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    zIndex: 100,
    top: 10,
    right: 10,
  },
  content: {
    position: "absolute",
    zIndex: 100,
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "rgba(0 , 0 , 0 , 0.3)",
  },
  text: {
    color: color.White,
    paddingLeft: "3.5%",
    paddingRight: "3.5%",
    fontSize: 14,
  },
  textSeeMore: {
    color: color.TextGray,
    alignSelf: "center",
    fontSize: 14,
  },
  textContent: {
    marginVertical: 5
  },
  timeText: {
    fontSize: 14,
    color: color.GrayText,
    marginTop: 20
  }
});