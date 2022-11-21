import { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import color from "../../constants/color/color";

const dataText = `Shopee
Thân gửi bạn prokieumoi310,
 
Chúc mừng bạn đã đăng ký thành công chương trình Người tiêu dùng có sức ảnh hưởng của Shopee (KOC), để bắt đầu tham gia chương trình bạn vui lòng cung cấp các thông tin sau:
 
👉 Các thông tin cần cập nhật lên hệ thống Shopee: `

export const PostBody = () => {
    const [more, setMore] = useState(dataText.length < 120);
    const [bodyText , setBodyText] = useState(dataText);

    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.textContainer} underlayColor={color.TouchableHighlightBorderWhite} onPress={()=>{setMore(prev => !prev)}}>
                {more ? 
                <Text style={styles.text}>{bodyText}</Text>
                    :
                <>
                    <Text style={styles.text}>{bodyText.slice(0,120) + " ... "}
                        <TouchableHighlight underlayColor={color.TouchableHighlightBorderWhite} onPress={()=>{setMore(true)}}><Text style={styles.textSeeMore}>See more</Text></TouchableHighlight>
                    </Text>
                </>
                }
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
        paddingRight: "3.5%",
        fontSize: 16,
    },
    textSeeMore: {
        color: color.TextGray,
        alignSelf: "center",
        fontSize: 16,
    },
});