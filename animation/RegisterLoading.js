import { BaseAnimation } from "./BaseAnimation";
import { View, StyleSheet } from "react-native";
import color from "../constants/color/color";
export const RegisterLoading = () => {
    return (
        <View style={styles.container}>
            <BaseAnimation 
            source={require("../assets/98077-facebook-activity.json")}
            width={300}
            height={300}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.White,
    }
});