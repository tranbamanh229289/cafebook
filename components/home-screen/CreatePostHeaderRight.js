import { Button, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import color from "../../constants/color/color";

export const CreatePostHeaderRight = () => {
    return (
        <TouchableOpacity style={styles.container}>
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