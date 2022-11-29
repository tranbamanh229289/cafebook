import { Text, View } from "react-native";

export const SearchChatScreen = ({navigation, route, id}) => {
    return (
        <View style={{justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%"}}>
            <Text>{`This is Chat screen with ${id}`}</Text>
        </View>
    );
}