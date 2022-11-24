import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FloatingLabelTextInput } from "../../components/register/FloatingLabelTextInput";
import color from "../../constants/color/color";

export const EmailAddressScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={{flex: 1}}/>
            <View style={styles.textContainer}>
                <Text style={styles.header}>Enter your email address</Text>
                <Text style={styles.sub}>Enter the email where you can be reached. You can hide this from your profile later.</Text>
            </View>
            <View style={{flex: 1}}/>
            <View style={styles.inputContainer}>
                <FloatingLabelTextInput placeholder="Email address" width="90%" fullWidth={true}/>
            </View>
            <View style={styles.nextButton}>
                <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("PasswordScreen")}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.signupWithAnother}>
                <Pressable onPress={()=>navigation.goBack()}>
                    <Text style={styles.textHighlight}>Sign up with mobile number</Text>
                </Pressable>
            </View>
            <View style={styles.br}/>
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
        flex: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        flex: 4,
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
        flex: 4,
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
    signupWithAnother: {
        flex: 6,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    textHighlight: {
        color: color.MainBlue,
        fontFamily: "Roboto-Medium"
    },
    br: {
        height: 10,
    }
});