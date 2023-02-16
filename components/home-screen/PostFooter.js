import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import color from "../../constants/color/color";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { likePost } from "../../redux/features/post/postSlice";

export const PostFooter = ({dark, postId}) => {
    const mapData = useSelector((state) => state.post.mapData);
    const [commentCounting , setCommentCounting ] = useState(0);
    const [reactionCounting, setReactionCounting] = useState(0);
    const [likePress , setLikePress] = useState(false);
    const loading = useSelector((state) => state.post.loading);
    const token = useSelector((state) => state.auth.data.token);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const darkTheme = {
        color: color.White
    };

    const handlePressLike = () => {
        dispatch(likePost({token,postId}));
        if (!likePress) {
            setReactionCounting((prev) => prev + 1);
        }
        else {
            setReactionCounting((prev) => prev - 1);
        }
        setLikePress((prev) => !prev);
    }

    useEffect(()=>{
        if (mapData.hasOwnProperty(postId)) {
            setReactionCounting(parseInt(mapData[postId]["like"]));
            setLikePress(mapData[postId]["is_liked"] === "1" );
            setCommentCounting(parseInt(mapData[postId]["comment"]));
        }
    },[mapData[postId]]);

    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.statisticContainer} onPress={()=>{}} underlayColor={dark ? color.Black : color.TouchableHighlightBorderWhite}>
                <View style={styles.statisticView}>
                    <View style={styles.reactionContainer}>
                        <View style={styles.iconBorder}>
                            <LikeIconSmall/>
                        </View>
                        <Text style={[styles.text, dark && darkTheme]}> {reactionCounting}</Text>
                    </View>
                    <View style={styles.commentContainer}>
                        <Text style={[styles.text, dark && darkTheme]}>{commentCounting} comments</Text>
                    </View>
                </View>
            </TouchableHighlight>
            <View style={styles.br}/>
            <View style={styles.buttonContainer}>
                <TouchableHighlight style={styles.touchableButton} onPress={handlePressLike} underlayColor={dark ? color.Black : color.TouchableHighlightBorderWhite}>
                    <View style={styles.button}>
                        {likePress?<LikeIconFocus/>:<LikeIcon />}
                        <Text style={[styles.text, dark && darkTheme]}>  Like</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.touchableButton} onPress={()=>{navigation.navigate("CommentScreen")}} underlayColor={dark ? color.Black : color.TouchableHighlightBorderWhite}>
                    <View style={styles.button} >
                        <CommentIcon />
                        <Text style={[styles.text, dark && darkTheme]}>  Comment</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.touchableButton} onPress={()=>{}} underlayColor={dark ? color.Black : color.TouchableHighlightBorderWhite}>
                    <View style={styles.button}>
                        <ShareIcon/>
                        <Text style={[styles.text, dark && darkTheme]}>  Share</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        height: 90,
    },
    statisticContainer: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    br: {
        width: "100%",
        alignSelf: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: color.LightGrey,
    },
    button: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    touchableButton: {
        flex: 1,
    },
    text: {
        color: color.TextGray,
        fontSize: 13
    },
    statisticView: {
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
        paddingLeft: "2.5%",
        paddingRight: "2.5%"
    },
    reactionContainer: {
        flex: 1,
        flexWrap: "nowrap",
        flexDirection: "row",
    },
    commentContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    iconBorder: {
        width: 18,
        height: 18,
        borderRadius: 10,
        backgroundColor: "#2d92fc",
        justifyContent: "center",
        alignItems: "center",
        
    }
})

const SIZE = 20;
const LikeIcon = () => (<AntDesign name="like2" size={SIZE} color={color.ButtonIcon} />);
const LikeIconFocus = () => (<AntDesign name="like1" size={SIZE} color={color.MainBlue} />);
const CommentIcon = () => (<FontAwesome name="comment-o" size={SIZE} color={color.ButtonIcon} />);
const ShareIcon = () => (<MaterialCommunityIcons name="share-outline" size={20} color={color.ButtonIcon} />);
const LikeIconSmall = () => (<AntDesign name="like1" size={10} color="#fffcfe" />);