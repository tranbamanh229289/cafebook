import {
  Pressable,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { useState } from "react";
import { DotIconView } from "./DotIconView";
import { SelectLanguageModal } from "./SelectLanguageModal";
import color from "../../constants/color/color";

export const MoreLanguageBar = () => {
  const [currentLanguage, setCurrentLanguage] = useState("Tiếng Việt");
  const [firstLanguage, setFirstLanguage] = useState("English");
  const [secondLanguage, setSecondLanguage] = useState("Español");
  const [modalVisible, setModalVisible] = useState(false);

  const onPressChangeFirstLanguage = () => {
    const temp = firstLanguage;
    setFirstLanguage(currentLanguage);
    setCurrentLanguage(temp);
  };

  const onPressChangeSecondLanguage = () => {
    const temp = secondLanguage;
    setSecondLanguage(currentLanguage);
    setCurrentLanguage(temp);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onPressChangeFirstLanguage}>
        <Text style={styles.text}>{firstLanguage}</Text>
      </Pressable>
      <DotIconView />
      <Pressable onPress={onPressChangeSecondLanguage}>
        <Text style={styles.text}>{secondLanguage}</Text>
      </Pressable>
      <DotIconView />
      <TouchableHighlight
        style={styles.TouchableHighlight}
        underlayColor={color.TouchableHighlightBorderWhite}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={{ color: "#1462de" }}>Xem thêm...</Text>
      </TouchableHighlight>
      <SelectLanguageModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "60%",
    marginTop: "2%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: {
    color: "#666666",
  },
  TouchableHighlight: {
    height: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    borderRadius: 6,
  },
});
