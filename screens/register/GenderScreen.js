import { useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import color from "../../constants/color/color";

export const GenderScreen = ({navigation}) => {
    const [selected, setSelected] = useState(1);

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.header}>What's your gender?</Text>
                <Text style={styles.sub}>You can change who sees your gender on your profile later.</Text>
            </View>
            <View style={styles.inputContainer}>
                <Pressable style={styles.selectInput} onPress={()=>{setSelected(1)}}>
                    <Text style={styles.text}>Female</Text>
                    <View style={[styles.buttonContainer, selected === 1 && { borderColor: color.MainBlue }]}>
                        <View style={selected === 1 && styles.selected}/>
                    </View>
                </Pressable>
                <Pressable style={styles.selectInput} onPress={()=>{setSelected(2)}}>
                    <Text style={styles.text}>Male</Text>
                    <View style={[styles.buttonContainer, selected === 2 && { borderColor: color.MainBlue }]}>
                        <View style={selected === 2 && styles.selected}/>
                    </View>
                </Pressable>
                <Pressable style={[styles.selectInput , {height: 100}]} onPress={()=>{setSelected(3)}}>
                    <View style={styles.customText}>
                        <Text style={styles.text}>Custom</Text>
                        <Text style={styles.subText}>Select Custom to choose another gender, or if you'd rather not say.</Text>
                    </View>
                    <View style={[styles.buttonContainer, selected === 3 && { borderColor: color.MainBlue }]}>
                        <View style={selected === 3 && styles.selected}/>
                    </View>
                </Pressable>
            </View>
            <View style={styles.nextButton}>
                <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("MobileNumberScreen")}>
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
        alignItems: "center",
    },
    inputContainer: {
        flex: 10,
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
        width: "90%"
    },
    nextButton: {
        flex: 9,
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
    selectInput: {
        width: "90%",
        borderBottomWidth: 1,
        borderBottomColor: color.HeaderBorderColor,
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "center",
        height: 50
    },
    text: {
        width: "95%",
        fontFamily: "Roboto-Medium",
        fontSize: 16
    },
    buttonContainer: {
        width: 16,
        height: 16,
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    selected: {
        borderWidth: 1,
        width: 10,
        height: 10,
        borderRadius: 6,
        backgroundColor: color.MainBlue,
        borderColor: color.MainBlue
    },
    customText: {
        width: "95%",
    },
    subText: {
        marginTop: 10,
        color: color.GrayText
    }
});