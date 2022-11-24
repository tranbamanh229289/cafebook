import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";
import color from "../../constants/color/color";

export const BirthDayScreen = ({navigation}) => {
    const now = new Date();
    const [dob ,setDob] = useState(now);

    const onDateChange = (date) => {
        setDob(date);
    }
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.header}>What's your birthday?</Text>
                <Text style={styles.sub}>Choose your date of birth. You can always make this private later.</Text>
            </View>
            <View style={styles.inputContainer}>
                <DatePicker date={dob} maximumDate={now} minimumDate={new Date(0)} mode="date" androidVariant="nativeAndroid" onDateChange={onDateChange} style={styles.datePicker}/>
                <Text style={styles.text}>{now.getFullYear() - dob.getFullYear()} Years old</Text>
            </View>
            <View style={styles.nextButton}>
                <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("GenderScreen")}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
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
        justifyContent: "flex-end",
        alignItems: "center"  
    },
    inputContainer: {
        flex: 8,
        justifyContent: "center",
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
        color: color.White
    },
    text: {
        flex: 1,
        fontFamily: "Roboto-Medium",
        fontSize: 16,
    },
    datePicker: {
        marginTop: 15,
        marginBottom: 20,
    }
});