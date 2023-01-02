import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View } from "react-native";
import color from "../../constants/color/color";

const dataText = `Shopee
Thân gửi bạn prokieumoi310,
 
Chúc mừng bạn đã đăng ký thành công chương trình Người tiêu dùng có sức ảnh hưởng của Shopee (KOC), để bắt đầu tham gia chương trình bạn vui lòng cung cấp các thông tin sau:
 
👉 Các thông tin cần cập nhật lên hệ thống Shopee: `

const DEVICE_HEIGHT = Dimensions.get("screen").height;

export const PostBody = () => {
    const [more, setMore] = useState(dataText.length < 120);
    const [bodyText , setBodyText] = useState(dataText);
    const [images, setImages] = useState(["https://nhatrangsensetravel.com/view/at_20-su-that-thu-vi-ve-dat-nuoc-nepal-day-bi-an_5b04f892755f8f5984c92d912505d2a3.jpg"
    ,"https://nhatrangsensetravel.com/view/at_20-su-that-thu-vi-ve-dat-nuoc-nepal-day-bi-an_5b04f892755f8f5984c92d912505d2a3.jpg"
    ,"https://nhatrangsensetravel.com/view/at_20-su-that-thu-vi-ve-dat-nuoc-nepal-day-bi-an_5b04f892755f8f5984c92d912505d2a3.jpg"
    ,"https://nhatrangsensetravel.com/view/at_20-su-that-thu-vi-ve-dat-nuoc-nepal-day-bi-an_5b04f892755f8f5984c92d912505d2a3.jpg"
    ,"https://nhatrangsensetravel.com/view/at_20-su-that-thu-vi-ve-dat-nuoc-nepal-day-bi-an_5b04f892755f8f5984c92d912505d2a3.jpg"
    ,"https://nhatrangsensetravel.com/view/at_20-su-that-thu-vi-ve-dat-nuoc-nepal-day-bi-an_5b04f892755f8f5984c92d912505d2a3.jpg"]);
    const navigation = useNavigation();

    return (
      <View style={styles.container}>
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
              name: "Sơn Nguyễn",
            })
          }
        >
          <View style={styles.imagesContainer}>
            {images.length === 1 && (
              <View style={{ height: (DEVICE_HEIGHT * 2) / 3 }}>
                <View style={styles.selectedImagesContainer}>
                  <View style={[styles.selectedView, { flex: 1 }]}>
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
                    <Image
                      source={{ uri: images[0] }}
                      style={styles.selectedImage}
                    />
                  </View>
                  <View style={{ marginLeft: 3 }} />
                  <View style={[styles.selectedView, { flex: 1 }]}>
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
                    <Image
                      source={{ uri: images[0] }}
                      style={styles.selectedImage}
                    />
                  </View>
                  <View style={{ marginLeft: 3 }} />
                  <View style={{ flexDirection: "column", flex: 1 }}>
                    <View style={[styles.selectedView, { flex: 1 }]}>
                      <Image
                        source={{ uri: images[1] }}
                        style={styles.selectedImage}
                      />
                    </View>
                    <View style={{ marginBottom: 3 }} />
                    <View style={[styles.selectedView, { flex: 1 }]}>
                      <Image
                        source={{ uri: images[2] }}
                        style={styles.selectedImage}
                      />
                    </View>

                    {images.length === 4 && (
                      <View style={[styles.selectedView, { flex: 1 }]}>
                        <View style={{ marginBottom: 3 }} />
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
                    <Image
                      source={{ uri: images[0] }}
                      style={styles.selectedImage}
                    />
                  </View>
                  <View style={{ marginLeft: 3 }} />
                  <View style={[styles.selectedView, { flex: 1 }]}>
                    <Image
                      source={{ uri: images[1] }}
                      style={styles.selectedImage}
                    />
                  </View>
                </View>
                <View style={{ marginBottom: 3 }} />
                <View style={{ flex: 3 }}>
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <View style={[styles.selectedView, { flex: 1 }]}>
                      <Image
                        source={{ uri: images[2] }}
                        style={styles.selectedImage}
                      />
                    </View>
                    <View style={{ marginLeft: 3 }} />
                    <View style={[styles.selectedView, { flex: 1 }]}>
                      <Image
                        source={{ uri: images[3] }}
                        style={styles.selectedImage}
                      />
                    </View>
                    <View style={{ marginLeft: 3 }} />
                    <View style={[styles.selectedView, { flex: 1 }]}>
                      {images.length > 5 && (
                        <View style={styles.selectedImageViewCenter}>
                          <Text style={styles.selectedImageTextCenter}>
                            +{images.length - 4}
                          </Text>
                        </View>
                      )}
                      <Image
                        source={{ uri: images[4] }}
                        style={styles.selectedImage}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textContainer: {
      marginBottom: 3,
    },
    imagesContainer: {
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
    selectedImagesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1,
      },
      selectedImage: {
        flex: 1,
      },
      selectedView: {
      },
      selectedImageView: {
        marginTop: 5,
        height: 320,
        borderWidth: 1,
      },
      selectedImageTextCenter: {
        color: color.White,
        fontSize: 24
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