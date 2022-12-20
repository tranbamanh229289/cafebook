import { Text, View, StyleSheet, Image } from "react-native";
import { Ionicons, EvilIcons, FontAwesome } from '@expo/vector-icons';

export const SearchHistory = () => {
    return (
        <View style={styles.containerView}>
            <View style={styles.view1}>
                <Ionicons name="arrow-back-outline" size={26} color="black" />
                <Text style={{
                    fontSize: 20,
                    paddingLeft: 15,
                }}>
                    Nhật ký hoạt động
                </Text>
            </View>

            <View style={styles.view2}>
                <Text style={{
                    fontSize: 15,
                    color: "#3A75BE"
                }}>
                    Xóa các tìm kiếm
                </Text>
            </View>

            <View style={styles.mainView}>
                <SearchHistoryComponent searchInfo="Vn Express" />
            </View>
        </View>
    );
}

const SearchHistoryComponent = ({ searchInfo }) => {
    return (
        <View style={styles.view1}>
            {/* <Image
                style={{
                    resizeMode: "cover",
                    height: 60,
                    width: 60,
                    borderRadius:  50
                    
                }}
                source={require("../../assets/search-icon.png")}
            /> */}
            <View style={{
                height: 60,
                width: 60,
                backgroundColor: "#1878F3",
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <EvilIcons name="search" size={30} color="#fff" />
            </View>

            <View style={{
                flex: 1,
                alignItems: "flex-start",
                flexDirection: "column",
                justifyContent: "flex-start",
                marginHorizontal: 10
            }}>
                <Text style={{
                        fontSize: 16
                    }}>Bạn đã tìm kiếm trên facebook</Text>

                <Text style={{
                    color: "#6F6F6F",
                    fontSize: 16
                }}>"{searchInfo}"</Text>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <FontAwesome name="lock" size={18} color="#BABFC3" />
                    <Text style={{
                        color: "#BABFC3",
                        fontSize: 13
                    }}> Chỉ mình tôi • Đã ẩn khỏi dòng thời gian</Text>
                </View>
            </View>

            <Ionicons name="md-close" size={30} color="#BBBEC3" style={{ alignSelf: "flex-start" }}
                onPress={() => {
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    containerView: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        height: "100%",
        width: "100%",
    },

    view1: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "#d9dbda",
        padding: 15,
    },

    view2: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        padding: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: "#d9dbda",
    },

    mainView: {
        justifyContent: "flex-start",

        flexDirection: "column",
        width: "100%",
        flex: 1,
    }

})