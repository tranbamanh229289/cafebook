import { Text, TouchableHighlight, View, StyleSheet } from "react-native";
import { Avatar } from "../home-screen/Avatar";

export const CommentElement = ({ item }) => {
    const historyComment = (time) => {
        const currentDate = new Date();
        const currentTime = currentDate.getTime() / 1000;
        const history = currentTime - time;
        if (history > 86400) {
            return Math.round(history / 86400) + " ngày trước";
        } else {
            if (history > 3600) {
                return Math.round(history / 3600) + " giờ trước";
            } else {
                if (history > 60) {
                    return Math.round(history / 60) + " phút trước";
                } else {
                    return Math.round(history) + " giây trước";
                }
            }
        }
    };
    return (
        <View style={styles.container}>
            <View>
                <Avatar width={35} height={35} source={item.poster.avatar} />
            </View>
            <View style={styles.comment}>
                <View style={styles.contentComment}>
                    <Text style={styles.name}>{item.poster.name}</Text>
                    <Text>{item.comment}</Text>
                </View>
                <View style={styles.timeLikeReply}>
                    <Text style={styles.textTimeLikeReply}>
                        {historyComment(item.created)}
                    </Text>
                    <TouchableHighlight>
                        <Text style={styles.textTimeLikeReply}>Thích</Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text style={styles.textTimeLikeReply}>Phản hồi</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        marginBottom: 15,
        paddingRight: 10,
        paddingLeft: 10,
    },
    comment: {
        marginLeft: 7,
        alignItems: "flex-start",
    },
    contentComment: {
        backgroundColor: "#f0f2f5",
        borderRadius: 20,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    name: {
        fontWeight: "700",
    },
    timeLikeReply: {
        flexDirection: "row",
        marginLeft: 10,
    },
    textTimeLikeReply: {
        fontSize: 12,
        fontWeight: "500",
        color: "#65676b",
        marginRight: 15,
    },
});
