import { Animated, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import color from "../../constants/color/color";
import { RightBarHeader } from "./RightBarHeader";

export const CollapsibleHeader = ({scrollY}) => {
  const clampedScrollY = scrollY.interpolate({
    inputRange: [0, 0.8],
    outputRange: [-0.1, 0.1],
    extrapolateLeft: "clamp",
  });

  const minusScrollY = Animated.multiply(clampedScrollY, -1);

  const translateY = Animated.diffClamp(minusScrollY, -30, 0);
  return (
    <Animated.View style={[styles.headerContainer, {transform: [{translateY: translateY}]}]}>
      <Text style={styles.headerTitleStyle}>cafebook</Text>
      <RightBarHeader />
    </Animated.View>
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
