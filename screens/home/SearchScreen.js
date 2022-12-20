import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons, EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export const SearchScreen = () => {
    const [searched, setSearched] = useState(false)
    const [searchText, setSearchText] = useState("")

    return (
        <View style={styles.container}>
            <View style={styles.searchView}>
                <View>
                <Ionicons name="arrow-back-outline" size={26} color="black" />
                </View>
                <View style={searched? styles.searchContainerViewSearched: styles.searchContainerView}>
                    {searched && (
                        <EvilIcons name="search" size={24} color="#68696D" />
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Tìm kiếm"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    {searchText !== "" && (
                        <View>
                        <AntDesign name="close" size={24} color="#68696D"
                            onPress={() => {
                                setSearchText("")
                            }}
                        />
                        </View>
                    )}
                </View>

                {searched && (
                        <MaterialCommunityIcons name="tune-variant" size={28} color="black" />
                    )}
            </View>

            <View style={styles.secondView}>
                <Text style={styles.searchHistoryText}>
                    Tìm kiếm gần đây
                </Text>

                <Pressable>
                    <Text style={styles.changeText}>
                        Chỉnh sửa
                    </Text>
                </Pressable>



            </View>

            <View  style={styles.bigBoardView}>
                    <SearchComponent searchInfo = "hi"/>
                    <SearchComponent searchInfo = "hmm"/>
                    <SearchComponent searchInfo = "hi"/>
                    <SearchComponent searchInfo = "hi"/>

                    <SearchComponent searchInfo = "hi"/>

            </View>
            

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        width: "100%",
        height: "100%"
    },

    searchView: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingLeft:15,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#d9dbda",
        width: "100%",
        justifyContent: "flex-start",
        

    },

    searchContainerView: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F1F2F6",
        borderRadius: 30,
        marginLeft: 15,
        flex: 1,
        
        paddingLeft: 10,
        paddingRight: 15,
        justifyContent: "space-around",
        height: "100%"
        
    },

    searchContainerViewSearched: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F1F2F6",
        borderRadius: 30,
        flex: 1,
        paddingLeft: 5,
        paddingRight: 15,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: "space-around",
        width: "auto"
    },

    secondView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: 10,
        paddingRight: 12,
        paddingLeft: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#d9dbda",
    },

    bigBoardView:{
        flex: 1,
        flexDirection: "column",
        width: "100%",
        justifyContent: "flex-start",
    },

    searchComponentInfoView:{
        width:"100%",
        justifyContent:"flex-start",
        // backgroundColor: "#00FFFF",
        flexDirection: "row",
        alignItems:"center",
        paddingVertical: 6,
        paddingLeft: 15,
    },

    input: {
        fontSize: 24,
        marginLeft: 5,
        flex: 1,
    },

    searchHistoryText: {
        fontSize: 20,
        fontWeight: "bold",

    },

    changeText: {
        fontSize: 20,
        color: "#79797B"
    }

})

const SearchComponent = ({searchInfo}) => {
    return (
        
            <Pressable style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? '#F9F9F9'
              : 'white'
          },
          styles.searchComponentInfoView
        ]}>
            <EvilIcons name="search" size={30} color="#68696D" />
            <Text style={{
                fontSize: 22,
                marginLeft: 15,
                }}>
                {searchInfo}
            </Text>
            </Pressable>
        
    )
}