import { StyleSheet, Text, TextInput, View } from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import color from "../../constants/color/color";

export const FriendProfileHeaderTitle = () => {
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
            <View style={styles.iconView}>
                <SearchIcon/>
            </View>
            <TextInput
            placeholder="search"
            style={styles.textInput}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBar: {
        backgroundColor: color.Gray95,
        flexDirection: "row",
        height: 36,
        borderRadius: 18,
        width: "75%"
    },
    iconView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end"
    },
    textInput: {
        flex: 9,
    }
});

const SearchIcon = () => <EvilIcons name="search" size={24} color="black" />;