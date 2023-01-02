import { useState } from "react";
import { View, TextInput, StyleSheet, Pressable, Touchable, TouchableOpacity } from "react-native";
import { EyeOpen } from "./EyeOpen";

export const InputField = ({ secured, placeholder, isLastInputField, keyName, val, onChangeVal }) => {
  const [onFocus, setOnFocus] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <Pressable
      style={() => [
        {
          backgroundColor: pressed ? "#f2f2f2" : "white",
        },
        isLastInputField ? styles.isLastInputFieldContainer : styles.container,
      ]}
    >
      {secured ? (
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <TextInput
            value={val}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            style={styles.textSecure}
            onChangeText={onChangeVal(keyName)}
            onPressIn={() => {
              setPressed(true);
            }}
            onPressOut={() => {
              setTimeout(() => {
                setPressed(false);
              }, 100);
            }}
            onBlur={() => {
              setOnFocus(false);
            }}
            onFocus={() => {
              setOnFocus(true);
            }}
          />
          <EyeOpen secureTextEntry={secureTextEntry} setSecureTextEntry={setSecureTextEntry}/>
        </View>
      ) : (
        <TextInput
          value={val}
          placeholder={placeholder}
          style={styles.text}
          onChangeText={onChangeVal(keyName)}
          onPressIn={() => {
            setPressed(true);
          }}
          onPressOut={() => {
            setTimeout(() => {
              setPressed(false);
            }, 100);
          }}
          onBlur={() => {
            setOnFocus(false);
          }}
          onFocus={() => {
            setOnFocus(true);
          }}
        />
      )}
      <View style={onFocus ? styles.focusBr : styles.br} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 42,
    marginBottom: 22,
  },
  text: {
    width: "100%",
    fontSize: 18,
    padding: 5,
  },
  textSecure: {
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
  isLastInputFieldContainer: {
    width: "90%",
    height: 42,
    marginBottom: 10,
  },
});
