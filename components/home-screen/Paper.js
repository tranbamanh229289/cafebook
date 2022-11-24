import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from "react-native";
import color from "../../constants/color/color";

export const Paper = ({ width, height, text, icon }) => {
  return (
    <TouchableHighlight
      style={[styles.container, { width: width, height: height }]}
      onPress={() => {}}
      underlayColor={color.TouchableHighlightBorderWhite}
    >
      <>
        {icon}
        <Text style={styles.text}>{text}</Text>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.White,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    elevation: 2,
  },
  text: {
    marginTop: 5,
    fontFamily: "Roboto-Medium",
  },
});
