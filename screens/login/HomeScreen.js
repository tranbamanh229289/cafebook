import { View, Text } from "react-native";

export const HomeScreen = ({navigation}) => {
    return (
        <View style={{justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%"}}>
            <Text>This is Home screen</Text>
        </View>
    );
}