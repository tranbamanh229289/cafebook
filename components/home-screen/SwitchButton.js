import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import color from "../../constants/color/color";

export const SwitchButton = ({renderList, setRenderList}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={()=>{setRenderList(0)}}>
                <Text style={[styles.text, renderList === 0 && styles.textFocus]}>Stories</Text>
                {renderList === 0 && <View style={styles.indicator}/>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>{setRenderList(1)}}>
                <Text style={[styles.text, renderList === 1 && styles.textFocus]}>Reels</Text>
                {renderList === 1 && <View style={styles.indicator}/>}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: "15%",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#eeeeee",
    },
    button: {
        justifyContent: "center",
        height: "100%",
        flex: 1,
        alignItems: "center",
    },
    text: {
        textAlignVertical: "center",
        height: "96%",
        fontSize: 15,
        fontFamily: "open-sans",
        fontWeight: "700",
        color: color.GrayText
    },
    textFocus: {
        color: color.MainBlue
    },
    indicator: {
        width: "80%",
        borderBottomColor: color.MainBlue,
        borderBottomWidth: 2
    }
});