import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import color from "../../constants/color/color";
import { Avatar } from "../../components/home-screen/Avatar";
import { SearchInput } from "../../components/message/SearchInput";
import axiosClient from "../../utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";

export const SearchChatScreen = ({ navigation, route }) => {
  const userId = useSelector((state) => state.auth.data.id);
  const token = useSelector((state) => state.auth.data.token);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [valid, setValid] = useState(false);
  const [defaultList, setDefaultList] = useState([]);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    axiosClient("POST", "friend/get_user_friends", {}, {
      user_id: userId,
      index: 0,
      count: 10,
      token: token
    }).then((res) => {
      console.log(res.data.data.friends);
      setDefaultList(res.data.data.friends);
      setSearchResult(res.data.data.friends);
    }).catch((e) => console.log(e))
  }, []);

  const searchChange = (text) => {
    //console.log(text);
    setTimeout(() => {
      setSearchTerm(text);
    }, 200)
  };
  const clearSearch = () => {
    setSearchTerm("");
    setValid(false);
  };

  useEffect(() => {
    //console.log("searchTerm changed to " + searchTerm);
    if (searchTerm.trim() === "") {
      //get suggest people list
      setValid(false);
      if (defaultList.length) { setSearchResult(defaultList); }
    } else {
      //get result list
      setValid(true);
      axiosClient("GET", "search/user", {}, {
        search_text: searchTerm,
        index: 0,
        count: 15
      }).then((res) => setSearchResult(res.data.data)).catch((e) => console.log(e));
    }
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      <SearchInput
        setSearchTerm={searchChange}
        valid={valid}
        clearSearch={clearSearch}
      />
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          valid ? null : <Text style={styles.suggestText}>SUGGEST</Text>
        }
        renderItem={(props) => {
          return (
            <TouchableOpacity
              onPress={() => {
                //console.log(props.item.id);
                navigation.navigate("Chat", {
                  itemId: props.item.id,
                });
              }}
              style={styles.item}
            >
              <Avatar source={props.item.avatar} />
              <Text style={styles.name}>{props.item.username}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
        data={searchResult}
        refreshing={refresh}
        onEndReached={() => {
          if (searchResult.length > 14) {
            setRefresh(true);
            setTimeout(() => {
              axiosClient("GET", "search/user", {}, {
                search_text: searchTerm,
                index: searchResult.length,
                count: 15
              }).then((res) => {
                setSearchResult([...searchResult, ...res.data.data])
              }).catch((e) => console.log(e))
              setRefresh(false);
            }, 1000);
          }
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.White,
  },
  item: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  name: {
    paddingStart: 12,
    fontSize: 16,
    fontWeight: "600",
  },
  suggestText: {
    paddingHorizontal: 12,
    paddingTop: 24,
    paddingBottom: 12,
    color: color.IconGray,
  },
  contentContainerStyle: {
    backgroundColor: color.White,
  },
});
