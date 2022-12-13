import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { ChatNav } from "../../components/message/ChatNav";
import { MessageInput } from "../../components/message/MessageInput";
import color from "../../constants/color/color";
const MessageHistory = [
    {
        owner: 0,
        message: "Em ăn có thích rau dền không?",
    },
    {
        owner: 1,
        message: "Em ăn cơm với rau cải.",
    },
    {
        owner: 0,
        message: "Em ăn cơm với rau gì?",
    },
    {
        owner: 1,
        message: "Rồi ạ.",
    },
    {
        owner: 0,
        message: "Em ăn cơm chưa?",
    },
    {
        owner: 1,
        message: "Hi",
    },
    {
        owner: 0,
        message: "Hello",
    },

]

export const ChatScreen = ({route}) => {
    const { itemId } = route.params;    
    const [chatHistory, setChatHistory] = useState([]);
    const navigation = useNavigation();

    const sendMessage = (text)=>{
        setChatHistory([{
            owner: 0,
            message: text,
        }, ...chatHistory]);
    }

    useEffect(()=>{
        setChatHistory(MessageHistory);
    },[itemId]);
    
    return (
        <View style={styles.container}>
            <ChatNav userId ={itemId}/>
            <FlatList 
               contentContainerStyle={styles.contentContainerStyle}
               showsVerticalScrollIndicator={false}
               renderItem={(props) => {
                 return (
                   <View
                        style={props.item.owner===0?styles.owner0:styles.owner1}
                   >
                     <Text style={props.item.owner===0?styles.messageOwner0:styles.messageOwner1}>{props.item.message}</Text>
                   </View>
                 );
               }}
               keyExtractor={(item) => item.message}
               data={chatHistory}
               inverted={true}
            />
            <MessageInput sendMessage = {(text)=>sendMessage(text)}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.White,
    },
    owner0:{
        marginVertical: 8,
        paddingHorizontal: 12,
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    owner1:{
        marginVertical: 8,
        paddingHorizontal: 12,
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
       
    },
    messageOwner0:{
        backgroundColor: color.CadetBlue,
        padding: 12,
        color: color.White,
        fontWeight: "500",
        borderRadius: 8,
    },
    messageOwner1:{
        backgroundColor: color.BrGray,
        padding: 12,
        color: color.Black,
        fontWeight: "500",
        borderRadius: 8,
    }
  });
  