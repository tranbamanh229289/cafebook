import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";


const Default = () => <Image style={styles.container} source={require("../../assets/default-avatar.jpg")}/>;

export const Avatar = ({source}) => {
    const Uri = () => (<Image style={styles.container} source={{uri: source}}/>);

    return (
        source!==undefined ?  <Uri/> : <Default/>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 36,
        height: 36,
        borderRadius: 20
    },
});