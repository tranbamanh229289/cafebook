import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { useEffect } from "react";
import color from "../../constants/color/color";
import { Fontisto, Octicons, MaterialIcons } from "@expo/vector-icons";

export const AllFriendSortModal = ({ modalVisible, setModalVisible }) => {
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
                  <MaterialIcons name="photo-filter" size={24} color="black" />
                  <View style={styles.subItem}>
                    <Text style={styles.textItem}>Mặc định</Text>
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                underlayColor={color.TouchableHighlightBorderWhite}
                onPress={() => {}}
              >
                <View style={styles.item}>
                  <Octicons name="sort-asc" size={24} color="black" />
                  <View style={styles.subItem}>
                    <Text style={styles.textItem}>
                      Bạn bè mới nhất trước tiên
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                underlayColor={color.TouchableHighlightBorderWhite}
                onPress={() => {}}
              >
                <View style={styles.item}>
                  <Octicons name="sort-desc" size={24} color="black" />
                  <View style={styles.subItem}>
                    <Text style={styles.textItem}>
                      Bạn bè lâu năm nhất trước tiên{" "}
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

  textItem: {
    fontSize: 16,
    fontFamily: "Roboto-Bold",
  },
});
