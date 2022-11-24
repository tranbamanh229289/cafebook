import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LoginSplashAnimation } from "../../animation/LoginSplashAnimation";
import { RegisterLoading } from "../../animation/RegisterLoading";
import color from "../../constants/color/color";

export const ConfirmScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate("Login");
      }, 3000);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <RegisterLoading />
      ) : (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <View style={{flex: 1}}/>
            <Text style={styles.header}>Confirmation</Text>
            <Text style={styles.sub}>We have sent you 5 digits to</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>CF - </Text>
            <TextInput
              style={[styles.input, styles.text]}
              keyboardType="number-pad"
              textAlign="center"
            />
          </View>
          <View style={{ flex: 1 }} />
          <View style={styles.nextButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsLoading(true)}
            >
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: color.LightGrey }]}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: color.Black, fontFamily: "Roboto-Medium" },
                ]}
              >
                Can't get the code
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.White,
    flexDirection: "column",
  },
  textContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  header: {
    fontSize: 18,
    marginBottom: 12,
    fontFamily: "Roboto-Medium",
  },
  sub: {
    textAlign: "center",
    color: color.GrayText,
    fontSize: 14,
    width: "90%",
  },
  nextButton: {
    flex: 6,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    width: "90%",
    backgroundColor: color.MainBlue,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginBottom: 15,
  },
  buttonText: {
    color: color.White,
  },
  input: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: color.TouchableHighlightBorderWhite,
  },
  text: {
    fontFamily: "Roboto-Medium",
    fontSize: 20,
  },
});
