import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import color from "../../constants/color/color";
import { useCallback, useEffect, useRef, useState } from "react";
import { Avatar } from "../home-screen/Avatar";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export const SearchInput = ({ setSearchTerm, valid, clearSearch }) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const focusRef = useRef();

  useEffect(() => {
    if (focusRef.current) focusRef.current.focus();
  }, [focusRef]);

  useEffect(() => {
    //  console.log(valid);
    if (focusRef.current) focusRef.current.focus();

    if (!valid) {
      setSearch("");
    }
  }, [valid]);
  return (
    <View style={styles.topBar}>
      <TouchableOpacity style={styles.backIcon}
      onPress={()=>{navigation.goBack()}}>
        <AntDesign name="arrowleft" size={24} color={color.Black} />
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        returnKeyType="next"
        ref={focusRef}
        onChangeText={(text) => {
          setSearch(text);
          setSearchTerm(text);
        }}
        value={search}
        autoFocus={true}
      ></TextInput>
      {valid ? (
        <TouchableOpacity
          onPress={() => clearSearch()}
          style={styles.closeIcon}
        >
          <AntDesign name="close" size={24} color={color.Black} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    paddingTop: 8,
    paddingBottom: 12,
    shadowColor: color.BackgroundIcon,
    shadowRadius: 2,
    borderBottomWidth: 1,
    borderBottomColor: color.BackgroundGray,
    width: "100%",
    paddingHorizontal: 12,
    backgroundColor: color.White,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  backIcon: {
    paddingTop: 4,
    paddingEnd: 24,
    alignItems: "center",  
  },
  closeIcon: {
    paddingTop: 4,
    paddingEnd: 4,
    alignItems: "center",  
  },
  searchInput: {
    width: "100%",
    fontSize: 16,
    fontWeight: "500",
    flex: 2,
  },
});
