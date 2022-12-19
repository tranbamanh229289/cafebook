import { useNavigation } from "@react-navigation/native";
import { useState, useCallback } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { FloatingLabelTextInput } from "../../components/register/FloatingLabelTextInput";
import color from "../../constants/color/color";

export const NameScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState({
        firstName: '',
        lastName:'',
    })

    console.log(name)
    const changeName = useCallback((keyName)=> {
        return (val)=> {
            setName(prev=> {
                return {
                    ...prev,
                    [keyName]: val,
                }
            })
        }
    }, [name])

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.textContainer}>
                <Text style={styles.header}>What's your name?</Text>
                <Text style={styles.sub}>Enter the name you use in real life.</Text>
            </View>
            <View style={styles.inputContainer}>
                <FloatingLabelTextInput placeholder="First Name" keyName="firstName" val={name.firstName} onChangeVal= {changeName} />
                <FloatingLabelTextInput placeholder="Last Name" keyName="lastName" val={name.lastName} onChangeVal= {changeName} />
            </View>
            <View style={styles.nextButton}>
                <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("BirthDayScreen")}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
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
        justifyContent: "flex-end",
        alignItems: "center"  
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
        fontFamily: "Roboto-Medium"
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
        color: color.White
    },
});