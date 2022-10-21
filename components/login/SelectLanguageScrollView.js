import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { CheckBoxCircle } from "./CheckBoxCircle";
const listLanguage = [
  {
    id: 1,
    data: "Ngôn ngữ của Thiết bị",
  },
  {
    id: 2,
    data: "English",
  },
  {
    id: 3,
    data: "Tiếng Việt",
  },
  {
    id: 4,
    data: "Español",
  },
  {
    id: 5,
    data: "한국어",
  },
  {
    id: 6,
    data: "Français",
  },
  {
    id: 7,
    data: "中文",
  },
  {
    id: 8,
    data: "অসমীয়া",
  },
  {
    id: 9,
    data: "Italiano",
  },
  {
    id: 10,
    data: "भोजपुरी",
  },
  {
    id: 11,
    data: "Башҡорт",
  },
  {
    id: 12,
    data: "Български",
  },
  {
    id: 13,
    data: "भोजपुरी",
  },
  {
    id: 14,
    data: "Bislama",
  },
  {
    id: 15,
    data: "བོད་ཡིག",
  },
  {
    id: 16,
    data: "Буряад хэлэн",
  },
  {
    id: 17,
    data: "Kaszëbsczi",
  },
  {
    id: 18,
    data: "日本語",
  },
  {
    id: 19,
    data: "ქართული",
  },
];

export const SelectLanguageScrollView = ({
  setModalVisible,
  setSelectedIndex,
  selectedIndex,
}) => {
  return (
    <ScrollView style={styles.container} key="container-scrollview">
      {listLanguage.map((e, id) => (
        <>
          <View key={e.id} style={styles.item}>
            <Text style={styles.text} key={`language-${id}`}>{e.data}</Text>
            <Pressable
              style={styles.checkbox}
              key={`pressable-${id}`}
              onPress={() => {
                setSelectedIndex(id);
                setModalVisible(false);
              }}
            >
              {id == selectedIndex ? (
                <CheckBoxCircle selected={true} key={`checkbox-${id}-selected`}/>
              ) : (
                <CheckBoxCircle key={`checkbox-${id}`}/>
              )}
            </Pressable>
          </View>
          <View style={styles.br} key={`br-${id}`}/>
        </>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "90%",
  },
  item: {
    height: 50,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  checkbox: {},
  text: {
    width: "80%",
    marginLeft: 20,
    color: "#808080",
  },
  br: {
    width: "86%",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    alignSelf: "center"
  },
});
