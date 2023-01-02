import { Text, View, StyleSheet, Dimensions, TouchableHighlight, ScrollView, Image } from "react-native";
import {PostHeader} from "../../components/home-screen/PostHeader";
import {Post, PostFooter} from "../../components/home-screen/PostFooter";
import { useState } from "react";
import color from "../../constants/color/color";

const dataText = `Shopee
Thân gửi bạn prokieumoi310,
 
Chúc mừng bạn đã đăng ký thành công chương trình Người tiêu dùng có sức ảnh hưởng của Shopee (KOC), để bắt đầu tham gia chương trình bạn vui lòng cung cấp các thông tin sau:
 
👉 Các thông tin cần cập nhật lên hệ thống Shopee: Shopee
Thân gửi bạn prokieumoi310,
 
Chúc mừng bạn đã đăng ký thành công chương trình Người tiêu dùng có sức ảnh hưởng của Shopee (KOC), để bắt đầu tham gia chương trình bạn vui lòng cung cấp các thông tin sau:
 
👉 Các thông tin cần cập nhật lên hệ thống Shopee: Shopee
Thân gửi bạn prokieumoi310,
 
Chúc mừng bạn đã đăng ký thành công chương trình Người tiêu dùng có sức ảnh hưởng của Shopee (KOC), để bắt đầu tham gia chương trình bạn vui lòng cung cấp các thông tin sau:
 
👉 Các thông tin cần cập nhật lên hệ thống Shopee: `


const DEVICE_HEIGHT = Dimensions.get("screen").height;
export const PostDetail = () => {
    const [more, setMore] = useState(dataText.length < 450);
    const [bodyText , setBodyText] = useState(dataText);
    const [images, setImages] = useState(["https://nhatrangsensetravel.com/view/at_20-su-that-thu-vi-ve-dat-nuoc-nepal-day-bi-an_5b04f892755f8f5984c92d912505d2a3.jpg"
    ,"https://nhatrangsensetravel.com/view/at_20-su-that-thu-vi-ve-dat-nuoc-nepal-day-bi-an_5b04f892755f8f5984c92d912505d2a3.jpg"
    ,"https://nhatrangsensetravel.com/view/at_20-su-that-thu-vi-ve-dat-nuoc-nepal-day-bi-an_5b04f892755f8f5984c92d912505d2a3.jpg"
    ,"https://nhatrangsensetravel.com/view/at_20-su-that-thu-vi-ve-dat-nuoc-nepal-day-bi-an_5b04f892755f8f5984c92d912505d2a3.jpg"
    ,"https://nhatrangsensetravel.com/view/at_20-su-that-thu-vi-ve-dat-nuoc-nepal-day-bi-an_5b04f892755f8f5984c92d912505d2a3.jpg"
    ,"https://nhatrangsensetravel.com/view/at_20-su-that-thu-vi-ve-dat-nuoc-nepal-day-bi-an_5b04f892755f8f5984c92d912505d2a3.jpg"]);
    return (
      <ScrollView style={styles.container}>
        <PostHeader detail={true} />
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
        <PostFooter />
        {images.map((e, i) => (
          <View style={styles.imageView} key={`image-view-${i}`}>
            <ItemSeparatorComponent/>
            <View style={styles.selectedView}>
              <Image source={{ uri: e }} style={styles.selectedImage} />
            </View>
            <PostFooter/>
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