import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import color from "../../constants/color/color";
import { Octicons, Feather } from "@expo/vector-icons";

export const BlockModal = ({
  modalVisible,
  setModalVisible,
  username,
}) => {
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
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.3)" }} />
      </Modal>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, flexDirection: "column-reverse" }}>
          <View style={styles.modalContainer}>
            <View style={styles.itemContainer}>
              <TouchableHighlight
                underlayColor={color.TouchableHighlightBorderWhite}
                onPress={() => {}}
              >
                <View style={styles.item}>
                  <Octicons name="report" size={24} color="black" />
                  <View style={styles.subItem}>
                    <Text style={styles.textItem}>
                      Bạn thấy sao về lời mời kết bạn này
                    </Text>
                    <Text style={styles.subTextItem}>
                      {username} sẽ không nhận được thông báo.
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                underlayColor={color.TouchableHighlightBorderWhite}
                onPress={() => {}}
              >
                <View style={styles.item}>
                  <Feather name="user-x" size={24} color="black" />
                  <View style={styles.subItem}>
                    <Text style={styles.textItem}>Chặn {username}</Text>
                    <Text style={styles.subTextItem}>
                      {username} sẽ không thể nhìn thấy bạn hoặc liên hệ với bạn
                      trên facebook.
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
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
