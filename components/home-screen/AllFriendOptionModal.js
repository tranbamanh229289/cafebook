import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { useEffect } from "react";
import color from "../../constants/color/color";
import { Avatar } from "./Avatar";
import { Fontisto, MaterialIcons, Feather } from '@expo/vector-icons';

export const AllFriendOptionModal = ({
  modalVisible,
  setModalVisible,
  username,
  avatar,
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
            <View style={styles.header}>
              <Avatar width={60} height={60} source={avatar} />
              <View style={styles.textContainer}>
                <Text style={styles.usernameText}>{username}</Text>
                <Text style={styles.dateText}>
                  Là bạn bè từ tháng 1 năm 2020
                </Text>
              </View>
            </View>

            <View style={styles.itemContainer}>
              <TouchableHighlight
                underlayColor={color.TouchableHighlightBorderWhite}
                onPress={() => {}}
              >
                <View style={styles.item}>
                <Fontisto name="messenger" size={24} color="black" />
                  <View style={styles.subItem}>
                    <Text style={styles.textItem}>Nhắn tin cho {username}</Text>
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                underlayColor={color.TouchableHighlightBorderWhite}
                onPress={() => {}}
              >
                <View style={styles.item}>
                <Feather name="user-minus" size={24} color="black" />
                  <View style={styles.subItem}>
                    <Text style={styles.textItem}>Bỏ theo dõi {username}</Text>
                    <Text style={styles.subTextItem}>
                      Không nhìn thấy bài viết của nhau nữa nhưng vẫn là bạn bè.
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                underlayColor={color.TouchableHighlightBorderWhite}
                onPress={() => {}}
              >
                <View style={styles.item}>
                <MaterialIcons name="block" size={24} color="black" />
                  <View style={styles.subItem}>
                    <Text style={styles.textItem}>Chặn {username}</Text>
                    <Text style={styles.subTextItem}>
                      {username} sẽ không thể nhìn thấy bạn hoặc liên hệ với bạn
                      trên facebook.
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                underlayColor={color.TouchableHighlightBorderWhite}
                onPress={() => {}}
              >
                 
                <View style={styles.item}>
                <Feather name="user-x" size={24} color="#E02D4B" />
                  <View style={styles.subItem}>
                    <Text style={styles.textItem}>
                      Hủy kết bạn với {username}
                    </Text>
                    <Text style={styles.subTextItem}>
                      Xóa {username} khỏi danh sách bạn bè.
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
    
    paddingTop:5
  },
  item: {
    backgroundColor: color.White,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  subItem: {
    flex:1,
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
