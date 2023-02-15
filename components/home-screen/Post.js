import { StyleSheet, View } from "react-native";
import { PostBody } from "./PostBody";
import { PostFooter } from "./PostFooter";
import { PostHeader } from "./PostHeader";

export const Post = ({avatar , username, images, described, like, is_liked, comment, created}) => {
    return  (
        <View style={styles.container}>
            <View style={styles.header}>
                <PostHeader avatar={avatar} username={username} created={created}/>
            </View>
            <View style={styles.body}>
                <PostBody images={images} described={described} avatar={avatar} username={username} like={like} comment={comment} is_liked={is_liked} created={created}/>
            </View>
            <View style={styles.footer}>
                <PostFooter like={like} is_liked={is_liked} comment={comment}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    header: {
        flex: 1,
    },
    body: {
        flex: 5,
    },
    footer: {
        height: 93,
    }
});