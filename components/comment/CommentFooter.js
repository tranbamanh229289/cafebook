import { StyleSheet, TouchableHighlight, View } from "react-native";
import { InputField } from "./InputField";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendComment } from "../../redux/features/comment/commentSlice";

export const CommentFooter = ({ postId }) => {
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.data.token);
    const handleChangeComment = (text) => {
        setComment(text);
    };

    const handleSendComment = () => {
        if (comment) {
            dispatch(
                sendComment({
                    comment: comment,
                    id: postId,
                    token: token,
                })
            );
            setComment("");
        }
    };

    return (
        <View style={styles.container}>
            <InputField value={comment} changeComment={handleChangeComment} />
            <View style={styles.options}>
                <View style={styles.leftOptions}>
                    <TouchableHighlight style={styles.option}>
                        <Feather name="camera" size={24} color="black" />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.option}>
                        <MaterialCommunityIcons
                            name="emoticon-happy-outline"
                            size={24}
                            color="black"
                        />
                    </TouchableHighlight>
                </View>
                <View>
                    <TouchableHighlight onPress={handleSendComment}>
                        <Feather name="send" size={24} color="black" />
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
    },
    options: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingRight: 10,
    },
    leftOptions: {
        flexDirection: "row",
    },
    option: {
        marginRight: 5,
    },
});
