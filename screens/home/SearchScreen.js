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
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  AntDesign,
  Ionicons,
  EvilIcons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import color from "../../constants/color/color";
import { Post } from "../../components/home-screen/Post";
import { useNavigation } from "@react-navigation/native";
import { SearchHistory } from "./SearchHistory";
import { get_saved_search } from "../../api/searchApi";
import { useDispatch, useSelector } from "react-redux";
import axiosClient, { baseURL } from "../../utils/axiosClient";
import {
  appendSearchPost,
  searchPost,
} from "../../redux/features/post/postSlice";
import axios from "axios";
import { getSavedSearch } from "../../redux/features/search/searchSlice";

const Item = ({ postId }) => (
  <View style={styles.item}>
    <Post postId={postId} />
  </View>
);

export const SearchScreen = () => {
  const navigation = useNavigation();
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const token = useSelector((state) => state.auth.data.token);

  const STATE_ENUM = {
    DEFAULT: "DEFAULT",
    SEARCHING: "SEARCHING",
    SEARCHED: "SEARCHED",
  };

  const renderItem = ({ item }) => <Item postId={item.id} />;

  const ItemSeparatorComponent = () => (
    <View style={{ height: 10, backgroundColor: color.BackgroundGray }} />
  );

  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const [searchState, setSearchState] = useState(STATE_ENUM.DEFAULT);
  const [searchText, setSearchText] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [pointRefreshHistory, setPointRefreshHistory] = useState(false);

  const onChangeTextHandler = (text) => {
    setSearchText(text);
    setSearchState(STATE_ENUM.SEARCHING);
    if (text === "") {
      setSearchState(STATE_ENUM.DEFAULT);
    } else {
      setSearchState(STATE_ENUM.SEARCHING);
    }
  };

  const [indexSearch, setIndexSearch] = useState(0);
  const searchPosts = useSelector((state) => state.post.searchPosts);

  const handleSubmit = () => {
    setIndexSearch(0);
    setSearchValue(searchText);
    setSearchState(STATE_ENUM.SEARCHED);
  };

  const SearchComponent = ({ searchInfo }) => {
    return (
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#F9F9F9" : "white",
          },
          styles.searchComponentInfoView,
        ]}
        onPress={() => {
          setIndexSearch(0);
          setSearchText(searchInfo)
          setSearchValue(searchInfo);
          setSearchState(STATE_ENUM.SEARCHED);
        }}
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

  useEffect(() => {
    if (token !== undefined && token !== null && searchValue !== "") {
      if (indexSearch === 0) {
        dispatch(
          searchPost({
            token: token,
            index: indexSearch,
            count: "5",
            keyword: searchValue,
          })
        );
      } else {
        dispatch(
          appendSearchPost({
            token: token,
            index: indexSearch,
            count: "5",
            keyword: searchValue,
          })
        );
      }
    }
  }, [indexSearch, token, searchValue]);

  useEffect(() => {
    if (token !== undefined && token !== null) {
      dispatch(getSavedSearch({ token: token, index: 0 }));

    }
  }, [token,searchValue]);

  const [searchHistoryData, setSearchHistoryData] = useState([]);
  const historyData = useSelector((state) => state.search.data);
  const [refreshPoint, setRefreshPoint] = useState(false);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.post(
    //       `${baseURL}search/get_saved_search`,
    //       {},
    //       {
    //         params: {
    //           token: token,
    //           index: 0,
    //           count: 6,
    //         },
    //       }
    //     );
    //     setSearchHistoryData(response.data.data); // assuming the API returns data in a "data" property
    //   } catch (error) {
    //     console.error(error.response);
    //   }
    // };
    // fetchData();
    setSearchHistoryData(historyData.slice(0, 6))
  }, [historyData]);

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
            placeholder="T??m ki???m"
            value={searchText}
            onChangeText={onChangeTextHandler}
            returnKeyType="search"
            // onKeyPress={(keyPress) => console.log(keyPress)}
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
          <Text style={styles.searchHistoryText}>T??m ki???m g???n ????y</Text>

          <Pressable onPress={() => setHistoryModalVisible(true)}>
            <Text style={styles.changeText}>Ch???nh s???a</Text>
          </Pressable>
        </View>
      )}

      {searchState === STATE_ENUM.DEFAULT && (
        <View style={styles.bigBoardView}>
          <FlatList
            data={searchHistoryData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SearchComponent searchInfo={item.keyword} />
            )}
            initialNumToRender={6}
          />
        </View>
      )}

      {searchState === STATE_ENUM.SEARCHING && (
        <View style={styles.bigBoardView}>
          <View>
            <FlatList
              data={searchHistoryData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <SearchComponent searchInfo={item.keyword} />
              )}
              initialNumToRender={6}
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
              Xem k???t qu??? cho{" "}
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
              <SearchElement searchInfo="T???t c???" />
              <SearchElement searchInfo="B??i vi???t" focused={true} />
              <SearchElement searchInfo="M???i ng?????i" />
              <SearchElement searchInfo="Nh??m" />
              <SearchElement searchInfo="???nh" />
              <SearchElement searchInfo="Trang" />
              <SearchElement searchInfo="Video" />
              <SearchElement searchInfo="Marketplace" />
              <SearchElement searchInfo="?????a ??i???m" />
            </ScrollView>
          </View>

          {searchPosts.length > 0 && (
            <Animated.FlatList
              contentContainerStyle={styles.contentContainerStyle}
              showsVerticalScrollIndicator={false}
              data={searchPosts}
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
              keyExtractor={(item) => "ss" + item.id}
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
              onEndReached={() => setIndexSearch((prev) => prev + 5)}
            />
          )}

          {searchPosts.length <= 0 && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: color.BackgroundGray,
              }}
            >
              <Feather name="cloud-off" size={120} color="#fff" />
              <Text
                style={{
                  fontSize: 20,
                  color: color.GrayText,
                  paddingVertical: 10,
                }}
              >
                Kh??ng th??? t???i k???t qu???
              </Text>

              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <EvilIcons name="refresh" size={30} color="black" />
                <Text style={{ fontSize: 16 }} onPress={() => {}}>
                  Th??? l???i
                </Text>
              </TouchableOpacity>
            </View>
          )}
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
