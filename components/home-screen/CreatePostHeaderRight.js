import { Button, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import color from "../../constants/color/color";

export const CreatePostHeaderRight = () => {
    return (
        <View style={styles.container}>
            <TouchableHighlight>
                <Text></Text>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 60,

    }
});