import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import color from "../../constants/color/color";
import { Avatar } from "./Avatar";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export const TopBarListHeader = () => {
    const linkAvatar = useSelector((state) => state.user.user.avatar);
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.avatar}>
                <Avatar source={linkAvatar}/>
            </TouchableOpacity >
            <View style={styles.postViewButton}>
                <TouchableHighlight style={styles.touchableHighlight} onPress={()=>{navigation.navigate('CreatePost')}} underlayColor={color.TouchableHighlightBorderWhite}>
                        <Text style={styles.text}>What's on your mind?</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.selectImage}>
                <TouchableHighlight underlayColor={color.TouchableHighlightBorderWhite} onPress={()=>{}} style={styles.imageTouchable}>
                    <Feather name="image" size={24} color={color.greenIcon}/>
                </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "17%",
        backgroundColor: color.White,
        flexDirection: "row",
    },
    avatar: {
        flex: 3,
        justifyContent: "center",
        alignItems: "flex-end"
    },
    postViewButton: {
        flex: 16,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    selectImage: {
        flex: 3,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    touchableHighlight: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: color.TouchableHighlightBorderWhite,
        justifyContent: "center",
        alignItems: "flex-start",
        width: "95%",
        marginLeft: "3%",
        height: "60%",
        paddingLeft: "6%",
    },
    text: {
        fontSize: 16,
    },
    imageTouchable: {
        width: 36,
        height: 36,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "5%",
    }
});