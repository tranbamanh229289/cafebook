import { useState } from "react";
import { StyleSheet, View} from "react-native";
import color from "../../constants/color/color";

export const CheckBoxCircle = ({selected}) => {
    return (
        <View style={styles.container}>
            <View style={selected && styles.selected} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 18,
        height: 18,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#b3b3b3",
        justifyContent: "center",
        alignItems: "center"
    },
    selected: {
        backgroundColor: color.CornflowerBlue,
        width: 10,
        height: 10,
        borderRadius: 12
    },
    
});