import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TouchableHighlight,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FirstOpenAppAnimated } from "../../animation/FirstOpenAppAnimated";
import { BreakLineBody } from "../../components/login/BreakLineBody";
import { InputField } from "../../components/login/InputField";
import { MoreLanguageBar } from "../../components/login/MoreLanguageBar";
import color from "../../constants/color/color";
import { login, resetAccount } from "../../redux/features/auth/authSlice";
import { save } from "../../utils/secureStore";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const code = useSelector((state) => state.auth.code);
  const data = useSelector((state) => state.auth.data);

  const [firstOpen, setFirstOpen] = useState(true);
  useEffect(() => {}, []);

  const [account, setAccount] = useState({
    phoneNumber: "",
    password: "",
  });

  const changeAccount = useCallback(
    (key) => {
      return (val) => {
        setAccount((prev) => {
          return {
            ...prev,
            [key]: val,
          };
        });
      };
    },
    [account]
  );

  const handleLogin = async () => {
    dispatch(login(account))
      .unwrap()
      .then((result) => {
        setAccount({});
        save("accessToken", result.data.token);
      })
      .catch((err) => {
        console.log(err.message)
        Alert.alert(
          "Đăng nhập thất bại",
          "Tài khoản hoặc mật khẩu không đúng",
          [
            {
              text: "OK",
              style: "cancel",
            },
          ]
        );
      });
  };

  const handleRegister = () => {
    dispatch(resetAccount());
    navigation.navigate("CreateAccount");
  };

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
              <InputField
                placeholder="Số điện thoại hoặc email"
                keyName="phoneNumber"
                val={account.phoneNumber}
                onChangeVal={changeAccount}
              />
              <InputField
                placeholder="Mật khẩu"
                secured={true}
                isLastInputField={true}
                keyName="password"
                val={account.password}
                onChangeVal={changeAccount}
              />
              <TouchableOpacity
                onPress={handleLogin}
                style={styles.loginButton}
              >
                <Text style={styles.loginButtonText}>Đăng nhập</Text>
              </TouchableOpacity>
              <TouchableHighlight
                underlayColor={color.TouchableHighlightBorderWhite}
                onPress={() => {}}
                style={styles.forgotPWButton}
              >
                <Text style={styles.forgotPWText}>Quên mật khẩu?</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.footerContainer}>
            <BreakLineBody />
            <TouchableOpacity
              onPress={handleRegister}
              style={styles.createNewAccountButton}
            >
              <Text style={styles.createNewAccountText}>
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
  },
});
