import { Text, View, StyleSheet, Dimensions, TouchableHighlight, ScrollView, Image, TouchableWithoutFeedback } from "react-native";
import { PostHeader } from "../../components/home-screen/PostHeader";
import { PostFooter } from "../../components/home-screen/PostFooter";
import { useEffect, useState } from "react";
import color from "../../constants/color/color";
import { useNavigation } from "@react-navigation/native";

const DEVICE_HEIGHT = Dimensions.get("screen").height;
export const PostDetail = ({route}) => {
    const [more, setMore] = useState(true);
    const [images, setImages] = useState(route.params.images);
    const [bodyText , setBodyText] = useState("");
    const navigation = useNavigation();

    useEffect(()=>{
      if (route.params.described !== null && route.params.described !== undefined) {
        setBodyText(route.params.described);
        setMore(route.params.described < 450)
      }
    },[]);

    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <PostHeader detail={true} avatar={route.params.avatar} username={route.params.username} created={route.params.created}/>
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
        <PostFooter like={route.params.like} is_liked={route.params.is_liked} comment={route.params.comment}/>
        {images.map((e, i) => (
          <View style={styles.imageView} key={`image-view-${i}`}>
            <ItemSeparatorComponent />
            <TouchableWithoutFeedback
              style={styles.selectedView}
              onPress={() => {
                navigation.navigate("ShowImage", {
                  uri: e.url,
                  name: route.params.username,
                  time: route.params.created,
                  text: route.params.described,
                });
              }}
            >
              <Image source={{ uri: e.url }} style={styles.selectedImage} />
            </TouchableWithoutFeedback>
            <PostFooter />
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