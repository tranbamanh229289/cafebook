import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";

export const Avatar = ({source}) => {
    let src = require("../../assets/default-avatar.jpg");
    useEffect(()=>{
        if (source!=="undefined") {
            src = source;
        }
    },[])
    

    return (
        <Image style={styles.container} source={src}/>
            
    );
}

const styles = StyleSheet.create({
    container: {
        width: 36,
        height: 36,
        borderRadius: 20
    },
});