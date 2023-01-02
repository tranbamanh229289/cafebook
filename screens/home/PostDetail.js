import { Text, View, StyleSheet, Dimensions, TouchableHighlight, ScrollView, Image, TouchableWithoutFeedback } from "react-native";
import {PostHeader} from "../../components/home-screen/PostHeader";
import {Post, PostFooter} from "../../components/home-screen/PostFooter";
import { useState } from "react";
import color from "../../constants/color/color";
import { useNavigation } from "@react-navigation/native";

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
    const [images, setImages] = useState(["https://static.kinhtedothi.vn/w960/images/upload/2022/12/04/leo3.jpg"
    ,"https://nds-static.vtc.gov.vn/media/74c6eaa3-6c54-40b7-ad6b-732200dfb9a8/221203200749-lionel-messi-celebrating-argentina-australia-tease.jpg"
    ,"https://media.newyorker.com/photos/638ccd015df5752861a95aee/1:1/w_1707,h_1707,c_limit/Messi_Argentina%20v.%20Mexico.png"
    ,"https://nhatrangsensetravel.com/view/at_20-su-that-thu-vi-ve-dat-nuoc-nepal-day-bi-an_5b04f892755f8f5984c92d912505d2a3.jpg"
    ,"https://nhatrangsensetravel.com/view/at_20-su-that-thu-vi-ve-dat-nuoc-nepal-day-bi-an_5b04f892755f8f5984c92d912505d2a3.jpg"
    ,"https://nhatrangsensetravel.com/view/at_20-su-that-thu-vi-ve-dat-nuoc-nepal-day-bi-an_5b04f892755f8f5984c92d912505d2a3.jpg"]);

    const navigation = useNavigation();
    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
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
            <ItemSeparatorComponent />
            <TouchableWithoutFeedback
              style={styles.selectedView}
              onPress={() => {
                navigation.navigate("ShowImage", {
                  uri: e,
                  name: "Son Nguyen",
                  time: "3 hours ago",
                  text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                });
              }}
            >
              <Image source={{ uri: e }} style={styles.selectedImage} />
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