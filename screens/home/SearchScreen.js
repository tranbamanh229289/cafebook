import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Animated,
  Modal,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  AntDesign,
  Ionicons,
  EvilIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import color from "../../constants/color/color";
import { Post } from "../../components/home-screen/Post";
import { useNavigation } from "@react-navigation/native";
import { SearchHistory } from "./SearchHistory";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const searchHistory = [
  {
    id: "63ec9596412eff12b8472d52",
    keyword: "mak",
    created: "1676449174",
  },
  {
    id: "63ec9e05e7778416e69eda40",
    keyword: "make",
    created: "1676451333",
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Post />
  </View>
);

export const SearchScreen = () => {
  const navigation = useNavigation();
  const [historyModalVisible, setHistoryModalVisible] = useState(false);

  const STATE_ENUM = {
    DEFAULT: "DEFAULT",
    SEARCHING: "SEARCHING",
    SEARCHED: "SEARCHED",
  };

  const renderItem = ({ item }) => <Item title={item.title} />;

  const ItemSeparatorComponent = () => (
    <View style={{ height: 10, backgroundColor: color.BackgroundGray }} />
  );

  const [refresh, setRefresh] = useState(false);

  const [searchState, setSearchState] = useState(STATE_ENUM.DEFAULT);
  const [searchText, setSearchText] = useState("");

  const onChangeTextHandler = (text) => {
    setSearchText(text);
    setSearchState(STATE_ENUM.SEARCHING);
    if (text === "") {
      setSearchState(STATE_ENUM.DEFAULT);
    } else {
      setSearchState(STATE_ENUM.SEARCHING);
    }
  };

  const handleSubmit = () => {
    setSearchState(STATE_ENUM.SEARCHED);
  };

  const SearchHistory = [
    {
      id: "63ec9596412eff12b8472d52",
      keyword: "mak",
      created: "1676449174",
    },
    {
      id: "63ec9e05e7778416e69eda40",
      keyword: "make",
      created: "1676451333",
    },
  ];

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={historyModalVisible}
        onRequestClose={() => {
          setHistoryModalVisible(!historyModalVisible);
        }}
      >
        <SearchHistory setHistoryModalVisible={setHistoryModalVisible} />
      </Modal>
      <View style={styles.searchView}>
        <View>
          <Ionicons
            name="arrow-back-outline"
            size={26}
            color="black"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View
          style={
            searchState === STATE_ENUM.SEARCHED
              ? styles.searchContainerViewSearched
              : styles.searchContainerView
          }
        >
          {searchState === STATE_ENUM.SEARCHED && (
            <EvilIcons name="search" size={24} color="#68696D" />
          )}
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm"
            value={searchText}
            onChangeText={onChangeTextHandler}
            returnKeyType="search"
            onKeyPress={(keyPress) => console.log(keyPress)}
            onSubmitEditing={handleSubmit}
          />
          {searchText !== "" && (
            <View>
              <AntDesign
                name="close"
                size={24}
                color="#68696D"
                onPress={() => {
                  setSearchText("");
                }}
              />
            </View>
          )}
        </View>

        {searchState === STATE_ENUM.SEARCHED && (
          <MaterialCommunityIcons name="tune-variant" size={28} color="black" />
        )}
      </View>

      {searchState === STATE_ENUM.DEFAULT && (
        <View style={styles.secondView}>
          <Text style={styles.searchHistoryText}>Tìm kiếm gần đây</Text>

          <Pressable onPress={() => setHistoryModalVisible(true)}>
            <Text style={styles.changeText}>Chỉnh sửa</Text>
          </Pressable>
        </View>
      )}

      {searchState === STATE_ENUM.DEFAULT && (
        <View style={styles.bigBoardView}>
          <FlatList
            data={SearchHistory}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SearchComponent searchInfo={item.keyword} />
            )}
          />
        </View>
      )}

      {searchState === STATE_ENUM.SEARCHING && (
        <View style={styles.bigBoardView}>
          <View>
            <FlatList
              data={SearchHistory}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <SearchComponent searchInfo={item.keyword} />
              )}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingLeft: 15,
            }}
          >
            <Text style={{ color: color.MainBlue, fontSize: 20 }}>
              Xem kết quả cho{" "}
            </Text>
            <Text
              style={{
                color: color.MainBlue,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {searchText}
            </Text>
          </View>

          <ActivityIndicator
            style={{ marginTop: 12 }}
            size="small"
            color={color.DarkGray}
          />
        </View>
      )}

      {searchState === STATE_ENUM.SEARCHED && (
        <View style={styles.bigBoardSearchedView}>
          <View
            style={{
              backgroundColor: color.White,
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              snapToEnd={false}
            >
              <SearchElement searchInfo="Tất cả" />
              <SearchElement searchInfo="Bài viết" focused={true} />
              <SearchElement searchInfo="Mọi người" />
              <SearchElement searchInfo="Nhóm" />
              <SearchElement searchInfo="Ảnh" />
              <SearchElement searchInfo="Trang" />
              <SearchElement searchInfo="Video" />
              <SearchElement searchInfo="Marketplace" />
              <SearchElement searchInfo="Địa điểm" />
            </ScrollView>
          </View>

          <Animated.FlatList
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
            data={DATA}
            ListHeaderComponent={
              <View
                style={{
                  width: "100%",
                  height: 10,
                  backgroundColor: color.BackgroundGray,
                }}
              />
            }
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            refreshing={refresh}
            ItemSeparatorComponent={ItemSeparatorComponent}
            onRefresh={() => {
              console.log("refreshed");
            }}
            // onScroll={Animated.event(
            //   [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            //   { useNativeDriver: false }
            // )}
            scrollEventThrottle={16}
            onEndReached={() => {
              setRefresh(true);
              setTimeout(() => {
                DATA.push({
                  id: "58694a0f-3da1-471f-bd96-145" + Math.random().toString(),
                  title: "Third Item",
                });
                setRefresh(false);
              }, 1000);
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },

  searchView: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 20,
    width: "100%",
    justifyContent: "flex-start",
    backgroundColor: color.White,
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
    height: "100%",
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
    width: "auto",
  },

  secondView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    paddingRight: 12,
    paddingLeft: 12,
    backgroundColor: color.White,

    // borderBottomWidth: 1,
    // borderBottomColor: "#d9dbda",

    borderTopWidth: 1,
    borderTopColor: "#d9dbda",
  },

  bigBoardView: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    justifyContent: "flex-start",
    backgroundColor: color.White,
    borderTopWidth: 1,
    borderTopColor: "#d9dbda",
  },

  searchComponentInfoView: {
    width: "100%",
    justifyContent: "flex-start",
    // backgroundColor: "#00FFFF",
    flexDirection: "row",
    alignItems: "center",
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
    color: "#79797B",
  },

  bigBoardSearchedView: {
    flex: 1,
    justifyContent: "flex-start",
  },

  item: {
    backgroundColor: color.White,
  },
});

const SearchComponent = ({ searchInfo }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#F9F9F9" : "white",
        },
        styles.searchComponentInfoView,
      ]}
    >
      <EvilIcons name="search" size={30} color="#68696D" />
      <Text
        style={{
          fontSize: 22,
          marginLeft: 15,
        }}
      >
        {searchInfo}
      </Text>
    </Pressable>
  );
};

const SearchElement = ({ searchInfo, focused }) => {
  return (
    <>
      {focused && (
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#F9F9F9" : "white",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              borderBottomColor: color.MainBlue,
              borderBottomWidth: 1,
              marginHorizontal: 7,
            },
          ]}
        >
          <Text
            style={{
              fontSize: 18,
              color: color.MainBlue,
              fontWeight: "bold",

              marginVertical: 5,
            }}
          >
            {searchInfo}
          </Text>
        </Pressable>
      )}

      {!focused && (
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#F9F9F9" : "white",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text
            style={{
              fontSize: 18,
              color: color.GrayText,
              fontWeight: "bold",
              marginHorizontal: 7,
              marginVertical: 5,
            }}
          >
            {searchInfo}
          </Text>
        </Pressable>
      )}
    </>
  );
};
