import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { ChatNav } from "../../components/message/ChatNav";
import { MessageInput } from "../../components/message/MessageInput";
import color from "../../constants/color/color";
import axiosClient from "../../utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";



export const ChatScreen = ({ route }) => {
    const { itemId } = route.params;
    const [chatHistory, setChatHistory] = useState([]);
    const navigation = useNavigation();
    const userId = useSelector((state) => state.auth.data.id);
    const token = useSelector((state) => state.auth.data.token);
    const [refresh, setRefresh] = useState(false);


    // console.log(token)
    const sendMessage = (text) => {
        axiosClient("POST", "chat/add_dialog", {
            reciverId: itemId,
            senderId: userId,
            content: text
        }, {}).then((res) => {
            console.log(res.data.data.message)
            setChatHistory([{
                sender: {
                    id: userId
                },
                message: text,
                message_id: res.data.data.message._id,
                created: res.data.data.message.created,
                unread: res.data.data.message.unread
            }, ...chatHistory])
        }).catch((e) => console.log(e));
    }

    useEffect(() => {
        setRefresh(true);
        axiosClient("POST", "chat/get_conversation", {}, {
            token: token,
            partner_id: itemId,
            index: 0,
            count: 15
        }).then((res) => {
            // console.log(res.data.data.conversation);
            setChatHistory(res.data.data.conversation);
        }).catch((e) => console.log(e))
        setTimeout(() => {
            setRefresh(false)
        }, 1000)

    }, [itemId]);

    console.log(chatHistory);

    return (
        <View style={styles.container}>
            <ChatNav userId={itemId} />
            <FlatList
                contentContainerStyle={styles.contentContainerStyle}
                showsVerticalScrollIndicator={false}
                renderItem={(props) => {
                    return (
                        <View
                            style={props.item.sender.id === userId ? styles.owner0 : styles.owner1}
                        >
                            <Text style={props.item.sender.id === userId ? styles.messageOwner0 : styles.messageOwner1}>{props.item.message}</Text>
                        </View>
                    );

                }}
                keyExtractor={(item) => item.message_id}
                refreshing={refresh}
                onRefresh={() => {
                    setRefresh(true);
                    axiosClient("POST", "chat/get_conversation", {}, {
                        token: token,
                        partner_id: itemId,
                        index: 0,
                        count: 15
                    }).then((res) => {
                        // console.log(res.data.data.conversation);
                        setChatHistory(res.data.data.conversation);
                    }).catch((e) => console.log(e));
                    setRefresh(false);
                }}
                onEndReached={() => {
                    console.log(chatHistory);
                    if (chatHistory.length > 14) {
                        console.log("load more");
                        setRefresh(true);
                        axiosClient("POST", "chat/get_conversation", {}, {
                            token: token,
                            partner_id: itemId,
                            index: chatHistory.length + 1,
                            count: 15
                        }).then((res) => {
                            console.log("older data: ")
                            console.log(res.data.data.conversation)
                            setChatHistory([...chatHistory, ...res.data.data.conversation]);
                        }).catch((e) => console.log(e));
                        setTimeout(() => {
                            setRefresh(false);
                        }, 1000);
                    }
                    console.log(chatHistory);
                }}
                data={chatHistory}
                inverted={true}
            />
            <MessageInput sendMessage={(text) => sendMessage(text)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White,
    },
    owner0: {
        marginVertical: 8,
        paddingHorizontal: 12,
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    owner1: {
        marginVertical: 8,
        paddingHorizontal: 12,
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",

    },
    messageOwner0: {
        backgroundColor: color.CadetBlue,
        padding: 12,
        color: color.White,
        fontWeight: "500",
        borderRadius: 8,
    },
    messageOwner1: {
        backgroundColor: color.BrGray,
        padding: 12,
        color: color.Black,
        fontWeight: "500",
        borderRadius: 8,
    }
});
