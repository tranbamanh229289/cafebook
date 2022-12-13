import { Text, View, StyleSheet } from "react-native";
import { MessageNav } from "../../components/message/MessageNav";
import { MessageBody } from "../../components/message/MessageBody";
import color from "../../constants/color/color";

export const MessagingScreen = (navigation, route) => {
    return(
        <View style={styles.container}>
            <MessageNav style={styles.topNav}/>
            <MessageBody/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.White,
  },
});
