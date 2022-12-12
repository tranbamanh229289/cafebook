import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import color from "../../constants/color/color";
import { decrement, increment } from "../../redux/features/counter/counterSlice";

export const FriendScreen = ({navigation, route}) => {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    return (
        <View style={{justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%"}}>
            <Text>{count}</Text>
            <TouchableOpacity onPress={() => dispatch(increment())}><View style={styles.button}><Text style={{color: color.White}}>Increase</Text></View></TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(decrement())}><View style={styles.button}><Text style={{color: color.White}}>Decrease</Text></View></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 36,
        backgroundColor: color.MainBlue,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        borderRadius: 12,
    }
});