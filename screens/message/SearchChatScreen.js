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

const DEFAULT_DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "Weeee~~~~",
    avatar:
      "https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "Second Person",
    avatar:
      "https://media.istockphoto.com/photos/canadian-rockies-banff-national-park-dramatic-landscape-picture-id1342152935?b=1&k=20&m=1342152935&s=170667a&w=0&h=q9-vhO5MC7zwaxX8_zFUiqMnQJ5udMjEBf0npeCCAGs=",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    name: "Trịnh Văn Thoại",
    avatar:
      "https://media.istockphoto.com/photos/rocky-mountain-mule-deer-wading-in-lake-at-sunset-picture-id1324283285?b=1&k=20&m=1324283285&s=170667a&w=0&h=Gg89otzXIdEx7vWW32hmkcvOQUiQYro8jhBQOtujKwU=",
  },
  {
    id: "58694a0f-3da1-471f-bd96",
    name: "Ngọc Anh",
    avatar:
      "https://addons-media.operacdn.com/media/CACHE/images/themes/95/78195/1.0-rev1/images/f1b54fe9-e138-44e6-929b-182bb1e82a68/8b7b9410c460548223847494208085d9.jpg",
  },
  {
    id: "58694a0f-3da1-471f-bd96-5571e29d72",
    name: "Fifth Person",
    avatar:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/58025/right-front-three-quarter.jpeg?q=75",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb2823",
    name: "First Person",
    avatar:
      "https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f61",
    name: "Second Person",
    avatar:
      "https://media.istockphoto.com/photos/canadian-rockies-banff-national-park-dramatic-landscape-picture-id1342152935?b=1&k=20&m=1342152935&s=170667a&w=0&h=q9-vhO5MC7zwaxX8_zFUiqMnQJ5udMjEBf0npeCCAGs=",
  },
  {
    id: "1-c1b1-46c2-aed5-3ad53abb28ba",
    name: "Weeee~~~~",
    avatar:
      "https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg",
  },
  {
    id: "1-c605-48d3-a4f8-fbd91aa97f63",
    name: "Second Person",
    avatar:
      "https://media.istockphoto.com/photos/canadian-rockies-banff-national-park-dramatic-landscape-picture-id1342152935?b=1&k=20&m=1342152935&s=170667a&w=0&h=q9-vhO5MC7zwaxX8_zFUiqMnQJ5udMjEBf0npeCCAGs=",
  },
  {
    id: "1-3da1-471f-bd96-145571e29d72",
    name: "Trịnh Văn Thoại",
    avatar:
      "https://media.istockphoto.com/photos/rocky-mountain-mule-deer-wading-in-lake-at-sunset-picture-id1324283285?b=1&k=20&m=1324283285&s=170667a&w=0&h=Gg89otzXIdEx7vWW32hmkcvOQUiQYro8jhBQOtujKwU=",
  },
  {
    id: "1-3da1-471f-bd96",
    name: "Ngọc Anh",
    avatar:
      "https://addons-media.operacdn.com/media/CACHE/images/themes/95/78195/1.0-rev1/images/f1b54fe9-e138-44e6-929b-182bb1e82a68/8b7b9410c460548223847494208085d9.jpg",
  },
  {
    id: "1-3da1-471f-bd96-5571e29d72",
    name: "Fifth Person",
    avatar:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/58025/right-front-three-quarter.jpeg?q=75",
  },
  {
    id: "1-c1b1-46c2-aed5-3ad53abb2823",
    name: "First Person",
    avatar:
      "https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg",
  },
  {
    id: "1-c605-48d3-a4f8-fbd91aa97f61",
    name: "Second Person",
    avatar:
      "https://media.istockphoto.com/photos/canadian-rockies-banff-national-park-dramatic-landscape-picture-id1342152935?b=1&k=20&m=1342152935&s=170667a&w=0&h=q9-vhO5MC7zwaxX8_zFUiqMnQJ5udMjEBf0npeCCAGs=",
  },
];

const RESULT_DATA = [
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d71",
    name: "Third Person",
    avatar:
      "https://media.istockphoto.com/photos/rocky-mountain-mule-deer-wading-in-lake-at-sunset-picture-id1324283285?b=1&k=20&m=1324283285&s=170667a&w=0&h=Gg89otzXIdEx7vWW32hmkcvOQUiQYro8jhBQOtujKwU=",
  },
  {
    id: "58694a0f-3da1-471f-bd91",
    name: "Fouth Person",
    avatar:
      "https://addons-media.operacdn.com/media/CACHE/images/themes/95/78195/1.0-rev1/images/f1b54fe9-e138-44e6-929b-182bb1e82a68/8b7b9410c460548223847494208085d9.jpg",
  },
  {
    id: "58694a0f-3da1-471f-bd96-5571e29d71",
    name: "Fifth Person",
    avatar:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/58025/right-front-three-quarter.jpeg?q=75",
  },
];

export const SearchChatScreen = ({ navigation, route }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [valid, setValid] = useState(false);

  const searchChange = (text) => {
    //console.log(text);
    setSearchTerm(text);
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
      setSearchResult(DEFAULT_DATA);
    } else {
      //get result list
      setValid(true);
      setSearchResult(RESULT_DATA);
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
              <Text style={styles.name}>{props.item.name}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
        data={searchResult}
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
