import { useEffect, useState } from "react";
import { Image, ImageBackground, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import color from "../../constants/color/color";
import { DiscardModal } from "../../components/register/DiscardModal";

export const CreateAccountScreen = ({navigation, route}) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/register.jpg")} resizeMode="cover" style={styles.image}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.header}>Join Cafebook</Text>
                <Text style={styles.text}>We'll help you create a new account in a few easy steps.</Text>
            </View>
            <View style={styles.nextButton}>
                <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("NameScreen")}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText} onPress={()=> {setModalVisible(true); StatusBar.setBackgroundColor(color.StatusBarBackgroundBlur); StatusBar.setBarStyle("light-content")}}>Already have an account?</Text>
            </View>
            <DiscardModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: color.White,
        flexDirection: "column"
    },
    imageContainer: {
        width: "100%",
    },
    image: {
        width: "100%",
        height: 290,
    },
    textContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    header: {
        fontSize: 20,
        fontFamily: "asap-semi",
        fontWeight: "normal",
        marginBottom: 10
    },
    text: {
        fontSize: 14,
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: color.GrayText
    },
    nextButton: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    footer: {
        flex: 4,
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 12,
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
    footerText: {
        fontFamily: "open-sans",
        fontWeight: "bold",
        color: color.MainBlue
    }
});