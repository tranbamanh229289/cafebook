import {StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import color from "../../constants/color/color";
import { RightBarHeader } from "./RightBarHeader";

export const CollapsibleHeader = ({}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitleStyle}>cafebook</Text>
      <RightBarHeader />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: color.White,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "3%",
  },
  headerTitleStyle: {
    width: "45%",
    color: color.MainBlue,
    fontFamily: "klavika-bold",
    fontSize: 32,
  },
});
