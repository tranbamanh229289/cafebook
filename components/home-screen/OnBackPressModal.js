import { Pressable, StatusBar, StyleSheet, Text, TouchableHighlight, View } from "react-native"
import color from "../../constants/color/color";
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export const OnBackPressModal = ({setModalVisible}) => {
    const navigation = useNavigation();

    const handlePressContinue = () => {
        StatusBar.setBackgroundColor(color.White);
        StatusBar.setBarStyle("dark-content");
        setModalVisible(false);
    }
    const handlePressDiscard = () => {
        navigation.goBack();
    }

    return (
      <View style={styles.container}>
        <View style={styles.modalView}>
          <View style={styles.title}>
            <Text style={styles.textTitle}>
              Want to finish your post later?
            </Text>
            <Text style={styles.subTitle}>
              Save it as a draft or you can continue editing it.
            </Text>
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight
              onPress={() => {}}
              underlayColor={color.TouchableHighlightBorderWhite}
            >
              <View style={styles.buttonView}>
                <View style={styles.iconView}>
                  <MaterialIcons name="drafts" size={24} color={color.IconGray} />
                </View>
                <View>
                  <Text style={styles.buttonTitle}>Save as draft</Text>
                  <Text style={styles.buttonSubTitle}>
                    You'll receive a notification with your draft.
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={handlePressDiscard}
              underlayColor={color.TouchableHighlightBorderWhite}
            >
              <View style={styles.buttonView}>
                <View style={styles.iconView}>
                  <EvilIcons name="trash" size={30} color={color.IconGray} />
                </View>
                <View>
                  <Text style={styles.buttonTitle}>Discard post</Text>
                </View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={handlePressContinue}
              underlayColor={color.TouchableHighlightBorderWhite}
            >
              <View style={styles.buttonView}>
                <View style={styles.iconView}>
                  <MaterialIcons name="done" size={30} color={color.MainBlue} />
                </View>
                <View>
                  <Text style={[styles.buttonTitle, {color: color.MainBlue}]}>Continue editing</Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(0,0,0,0.5)",
        height: "100%",
        width: "100%",
        flex: 1,
        justifyContent: "flex-end",
    },
    modalView: {
      backgroundColor: "white",
      alignItems: "center",
      width: "100%",
    },
    title: {
        width: "100%",
        padding: 15,
    },
    buttons: {
        width: "100%",
    },
    buttonView: {
        flexDirection: "row",
        height: 65,
        alignItems: "center",
        padding: 15
    },
    iconView: {
        width: 40,
        height: "100%",
        justifyContent: "center",
    },
    title: {
        height: 80,
        justifyContent: "center"

    },
    textTitle: {
        fontSize: 16,
    },
    subTitle: {
        color: color.GrayText,
        marginTop: 5,
    },
    buttonSubTitle: {
        fontSize: 12,
        color: color.GrayText
    },
    buttonTitle: {
        
    }
  });