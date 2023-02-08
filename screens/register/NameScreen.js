import { useNavigation } from "@react-navigation/native";
import { useState, useCallback } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { FloatingLabelTextInput } from "../../components/register/FloatingLabelTextInput";
import color from "../../constants/color/color";
import { useDispatch, useSelector } from "react-redux";
import { inputAccount } from "../../redux/features/auth/authSlice";
import { registerMessage } from "../../utils/message/responseMessage";

export const NameScreen = () => {
    const account = useSelector((state) => state.auth.account);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [name, setName] = useState({
        firstName: account.firstName,
        lastName: account.lastName,
    });
    const changeFirstName = useCallback(
        (val) => {
            setName((prev) => {
                return {
                    ...prev,
                    firstName: val,
                };
            });
        },
        [name]
    );
    const changeLastName = useCallback(
        (val) => {
            setName((prev) => {
                return {
                    ...prev,
                    lastName: val,
                };
            });
        },
        [name]
    );

    const [error, setError] = useState({
        firstName: {
            status: false,
            message: "",
        },
        lastName: {
            status: false,
            message: "",
        },
    });

    const changeError = useCallback(
        (keyName, status, message) => {
            setError((prev) => {
                return {
                    ...prev,
                    [keyName]: {
                        status: status,
                        message: message,
                    },
                };
            });
        },
        [error, name]
    );

    const validate = (keyName) => {
        if (!name[keyName]) {
            changeError(keyName, true, registerMessage.required);
            return false;
        }

        if (!/^[a-zA-Z ]+$/.test(name[keyName])) {
            changeError(keyName, true, registerMessage.invalidName);
            return false;
        }

        changeError(keyName, false, "");
        return true;
    };

    const handleNext = useCallback(() => {
        let validateFirstName = validate("firstName");
        let validateLastName = validate("lastName");

        if (validateFirstName && validateLastName) {
            dispatch(inputAccount(name));
            navigation.navigate("BirthDayScreen");
        }
    }, [name]);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.textContainer}>
                <Text style={styles.header}>What's your name?</Text>
                <Text style={styles.sub}>
                    Enter the name you use in real life.
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <FloatingLabelTextInput
                    placeholder="First Name"
                    keyName="firstName"
                    val={name.firstName}
                    onChangeVal={changeFirstName}
                    error={error.firstName}
                />
                <FloatingLabelTextInput
                    placeholder="Last Name"
                    keyName="lastName"
                    val={name.lastName}
                    onChangeVal={changeLastName}
                    error={error.lastName}
                />
            </View>
            <View style={styles.nextButton}>
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
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
        flex: 4,
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    header: {
        fontSize: 18,
        marginBottom: 12,
        fontFamily: "Roboto-Medium",
    },
    sub: {
        color: color.GrayText,
        fontSize: 14,
    },
    nextButton: {
        flex: 8,
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
});
