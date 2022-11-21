import { StyleSheet, Text, TextInput, View } from "react-native"
import color from "../../constants/color/color";

export const NameScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.header}>What's your name?</Text>
                <Text style={styles.sub}>Enter the name you use in real life.</Text>
            </View>
            <View style={styles.inputContainer}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White,
        flexDirection: "column"
    },
    textContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center"  
    },
    inputContainer: {
        flex: 7,
        flexDirection: "column"
    },
    header: {
        fontSize: 20,
        marginBottom: 12,
        fontFamily: "Roboto-Medium"
    },
    sub: {
        color: color.GrayText,
        fontSize: 16,
    }
});