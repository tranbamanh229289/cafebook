import { useNavigation } from "@react-navigation/native";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableHighlight,
  StatusBar,
} from "react-native";
import color from "../../constants/color/color";

export const DiscardModal = ({ modalVisible, setModalVisible }) => {
  const navigation = useNavigation();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <TouchableWithoutFeedback onPress={() => {setModalVisible(false); StatusBar.setBackgroundColor("transparent"); StatusBar.setBarStyle("dark-content")}}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalView}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Do you want to stop creating your account?</Text>
          <Text style={styles.message}>If you stop now, you'll lose any progress you've made.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight style={styles.button} onPress={()=>{setModalVisible(false); StatusBar.setBackgroundColor("transparent"); StatusBar.setBarStyle("dark-content")}} underlayColor={color.TouchableHighlightBorderWhite}>
            <Text>Continue creating account</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={()=>{navigation.navigate("Login")}} underlayColor={color.TouchableHighlightBorderWhite}>
            <Text style={styles.textHighlight}>Stop create account</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: "80%",
    height: "32%",
    backgroundColor: color.White,
    borderRadius: 4,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: "65%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 24,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    flex: 3,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  message: {
    flex: 2,
    color: color.GrayText
  },
  button: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 6,
  },
  textHighlight: {
    color: color.MainBlue
  }
});
