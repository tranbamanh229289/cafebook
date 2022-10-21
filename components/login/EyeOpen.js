import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";

export const EyeOpen = () => {
    const [seePassword, setSeePassword] = useState(false);
 
    return (
        <TouchableOpacity onPress={()=>{setSeePassword(!seePassword)}}>
            {seePassword?<Entypo name="eye" size={24} color="black" />:<Entypo name="eye-with-line" size={20} color="black" />}
        </TouchableOpacity>
    );
}