import {
  Text,
  View,
  StyleSheet,
  Image,
  Animated,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons, EvilIcons, FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteSavedSearch, getSavedSearch } from "../../redux/features/search/searchSlice";
import { useEffect, useState } from "react";

export const SearchHistory = ({ setHistoryModalVisible }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.data.token);
  const searchHistory = useSelector((state) => state.search.data);
  const loading = useSelector((state) => state.search.loading);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (token !== undefined && token !== null) {
      dispatch(getSavedSearch({ token: token, index: index }));
    }
  }, [index, token]);

  const handleOnRefresh = () => {
    setIndex(0);
  };

  const onEndReached = () => {
    setIndex((prev) => prev + 10);
  };

  const renderItem = ({ item }) => (
    <View style={styles.mainView}>
      <SearchHistoryComponent searchInfo={item.keyword} search_id={item.id} />
    </View>
  );

  return (
    <View style={styles.containerView}>
      {/* <View style={styles.mainView}>
        <SearchHistoryComponent searchInfo="Vn Express" />
      </View> */}
      <ListHeader setHistoryModalVisible={setHistoryModalVisible} />
      <FlatList
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}
        data={searchHistory}
        renderItem={renderItem}
        keyExtractor={(item) => "sh" + item.id}
        // refreshing={loading}
        // ListHeaderComponent={

        // }
        // onRefresh={handleOnRefresh}
        onEndReached={onEndReached}
      />
    </View>
  );
};

const ListHeader = ({ setHistoryModalVisible }) => {
  return (
    <View style={{}}>
      <View style={styles.view1}>
        <Ionicons
          name="arrow-back-outline"
          size={26}
          color="black"
          onPress={() => setHistoryModalVisible(false)}
        />
        <Text
          style={{
            fontSize: 20,
            paddingLeft: 15,
          }}
        >
          Nhật ký hoạt động
        </Text>
      </View>

      <View style={styles.view2}>
        <Text
          style={{
            fontSize: 15,
            color: "#3A75BE",
          }}
        >
          Xóa các tìm kiếm
        </Text>
      </View>
    </View>
  );
};

const SearchHistoryComponent = ({ searchInfo, search_id }) => {
  const [display, setDisplay] = useState(true);
  const dispatch =  useDispatch()
  const token  = useSelector((state) => state.auth.data.token)
  return (
    <>
      {display === true && (
        <View style={{ ...styles.view1, paddingTop: 15 }}>
          <View
            style={{
              height: 60,
              width: 60,
              backgroundColor: "#1878F3",
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <EvilIcons name="search" size={30} color="#fff" />
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "flex-start",
              flexDirection: "column",
              justifyContent: "flex-start",
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Bạn đã tìm kiếm trên facebook
            </Text>

            <Text
              style={{
                color: "#6F6F6F",
                fontSize: 16,
              }}
            >
              "{searchInfo}"
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FontAwesome name="lock" size={18} color="#BABFC3" />
              <Text
                style={{
                  color: "#BABFC3",
                  fontSize: 13,
                }}
              >
                {" "}
                Chỉ mình tôi • Đã ẩn khỏi dòng thời gian
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              setDisplay(false);
              dispatch(deleteSavedSearch({token: token, all: 0, search_id: search_id}))
            }}
          >
            <Ionicons
              name="md-close"
              size={30}
              color="#BBBEC3"
              style={{ alignSelf: "flex-start" }}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "white",
  },

  view1: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#d9dbda",
    paddingBottom: 15,
    paddingHorizontal: 15,
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
  },
});
