import { memo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { CommentHeader } from "../../components/comment/CommentHeader";
import { CommentBody } from "../../components/comment/CommentBody";
import { CommentFooter } from "../../components/comment/CommentFooter";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComment } from "../../redux/features/comment/commentSlice";

export const CommentScreen = memo(({ route }) => {
    const dispatch = useDispatch();
    const postId = route.params.postId;
    const reactionCounting = route.params.reactionCounting;
    const isLike = route.params.isLike;

    const token = useSelector((state) => state.auth.data.token);

    useEffect(() => {
        console.log("dispatch");
        console.log(postId);
        dispatch(
            getComment({
                id: postId,
                token: token,
            })
        );
    }, []);

    return (
        <ScrollView style={styles.container}>
            <CommentHeader
                isLike={isLike}
                reactionCounting={reactionCounting}
                postId={postId}
            />
            <CommentBody />
            <CommentFooter postId={postId} />
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
    },
});
