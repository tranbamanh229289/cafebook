import { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import color from "../../constants/color/color";

export const PostBody = () => {
    const [more, setMore] = useState(false);
    const [bodyText , setBodyText] = useState(`Shopee
    Thân gửi bạn prokieumoi310,
     
    Chúc mừng bạn đã đăng ký thành công chương trình Người tiêu dùng có sức ảnh hưởng của Shopee (KOC), để bắt đầu tham gia chương trình bạn vui lòng cung cấp các thông tin sau:
     
    👉 Các thông tin cần cập nhật lên hệ thống Shopee: `);
    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.textContainer} underlayColor={color.TouchableHighlightBorderWhite} onPress={()=>{}}>
                <Text style={styles.text}>
                    {bodyText}
                </Text>
            </TouchableHighlight>
            <View style={styles.imagesContainer}>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    textContainer: {

    },
    imagesContainer: {

    },
    text: {
        paddingLeft: "3.5%",
        paddingRight: "3.5%"
    }
});