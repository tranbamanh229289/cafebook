import { AntDesign } from "@expo/vector-icons";
import color from "../../constants/color/color";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../redux/features/post/postSlice";

export const CommentHeader = ({ isLike, reactionCounting, postId }) => {
    const dispatch = useDispatch();
    const [like, setLike] = useState(isLike);
    const [numLike, setNumLike] = useState(reactionCounting);
    const token = useSelector((state) => state.auth.data.token);

    const handleLike = () => {
        dispatch(likePost({ token, postId }));
        if (!like) {
            setNumLike((prev) => prev + 1);
        } else {
            setNumLike((prev) => prev - 1);
        }
        setLike((prev) => !prev);
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.iconBorder}>
                    <LikeIconSmall />
                </View>
                <Text style={styles.textNumLike}>{numLike}</Text>
                <AntDesign name="right" size={22} color="black" />
            </View>

            <TouchableOpacity onPress={handleLike}>
                <View>{like ? <LikeIconFocus /> : <LikeIcon />}</View>
            </TouchableOpacity>
        </View>
    );
};

const LikeIcon = () => (
    <AntDesign name="like2" size={20} color={color.ButtonIcon} />
);

const LikeIconFocus = () => (
    <AntDesign name="like1" size={20} color={color.MainBlue} />
);

const LikeIconSmall = () => (
    <AntDesign name="like1" size={10} color="#fffcfe" />
);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 10,
        paddingLeft: 10,
        marginBottom: 10,
    },

    iconBorder: {
        width: 18,
        height: 18,
        borderRadius: 10,
        backgroundColor: "#2d92fc",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 5,
    },
    textNumLike: {
        fontSize: 18,
        fontWeight: "700",
    },
});
