import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import color from "../../constants/color/color";

const DEVICE_HEIGHT = Dimensions.get("screen").height;

export const PostBody = ({ postId }) => {
  const mapData = useSelector((state) => state.post.mapData);
  const [more, setMore] = useState(true);
  const [bodyText, setBodyText] = useState("");
  const [listImage, setListImage] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (mapData.hasOwnProperty(postId)) {
      if (mapData[postId]["described"] !== null) {
        setBodyText(mapData[postId]["described"]);
        setMore(mapData[postId]["described"].length < 120);
      }
      if (mapData[postId]["image"] !== null) {
        setListImage(mapData[postId]["image"]);
      }
    }
  }, [mapData[postId]]);
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.textContainer}
        underlayColor={color.TouchableHighlightBorderWhite}
        onPress={() => {
          setMore((prev) => !prev);
        }}
      >
        {more || bodyText.length < 120 ? (
          <Text style={styles.text}>{bodyText}</Text>
        ) : (
          <>
            <Text style={styles.text}>
              {bodyText.slice(0, 120) + " ... "}
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
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate("PostDetail", {
            postId,
          })
        }
      >
        <View style={styles.imagesContainer}>
          {listImage.length === 1 && (
            <View style={{ height: (DEVICE_HEIGHT * 2) / 3 }}>
              <View style={styles.selectedImagesContainer}>
                <View style={[styles.selectedView, { flex: 1 }]}>
                  <Image
                    source={{ uri: listImage[0].url }}
                    style={styles.selectedImage}
                  />
                </View>
              </View>
            </View>
          )}
          {listImage.length === 2 && (
            <View style={{ height: (DEVICE_HEIGHT * 1) / 2 }}>
              <View style={styles.selectedImagesContainer}>
                <View style={[styles.selectedView, { flex: 1 }]}>
                  <Image
                    source={{ uri: listImage[0].url }}
                    style={styles.selectedImage}
                  />
                </View>
                <View style={{ marginLeft: 3 }} />
                <View style={[styles.selectedView, { flex: 1 }]}>
                  <Image
                    source={{ uri: listImage[1].url }}
                    style={styles.selectedImage}
                  />
                </View>
              </View>
            </View>
          )}
          {listImage.length > 2 && listImage.length <= 4 && (
            <View style={{ height: (DEVICE_HEIGHT * 1) / 2 }}>
              <View style={styles.selectedImagesContainer}>
                <View style={[styles.selectedView, { flex: 2 }]}>
                  <Image
                    source={{ uri: listImage[0].url }}
                    style={styles.selectedImage}
                  />
                </View>
                <View style={{ marginLeft: 3 }} />
                <View style={{ flexDirection: "column", flex: 1 }}>
                  <View style={[styles.selectedView, { flex: 1 }]}>
                    <Image
                      source={{ uri: listImage[1].url }}
                      style={styles.selectedImage}
                    />
                  </View>
                  <View style={{ marginBottom: 3 }} />
                  <View style={[styles.selectedView, { flex: 1 }]}>
                    <Image
                      source={{ uri: listImage[2].url }}
                      style={styles.selectedImage}
                    />
                  </View>

                  {listImage.length === 4 && (
                    <View style={[styles.selectedView, { flex: 1 }]}>
                      <View style={{ marginBottom: 3 }} />
                      <Image
                        source={{ uri: listImage[3].url }}
                        style={styles.selectedImage}
                      />
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
          {/* {images.listImage >= 5 && (
              <View
                style={{
                  height: DEVICE_HEIGHT * 0.42,
                  flexDirection: "column",
                }}
              >
                <View style={{ flex: 4, flexDirection: "row" }}>
                  <View style={[styles.selectedView, { flex: 1 }]}>
                    <Image
                      source={{ uri: listImage[0].url }}
                      style={styles.selectedImage}
                    />
                  </View>
                  <View style={{ marginLeft: 3 }} />
                  <View style={[styles.selectedView, { flex: 1 }]}>
                    <Image
                      source={{ uri: listImage[1].url }}
                      style={styles.selectedImage}
                    />
                  </View>
                </View>
                <View style={{ marginBottom: 3 }} />
                <View style={{ flex: 3 }}>
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <View style={[styles.selectedView, { flex: 1 }]}>
                      <Image
                        source={{ uri: listImage[2].url }}
                        style={styles.selectedImage}
                      />
                    </View>
                    <View style={{ marginLeft: 3 }} />
                    <View style={[styles.selectedView, { flex: 1 }]}>
                      <Image
                        source={{ uri: listImage[3].url }}
                        style={styles.selectedImage}
                      />
                    </View>
                    <View style={{ marginLeft: 3 }} />
                    <View style={[styles.selectedView, { flex: 1 }]}>
                      {listImage.length > 5 && (
                        <View style={styles.selectedImageViewCenter}>
                          <Text style={styles.selectedImageTextCenter}>
                            +{listImage.length - 4}
                          </Text>
                        </View>
                      )}
                      <Image
                        source={{ uri: listImage[4].url }}
                        style={styles.selectedImage}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )} */}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    marginBottom: 3,
  },
  imagesContainer: {},
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
  selectedImagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  selectedImage: {
    flex: 1,
  },
  selectedView: {},
  selectedImageView: {
    marginTop: 5,
    height: 320,
    borderWidth: 1,
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
  },
});
