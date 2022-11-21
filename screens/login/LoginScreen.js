import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TouchableHighlight,
  StatusBar,
} from "react-native";
import { FirstOpenAppAnimated } from "../../animation/FirstOpenAppAnimated";
import { BreakLineBody } from "../../components/login/BreakLineBody";
import { InputField } from "../../components/login/InputField";
import { MoreLanguageBar } from "../../components/login/MoreLanguageBar";
import color from "../../constants/color/color";

export default function LoginScreen({ navigation }) {
  const [firstOpen, setFirstOpen] = useState(true);
  useEffect(() => {}, []);

  return (
    <>
      {firstOpen ? (
        <FirstOpenAppAnimated setFirstOpen={setFirstOpen} />
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require("../../assets/TopBackgroundLoginScreen.jpg")}
              resizeMode="cover"
              style={styles.image}
            ></ImageBackground>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.moreLanguage}>
              <MoreLanguageBar />
            </View>
            <View style={styles.inputContainer}>
              <InputField placeholder="Số điện thoại hoặc email" />
              <InputField
                placeholder="Mật khẩu"
                secured={true}
                isLastInputField={true}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("HomeTab");
                }}
                style={styles.loginButton}
              >
                <Text
                  style={styles.loginButtonText}
                >
                  Đăng nhập
                </Text>
              </TouchableOpacity>
              <TouchableHighlight
                underlayColor={color.TouchableHighlightBorderWhite}
                onPress={() => {}}
                style={styles.forgotPWButton}
              >
                  <Text
                    style={styles.forgotPWText}
                  >
                    Quên mật khẩu?
                  </Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.footerContainer}>
            <BreakLineBody />
            <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}
              style={styles.createNewAccountButton}
            >
              <Text
                style={styles.createNewAccountText}
              >
                Tạo tài khoản caFebook mới
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: color.White,
  },
  imageContainer: {
    height: 225,
  },
  bodyContainer: {
    flex: 1,
  },
  footerContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  moreLanguage: {
    height: "10%",
    flexDirection: "column",
    alignItems: "center",
  },
  inputContainer: {
    paddingTop: "11%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  loginButton: {
    width: "90%",
    borderRadius: 4,
    height: 42,
    backgroundColor: color.MainBlue,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "4%",
  },
  loginButtonText: {
      fontSize: 16,
      color: color.White,
      fontWeight: "700",
      fontFamily: "Cochin",
  },
  forgotPWButton: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: color.White,
    padding: 6,
    height: 30,
    width: 130,
  },
  forgotPWText: {
    color: "#2061c4",
    fontWeight: "bold",
    fontFamily: "Cochin",
    fontSize: 14,
  },
  createNewAccountButton: {
    marginTop: "9%",
    width: "65%",
    borderRadius: 4,
    height: 34,
    backgroundColor: "#30a24b",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "4%",
  },
  createNewAccountText: {
    fontSize: 14,
    color: color.White,
    fontWeight: "700",
    fontFamily: "Cochin",
  }
});
