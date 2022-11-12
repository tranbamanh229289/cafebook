import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import color from "../../constants/color/color";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";


export const PostFooter = () => {
    const [commentCounting , setCommentCounting ] = useState(0);
    const [reactionCounting, setReactionCounting] = useState(0);
    const [like , setLike] = useState(false);

    const handlePressLike = () => {
        if (!like) {
            setReactionCounting((prev) => prev + 1);
        }
        else {
            setReactionCounting((prev) => prev - 1);
        }
        setLike(!like);
    }

    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.statisticContainer} onPress={()=>{}} underlayColor={color.TouchableHighlightBorderWhite}>
                <View style={styles.statisticView}>
                    <View style={styles.reactionContainer}>
                        <View style={styles.iconBorder}>
                            <LikeIconSmall/>
                        </View>
                        <Text style={styles.text}> {reactionCounting}</Text>
                    </View>
                    <View style={styles.commentContainer}>
                        <Text style={styles.text}>{commentCounting} comments</Text>
                    </View>
                </View>
            </TouchableHighlight>
            <View style={styles.br}/>
            <View style={styles.buttonContainer}>
                <TouchableHighlight style={styles.touchableButton} onPress={handlePressLike} underlayColor={color.TouchableHighlightBorderWhite}>
                    <View style={styles.button}>
                        {like?<LikeIconFocus/>:<LikeIcon />}
                        <Text style={styles.text}>  Like</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.touchableButton} onPress={()=>{}} underlayColor={color.TouchableHighlightBorderWhite}>
                    <View style={styles.button} >
                        <CommentIcon />
                        <Text style={styles.text}>  Comment</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.touchableButton} onPress={()=>{}} underlayColor={color.TouchableHighlightBorderWhite}>
                    <View style={styles.button}>
                        <ShareIcon/>
                        <Text style={styles.text}>  Share</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
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
        borderBottomWidth: 1,
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