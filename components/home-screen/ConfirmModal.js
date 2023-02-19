import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import color from "../../constants/color/color";
import { Octicons, Feather } from "@expo/vector-icons";

export const ConfirmModal = ({
  modalVisible,
  setModalVisible,
  header,
  body,
  returnBool,
}) => {
  const onAcceptPress = () => {
    returnBool(true)
    setModalVisible(false)
  };

  const onCancelPress = () => {
    returnBool(false)
    setModalVisible(false)
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisible}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            justifyContent: "center",
            alignItem: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItem: "center",
            }}
          >
            <View
              style={{
                backgroundColor: color.White,
                flexDirection: "column",
                padding: 15,
                width: "70%",
              }}
            >
              <Text style={styles.textItem}>{header}</Text>
              <Text style={styles.subTextItem}>{body}</Text>
              <View style={{ flexDirection: "row-reverse", marginTop: 5 }}>
                <TouchableHighlight
                  underlayColor={color.TouchableHighlightBorderWhite}
                  onPress={onAcceptPress}
                >
                  <Text
                    style={{ ...styles.subTextItem, color: color.MainBlue }}
                  >
                    Confirm
                  </Text>
                </TouchableHighlight>

                <TouchableHighlight
                  underlayColor={color.TouchableHighlightBorderWhite}
                  onPress={onCancelPress}
                  style={{ marginRight: 5 }}
                >
                  <Text style={{ ...styles.subTextItem, color: color.Red }}>
                    Cancel
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >

      </Modal> */}
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: color.White,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  header: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomColor: color.BorderTopGray,
    borderBottomWidth: 1,
  },
  itemContainer: {
    paddingTop: 5,
  },
  item: {
    backgroundColor: color.White,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  subItem: {
    flex: 1,
    marginLeft: 10,
  },

  textContainer: {
    marginLeft: 10,
  },
  usernameText: {
    fontSize: 20,
    fontFamily: "Roboto-Bold",
  },
  dateText: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: color.GrayText,
  },
  textItem: {
    fontSize: 16,
    fontFamily: "Roboto-Bold",
  },
  subTextItem: {
    fontSize: 14,
    fontFamily: "Roboto",
    color: color.GrayText,
  },
});
