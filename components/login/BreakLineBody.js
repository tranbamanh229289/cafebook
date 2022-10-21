import { StyleSheet, Text, View } from "react-native";

export const BreakLineBody = () => {
    return (
        <View style={styles.container}>
            <View style={styles.line}/>
            <View style={styles.textView}>
                <Text style={styles.text}>HOẶC</Text>
            </View>
            <View style={styles.line}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: "9%",
        width: '90%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    line: {
        flex: 1,
        borderBottomColor: "#c9c9c9",
        borderBottomWidth: 1,
    },
    textView: {
        width: 50,
    },
    text: {
        alignSelf: "center",
        color: "#5f5f5f",
        fontSize: 14
    }
});