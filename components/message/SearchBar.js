import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import color from "../../constants/color/color";
import { useCallback, useEffect, useRef, useState } from "react";
import { Avatar } from "../home-screen/Avatar";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export const SearchBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
    <TouchableOpacity
      style={styles.search}
      onPress={() => navigation.navigate("SearchChat")}
    >
      <View style={styles.searchIcon}>
        <Feather name="search" size={18} color={color.DarkGray} />
      </View>
      <Text style={styles.searchInput}>Search</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
  },
  search: {
    marginVertical: 12,
    height: 40,
    width: "100%",
    backgroundColor: color.BrGray,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchInput: {
    width: "100%",
    fontSize: 16,
    color: color.DarkGray,
  },
  searchIcon: {
    height: 36,
    width: 36,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
