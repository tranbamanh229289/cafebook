import { ScrollView, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { CommentElement } from "./CommentElement";

export const CommentBody = () => {
    const listComment = useSelector((state) => state.comment.listComment);

    return (
        <ScrollView style={{ height: 250 }}>
            <View>
                {listComment.map((item, index) => (
                    <CommentElement item={item} key={index} />
                ))}
            </View>
        </ScrollView>
    );
};
