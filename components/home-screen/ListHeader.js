import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import color from "../../constants/color/color";
import { BodyListHeader } from "./BodyListHeader";
import { TopBarListHeader } from "./TopBarListHeader";

export const ListHeader = () => {
    return (
        <View style={styles.container}>
            <TopBarListHeader/>
            <View style={styles.gap}/>
            <BodyListHeader/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 356,
        backgroundColor: color.TouchableHighlightBorderWhite,
    },
    gap: {
        height: "3%",
    }
});