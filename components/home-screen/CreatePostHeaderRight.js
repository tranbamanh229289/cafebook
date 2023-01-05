import { Button, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import color from "../../constants/color/color";
import {submit} from "../../redux/features/createPost/createPostSlice"

export const CreatePostHeaderRight = () => {
    const dispatch = useDispatch();
    return (
        <TouchableOpacity style={styles.container} onPress={()=> dispatch(submit())}>
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