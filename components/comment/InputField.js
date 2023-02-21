import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { TextInput, View, StyleSheet } from "react-native";

export const InputField = ({ value, changeComment }) => {
    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <TextInput
                    placeholder="Viết bình luận công khai..."
                    style={styles.text}
                    autoFocus={true}
                    value={value}
                    onChangeText={changeComment}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    text: {
        width: "100%",
        padding: 6,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 15,
        backgroundColor: "#f0f2f5",
        borderRadius: 50,
    },
    input: {
        borderColor: "rgba(30, 33, 30, 0.1)",
        borderTopWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 10,
        paddingLeft: 10,
    },
});
