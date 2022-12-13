import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import color from "../../constants/color/color";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Feather,
  FontAwesome,
  AntDesign,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
export const MessageInput = ({ sendMessage }) => {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(message.trim());
  }, [message]);

  return (
    <View style={styles.container}>
      <View style={styles.leftIcons}>
        <TouchableOpacity
          style={styles.imageIcon}
          onPress={() => {
            console.log("choose Image");
          }}
        >
          <Feather name="image" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cameraIcon}
          onPress={() => {
            console.log("open Camera");
          }}
        >
          <Feather name="camera" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.microIcon}
          onPress={() => {
            console.log("open Microphone");
          }}
        >
          <FontAwesome name="microphone" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.messageInput}>
        <TextInput
          style={styles.textInput}
          placeholder="Message"
          multiline={true}
          onChangeText={(text) => {
            setMessage(text);
          }}
          value={message}
        ></TextInput>
        <TouchableOpacity
          onPress={() => console.log("Open Emoji")}
          style={styles.emojiIcon}
        >
          <MaterialIcons name="emoji-emotions" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {valid ? (
        <TouchableOpacity
          onPress={() => {
            sendMessage(message);
            setMessage("");
          }}
          style={styles.likeIcon}
        >
          <Ionicons name="send" size={32} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => console.log("like")}
          style={styles.likeIcon}
        >
          <AntDesign name="like1" size={32} color={color.Black} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    width: "100%",
    paddingHorizontal: 12,
    backgroundColor: color.White,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  leftIcons: {
    flexDirection: "row",
  },
  cameraIcon: {
    paddingEnd: 12,
    alignItems: "center",
  },
  imageIcon: {
    paddingEnd: 12,
    alignItems: "center",
  },
  likeIcon: {
    paddingEnd: 4,
    alignItems: "center",
  },
  messageInput: {
    width: "100%",
    backgroundColor: color.BrGray,
    flex: 3,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    flexDirection: "row",
  },
  textInput: {
    width: "100%",
    fontSize: 16,
    fontWeight: "500",
    flex: 2,
  },
  emojiIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
});
