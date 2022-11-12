import { StyleSheet, Text, View } from "react-native";
import { PostBody } from "./PostBody";
import { PostFooter } from "./PostFooter";
import { PostHeader } from "./PostHeader";

export const Post = () => {
    return  (
        <View style={styles.container}>
            <View style={styles.header}>
                <PostHeader/>
            </View>
            <View style={styles.body}>
                <PostBody/>
            </View>
            <View style={styles.footer}>
                <PostFooter />
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