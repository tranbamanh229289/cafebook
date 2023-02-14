import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import color from "../../constants/color/color";
import { addPost } from "../../redux/features/post/postSlice";

export const CreatePostHeaderRight = () => {
    const navigation = useNavigation();

    const handleUploadPost = () => {
        dispatch(addPost())
        .unwrap()
        .then((res) => {
            navigation.navigate("HomeScreen")
        })
        .catch(err => console.log(err))
    }
    const dispatch = useDispatch();
    return (
        <TouchableOpacity style={styles.container} onPress={handleUploadPost}>
            <Text style={styles.text}>POST</Text>
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