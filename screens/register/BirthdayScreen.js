import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";
import color from "../../constants/color/color";
import { useDispatch, useSelector } from "react-redux";
import { inputAccount } from "../../redux/features/auth/authSlice";
import { registerMessage } from "../../utils/message/responseMessage";

export const BirthDayScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.auth.account);
    const now = new Date();
    const [dob, setDob] = useState(now);
    const [error, setError] = useState({
        birthday: {
            status: false,
            message: "",
        },
    });
    const changeError = useCallback(
        (status, message) => {
            setError({
                birthday: {
                    status: status,
                    message: message,
                },
            });
        },
        [error]
    );

    const onDateChange = (date) => {
        setDob(date);
    };

    const validate = () => {
        if (now.getFullYear() - dob.getFullYear() < 18) {
            changeError(true, registerMessage.invalidBirthday);
            return false;
        }
        changeError(false, "");
        return true;
    };
    const handleNext = useCallback(() => {
        const validateBirthday = validate();
        if (validateBirthday) {
            dispatch(
                inputAccount({
                    birthday: dob.toString(),
                })
            );
            navigation.navigate("GenderScreen");
        }
    }, [dob]);
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.header}>What's your birthday?</Text>
                <Text style={styles.sub}>
                    Choose your date of birth. You can always make this private
                    later.
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <DatePicker
                    date={dob}
                    maximumDate={now}
                    minimumDate={new Date(0)}
                    mode="date"
                    androidVariant="nativeAndroid"
                    onDateChange={onDateChange}
                    style={styles.datePicker}
                />
                <Text style={styles.text}>
                    {now.getFullYear() - dob.getFullYear()} Years old
                </Text>
                {error.birthday.status && (
                    <Text style={styles.error}>{error.birthday.message}</Text>
                )}
            </View>
            <View style={styles.nextButton}>
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
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
        justifyContent: "flex-end",
        alignItems: "center",
    },
    inputContainer: {
        flex: 8,
        justifyContent: "center",
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
    },
    nextButton: {
        flex: 7,
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
    text: {
        flex: 1,
        fontFamily: "Roboto-Medium",
        fontSize: 16,
    },
    datePicker: {
        marginTop: 15,
        marginBottom: 20,
    },
    error: {
        flex: 1,
        color: "red",
    },
});
