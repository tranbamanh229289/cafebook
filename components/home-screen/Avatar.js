import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";




export const Avatar = ({source , width, height }) => {
    const Default = () => <Image style={[styles.container , width !== undefined && {width: width} , height !==undefined && {height: height}]} source={require("../../assets/default-avatar.jpg")}/>;
    const Uri = () => (<Image style={[styles.container , width !== undefined && {width: width} , height !==undefined && {height: height}]} source={{uri: source}}/>);

    return (
        (source!==undefined && source !== null)?  <Uri/> : <Default/>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 36,
        height: 36,
        borderRadius: 200
    },
});