import { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  Animated,
} from "react-native";
import color from "../../constants/color/color";
import { EvilIcons } from "@expo/vector-icons";

export const FloatingLabelTextInput = ({ placeholder, width, fullWidth,  keyboardType, keyName, val, onChangeVal}) => {
  const [value, setValue] = useState("");
  const [onFocus, setOnFocus] = useState(false);
  const animatedValue = new Animated.Value(value === "" ? 0 : 1);
  useEffect(() => {
    Animated.timing(animatedValue, {
      duration: 100,
      toValue: onFocus || value !== "" ? 1 : 0,
      useNativeDriver: false,
    }).start();
  }, [onFocus, value]);

  return (
    <View style={[styles.container, width !== undefined && {width: width}]}>
      <Animated.Text
        style={[
          styles.label,
          {
            top: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [6, -12],
            }),
            color: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [color.GrayText, color.MainBlue],
            }),
            fontSize: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [18, 12],
            }),
          },
        ]}
      >
        {placeholder}
      </Animated.Text>
      <View style={styles.inputField}>
        <TextInput
          style={[styles.text, fullWidth===true && {width: "95%"}]}
          onChangeText={(value) => {
            setValue(value);
            onChangeVal(keyName)(value);
          }}
          onBlur={() => {
            setOnFocus(false);
          }}
          onFocus={() => {
            setOnFocus(true);
          }}
          value={value}
          keyboardType={keyboardType!==undefined ? keyboardType : "default"}
        />
        {value !== '' && <Pressable onPress={()=>{setValue("");  onChangeVal(keyName)(""); console.log(value)}}><EvilIcons name="close" size={20} color="black" /></Pressable>}
      </View>
      <View style={onFocus ? styles.focusBr : styles.br} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "45%",
    height: 42,
    marginBottom: 22,
  },
  text: {
    width: "90%",
    fontSize: 18,
    padding: 5,
  },
  br: {
    borderBottomWidth: 1,
    borderBottomColor: "#cecece",
  },
  focusBr: {
    borderBottomWidth: 2,
    borderBottomColor: "#356dbd",
  },
  label: {
    position: "absolute",
    left: 5,
  },
  inputField: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
  }
});
