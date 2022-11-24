import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FloatingLabelTextInput } from "../../components/register/FloatingLabelTextInput";
import color from "../../constants/color/color";

export const PasswordScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={{flex: 1}}/>
            <View style={styles.textContainer}>
                <Text style={styles.header}>Choose a password</Text>
                <Text style={styles.sub}>Create a password with at least 6 characters. It should be something others couldn't guess.</Text>
            </View>
            <View style={{flex: 1}}/>
            <View style={styles.inputContainer}>
                <FloatingLabelTextInput placeholder="Password" width="90%" fullWidth={true}/>
            </View>
            <View style={{flex: 1}}/>
            <View style={styles.nextButton}>
                <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("TermAndPrivacyScreen")}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 7}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White,
        flexDirection: "column"
    },
    textContainer: {
        flex: 3,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    inputContainer: {
        flex: 2,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column"
    },
    header: {
        fontSize: 18,
        marginBottom: 12,
        fontFamily: "Roboto-Medium"
    },
    sub: {
        textAlign: "center",
        color: color.GrayText,
        fontSize: 14,
        width: "90%",
    },
    nextButton: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    button: {
        width: "90%",
        backgroundColor: color.MainBlue,
        height: 42,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
    },
    buttonText: {
        color: color.White
    },
    textHighlight: {
        color: color.MainBlue,
        fontFamily: "Roboto-Medium"
    },
    br: {
        height: 10,
    }
});