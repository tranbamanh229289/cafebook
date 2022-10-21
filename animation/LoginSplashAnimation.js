import { BaseAnimation } from "./BaseAnimation";
import { View, StyleSheet } from "react-native";
export const LoginSplashAnimation = () => {
    return (
        <View style={styles.container}>
            <BaseAnimation 
            source={require("../assets/LoginSplashAnimation.json")}
            width={100}
            height={100}
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
        alignItems: "center"
    }
});