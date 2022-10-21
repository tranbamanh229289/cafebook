import { useState } from "react";
import { Modal, StyleSheet, Pressable, Text, View, StatusBar } from "react-native";
import color from "../../constants/color/color";
import { SelectLanguageScrollView } from "./SelectLanguageScrollView";

export const SelectLanguageModal = ({ modalVisible, setModalVisible }) => {
  const [selectedIndex, setSelectedIndex] = useState(2);
  return (
      <Modal visible={modalVisible} transparent={true}>
        <StatusBar backgroundColor="#021E43" animated/>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <SelectLanguageScrollView setModalVisible={setModalVisible} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
            <Pressable style={styles.cancel} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.text}>HỦY</Text>
          </Pressable>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: '80%',
    height: '95%',
    backgroundColor: color.White,
    borderRadius: 4,
  },
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cancel: {
    height: "10%",
    borderTopWidth: 1,
    borderTopColor: "#f2f2f2",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 20
  },
  text: {
    color: "#808080"
  }
});
