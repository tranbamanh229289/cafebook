import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { FloatingLabelTextInput } from "../../components/register/FloatingLabelTextInput";
import color from "../../constants/color/color";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputAccount } from "../../redux/features/auth/authSlice";
import { registerMessage } from "../../utils/message/responseMessage";

export const MobileNumberScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.auth.account);
    const [phoneNumber, setPhoneNumber] = useState(account.phoneNumber);
    const changePhoneNumber = useCallback(
        (val) => {
            setPhoneNumber(val);
        },
        [phoneNumber]
    );
    const [error, setError] = useState({
        phoneNumber: {
            status: false,
            message: "",
        },
    });

    const changeError = useCallback(
        (status, message) => {
            setError({
                phoneNumber: {
                    status: status,
                    message: message,
                },
            });
        },
        [(error, phoneNumber)]
    );

    const validate = () => {
        if (!phoneNumber) {
            changeError(true, registerMessage.required);
            return false;
        }

        if (
            !(
                /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(
                    phoneNumber
                ) && phoneNumber.length >= 10
            )
        ) {
            changeError(true, registerMessage.invalidPhonenumber);
            return false;
        }

        changeError(false, "");
        return true;
    };

    const handleNext = useCallback(() => {
        const validatePhoneNumber = validate();
        if (validatePhoneNumber) {
            dispatch(
                inputAccount({
                    phoneNumber: phoneNumber,
                })
            );
            navigation.navigate("PasswordScreen");
        }
    }, [phoneNumber]);

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }} />
            <View style={styles.textContainer}>
                <Text style={styles.header}>Enter your mobile number</Text>
                <Text style={styles.sub}>
                    Enter the mobile number where you can be reached. You can
                    hide this from your profile later.
                </Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={styles.inputContainer}>
                <FloatingLabelTextInput
                    placeholder="Mobile number"
                    width="90%"
                    fullWidth={true}
                    keyboardType="number-pad"
                    error={error.phoneNumber}
                    onChangeVal={changePhoneNumber}
                    val={phoneNumber}
                />
            </View>
            <View style={styles.nextButton}>
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.signupWithAnother}>
                <Pressable
                    onPress={() => {
                        navigation.navigate("EmailAddressScreen");
                    }}
                >
                    <Text style={styles.textHighlight}>
                        Sign up with email address
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
