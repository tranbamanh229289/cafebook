import { Text, View } from "react-native";

export const FriendScreen = ({navigation, route}) => {
    return (
        <View style={{justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%"}}>
            <Text>This is Friends screen</Text>
        </View>
    );
}