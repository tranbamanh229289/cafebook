import { useEffect, useState } from "react";
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import color from "../../constants/color/color";
import { Avatar } from "../home-screen/Avatar";
const People = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "Weeee~~~~",
    avatarUrl: "https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "Second Person",
    avatarUrl: "https://media.istockphoto.com/photos/canadian-rockies-banff-national-park-dramatic-landscape-picture-id1342152935?b=1&k=20&m=1342152935&s=170667a&w=0&h=q9-vhO5MC7zwaxX8_zFUiqMnQJ5udMjEBf0npeCCAGs="
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    name: "Trịnh Văn Thoại",
    avatarUrl: "https://media.istockphoto.com/photos/rocky-mountain-mule-deer-wading-in-lake-at-sunset-picture-id1324283285?b=1&k=20&m=1324283285&s=170667a&w=0&h=Gg89otzXIdEx7vWW32hmkcvOQUiQYro8jhBQOtujKwU="
  },
  {
    id: "58694a0f-3da1-471f-bd96",
    name: "Ngọc Anh",
    avatarUrl: "https://addons-media.operacdn.com/media/CACHE/images/themes/95/78195/1.0-rev1/images/f1b54fe9-e138-44e6-929b-182bb1e82a68/8b7b9410c460548223847494208085d9.jpg"
  },
  {
    id: "58694a0f-3da1-471f-bd96-5571e29d72",
    name: "Fifth Person",
    avatarUrl: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/58025/right-front-three-quarter.jpeg?q=75"
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb2823",
    name: "First Person",
    avatarUrl: "https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f61",
    name: "Second Person",
    avatarUrl: "https://media.istockphoto.com/photos/canadian-rockies-banff-national-park-dramatic-landscape-picture-id1342152935?b=1&k=20&m=1342152935&s=170667a&w=0&h=q9-vhO5MC7zwaxX8_zFUiqMnQJ5udMjEBf0npeCCAGs="
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d71",
    name: "Third Person",
    avatarUrl: "https://media.istockphoto.com/photos/rocky-mountain-mule-deer-wading-in-lake-at-sunset-picture-id1324283285?b=1&k=20&m=1324283285&s=170667a&w=0&h=Gg89otzXIdEx7vWW32hmkcvOQUiQYro8jhBQOtujKwU="
  },
  {
    id: "58694a0f-3da1-471f-bd91",
    name: "Fouth Person",
    avatarUrl: "https://addons-media.operacdn.com/media/CACHE/images/themes/95/78195/1.0-rev1/images/f1b54fe9-e138-44e6-929b-182bb1e82a68/8b7b9410c460548223847494208085d9.jpg"
  },
  {
    id: "58694a0f-3da1-471f-bd96-5571e29d71",
    name: "Fifth Person",
    avatarUrl: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/58025/right-front-three-quarter.jpeg?q=75"
  },
];


const Item = ({ name, uri}) => (
  <TouchableOpacity style={styles.item}>
    <Avatar source={uri} width={60} height={60} style={styles.avatar}/>
    <Text style={styles.name}>{name}</Text>
  </TouchableOpacity>
);

export const SuggestPeopleList = () => {
  const [people, setPeople] = useState([]);

  useEffect(()=>{
    console.log("request people");
    setPeople(People)
  },[]);
  
  const renderItem = ({ item }) => <Item uri={item.avatarUrl} name={item.name}/>;
  return (
    <View style={styles.container}>
      <FlatList contentContainerStyle={styles.contentContainerStyle}
          showsHorizontalScrollIndicator={false}
          data={people}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
        />        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.White,
    height: 120,
  },
  item: {
    width: 80,
    height: 120,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: color.Black,
    borderStyle: "solid",
    borderWidth: 0,
  },
  
  name:{
    marginTop: 4,
    padding: 2,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  contentContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
});
