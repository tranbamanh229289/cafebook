import { Text, View, StyleSheet, Dimensions, TouchableHighlight, ScrollView, Image, TouchableWithoutFeedback } from "react-native";
import { PostHeader } from "../../components/home-screen/PostHeader";
import { PostFooter } from "../../components/home-screen/PostFooter";
import { useEffect, useState } from "react";
import color from "../../constants/color/color";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const DEVICE_HEIGHT = Dimensions.get("screen").height;
export const PostDetail = ({route}) => {
    const mapData = useSelector((state) => state.post.mapData);
    const postId = route.params.postId;

    const [more, setMore] = useState(true);
    const [images, setImages] = useState([]);
    const [bodyText , setBodyText] = useState("");
    const navigation = useNavigation();

    useEffect(()=>{
      if (mapData.hasOwnProperty(postId)) {
        if (mapData[postId]["described"] !== null) {
          setBodyText(mapData[postId]["described"]);
        setMore(mapData[postId]["described"].length < 450);
        }
        if (mapData[postId]["image"] !== null) {
          setImages(mapData[postId]["image"]);
        }
      }
    },[]);

    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <PostHeader detail={true} postId={postId}/>
        <TouchableHighlight
          style={styles.textContainer}
          underlayColor={color.TouchableHighlightBorderWhite}
          onPress={() => {
            setMore((prev) => !prev);
          }}
        >
          {more ? (
            <Text style={styles.text}>{bodyText}</Text>
          ) : (
            <>
              <Text style={styles.text}>
                {bodyText.slice(0, 450) + " ... "}
                <TouchableHighlight
                  underlayColor={color.TouchableHighlightBorderWhite}
                  onPress={() => {
                    setMore(true);
                  }}
                >
                  <Text style={styles.textSeeMore}>See more</Text>
                </TouchableHighlight>
              </Text>
            </>
          )}
        </TouchableHighlight>
        <PostFooter postId={postId}/>
        {images.map((e, i) => (
          <View style={styles.imageView} key={`image-view-${i}`}>
            <ItemSeparatorComponent />
            <TouchableWithoutFeedback
              style={styles.selectedView}
              onPress={() => {
                navigation.navigate("ShowImage", {
                  uri: e.url,
                  postId: postId,
                });
              }}
            >
              <Image source={{ uri: e.url }} style={styles.selectedImage} />
            </TouchableWithoutFeedback>
            <PostFooter postId={postId}/>
          </View>
        ))}
      </ScrollView>
    );
}

const ItemSeparatorComponent = () => (
  <View style={{ height: 10, backgroundColor: color.BackgroundGray }} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    marginBottom: 3,
  },
  text: {
    paddingLeft: "3.5%",
    paddingRight: "3.5%",
    fontSize: 16,
  },
  textSeeMore: {
    color: color.TextGray,
    alignSelf: "center",
    fontSize: 16,
  },
  imageView: {
    height: (DEVICE_HEIGHT * 2) / 3,
  },
  selectedView: {
    flex: 1
  },
  selectedImage: {
    flex: 1
  }
});