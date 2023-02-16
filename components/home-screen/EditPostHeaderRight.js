import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import color from "../../constants/color/color";
import { editPost, updateImageAfterEdit } from "../../redux/features/post/postSlice";

export const EditPostHeaderRight = () => {
    const token = useSelector((state) => state.auth.data.token);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const postId = useSelector((state) => state.post.editPostId);
    const images = useSelector(state => state.post.images)

    const handleEditPost = () => {
        dispatch(editPost({id: postId}))
        .unwrap()
        .then((res) => {
            dispatch(updateImageAfterEdit({id: postId, token: token}))
            .then(() => navigation.navigate("MyProfile"));
        })
        .catch(err => console.log(err))
    }
    
    return (
        <TouchableOpacity style={styles.container} onPress={handleEditPost}>
            <Text style={styles.text}>EDIT</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 36,
        backgroundColor: color.MainBlue,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8
    },
    text: {
        color: color.White
    }
});