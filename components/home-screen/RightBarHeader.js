import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { Entypo } from '@expo/vector-icons';
import color from "../../constants/color/color";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


export const RightBarHeader = () => {
    const navigation = useNavigation();
    return (
        <Animated.View style={styles.container}>
            <View style={styles.iconContainer}>
                <Entypo name="plus" size={30} color="black" />
            </View>
            <TouchableOpacity style={styles.iconContainer} onPress={()=>navigation.navigate("Search")}>
                <Ionicons name="search" size={22} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
                <FontAwesome5 name="facebook-messenger" size={22} color="black" onPress={()=>navigation.navigate("Message")}/>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "45%",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    iconContainer: {
        backgroundColor: color.BackgroundIcon,
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        marginLeft: 10,
    }
});