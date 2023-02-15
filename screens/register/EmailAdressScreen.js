import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { FloatingLabelTextInput } from "../../components/register/FloatingLabelTextInput";
import color from "../../constants/color/color";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputAccount } from "../../redux/features/auth/authSlice";
import { registerMessage } from "../../utils/message/responseMessage";

export const EmailAddressScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.auth.account);
    const [email, setEmail] = useState("");
    const changeEmail = useCallback(
        (val) => {
            setEmail(val);
        },
        [email]
    );
    const [error, setError] = useState({
        email: {
            status: false,
            message: "",
        },
    });

    const changeError = useCallback(
        (status, message) => {
            setError({
                email: {
                    status: status,
                    message: message,
                },
            });
        },
        [(error, email)]
    );

    const validate = () => {
        if (!email) {
            changeError(true, registerMessage.required);
            return false;
        }

        if (!/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(email)) {
            changeError(true, registerMessage.invalidEmail);
            return false;
        }

        changeError(false, "");
        return true;
    };

    const handleNext = useCallback(() => {
        const validateEmail = validate();

        if (validateEmail) {
            dispatch(
                inputAccount({
                    email: email,
                })
            );
            navigation.navigate("PasswordScreen");
        }
    }, [email]);

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }} />
            <View style={styles.textContainer}>
                <Text style={styles.header}>Enter your email address</Text>
                <Text style={styles.sub}>
                    Enter the email where you can be reached. You can hide this
                    from your profile later.
                </Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={styles.inputContainer}>
                <FloatingLabelTextInput
                    placeholder="Email address"
                    width="90%"
                    fullWidth={true}
                    error={error.email}
                    onChangeVal={changeEmail}
                />
            </View>
            <View style={styles.nextButton}>
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.signupWithAnother}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={styles.textHighlight}>
                        Sign up with mobile number
                    </Text>
                </Pressable>
            </View>
            <View style={styles.br} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White,
        flexDirection: "column",
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
        flexDirection: "column",
    },
    header: {
        fontSize: 18,
        marginBottom: 12,
        fontFamily: "Roboto-Medium",
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
        color: color.White,
    },
    signupWithAnother: {
        flex: 6,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    textHighlight: {
        color: color.MainBlue,
        fontFamily: "Roboto-Medium",
    },
    br: {
        height: 10,
    },
});
