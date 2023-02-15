import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FloatingLabelTextInput } from "../../components/register/FloatingLabelTextInput";
import color from "../../constants/color/color";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputAccount } from "../../redux/features/auth/authSlice";
import { registerMessage } from "../../utils/message/responseMessage";

export const PasswordScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.auth.account);
    const [password, setPassword] = useState(account.password);
    const changePassword = useCallback(
        (val) => {
            setPassword(val);
        },
        [password]
    );

    const [error, setError] = useState({
        password: {
            status: false,
            message: "",
        },
    });

    const changeError = useCallback(
        (status, message) => {
            setError({
                password: {
                    status: status,
                    message: message,
                },
            });
        },
        [(error, password)]
    );

    const validate = () => {
        if (!password) {
            changeError(true, registerMessage.required);
            return false;
        }

        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
            changeError(true, registerMessage.invalidPassword);
            return false;
        }

        changeError(false, "");
        return true;
    };

    const handleNext = useCallback(() => {
        const validatePassword = validate();
        if (validatePassword) {
            dispatch(
                inputAccount({
                    password: password,
                })
            );
            navigation.navigate("TermAndPrivacyScreen");
        }
    }, [password]);

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }} />
            <View style={styles.textContainer}>
                <Text style={styles.header}>Choose a password</Text>
                <Text style={styles.sub}>
                    Create a password with at least 6 characters. It should be
                    something others couldn't guess.
                </Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={styles.inputContainer}>
                <FloatingLabelTextInput
                    placeholder="Password"
                    width="90%"
                    fullWidth={true}
                    val={password}
                    onChangeVal={changePassword}
                    error={error.password}
                />
            </View>
            <View style={{ flex: 1 }} />
            <View style={styles.nextButton}>
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 7 }} />
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
        flex: 3,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    inputContainer: {
        flex: 2,
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
        color: color.White,
    },
    textHighlight: {
        color: color.MainBlue,
        fontFamily: "Roboto-Medium",
    },
    br: {
        height: 10,
    },
});
