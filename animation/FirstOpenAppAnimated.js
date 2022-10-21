import {
  StyleSheet,
  SafeAreaView,
  Animated,
  Image,
  Easing,
  Dimensions
} from "react-native";
import { useEffect, useRef } from "react";

export const FirstOpenAppAnimated = ({ setFirstOpen }) => {
  const { height } = Dimensions.get("screen");
  const topMotion = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(topMotion, {
      toValue: height - 200,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => {
      setFirstOpen(false);
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ marginBottom: topMotion }}>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/FacebookIconLoginScreen.png")}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    width: 60,
    height: 60,
  },
});
