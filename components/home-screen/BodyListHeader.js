import { useState } from "react";
import { FlatList, ImageBackground, StyleSheet, Text, View } from "react-native";
import color from "../../constants/color/color";
import { SwitchButton } from "./SwitchButton";

const Stories = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    uri: "https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    uri: "https://media.istockphoto.com/photos/canadian-rockies-banff-national-park-dramatic-landscape-picture-id1342152935?b=1&k=20&m=1342152935&s=170667a&w=0&h=q9-vhO5MC7zwaxX8_zFUiqMnQJ5udMjEBf0npeCCAGs="
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    uri: "https://media.istockphoto.com/photos/rocky-mountain-mule-deer-wading-in-lake-at-sunset-picture-id1324283285?b=1&k=20&m=1324283285&s=170667a&w=0&h=Gg89otzXIdEx7vWW32hmkcvOQUiQYro8jhBQOtujKwU="
  },
  {
    id: "58694a0f-3da1-471f-bd96",
    title: "Third Item",
    uri: "https://addons-media.operacdn.com/media/CACHE/images/themes/95/78195/1.0-rev1/images/f1b54fe9-e138-44e6-929b-182bb1e82a68/8b7b9410c460548223847494208085d9.jpg"
  },
  {
    id: "58694a0f-3da1-471f-bd96-5571e29d72",
    title: "Third Item",
    uri: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/58025/right-front-three-quarter.jpeg?q=75"
  },
];

const Reels = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
      uri: "https://imagekit.io/blog/content/images/2019/12/image-optimization.jpg",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
      uri: "https://cdn.cnn.com/cnnnext/dam/assets/220830110946-james-webb-telescope-phantom-galaxy-super-tease.jpg"
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
      uri: "https://assets.vogue.in/photos/5ce431b346cf5953f8b18c74/master/pass/featured.2.jpg"
    },
    {
      id: "58694a0f-3da1-471f-bd96",
      title: "Third Item",
      uri: "https://wiki-travel.com.vn/uploads/post/qiongru-180728100720-nepal.jpg"
    },
    {
      id: "58694a0f-3da1-471f-bd96-5571e29d72",
      title: "Third Item",
      uri: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/321075807.jpg?k=9881524addbb65541cf8ff650f8e0db8d3342f71549b0c062d03593b896c6ea0&o=&hp=1"
    },
  ];

const ItemSeparatorComponent = () => (
    <View style={{width: 10}}/>
);

const Item = ({ title, uri }) => (
  <View style={styles.item}>
    <ImageBackground source={{uri: uri}} style={styles.image} resizeMode="cover" imageStyle={styles.imageStyle}/>
  </View>
);

export const BodyListHeader = () => {
  const [renderList, setRenderList] = useState(0);
  const renderItem = ({ item }) => <Item uri={item.uri} title={item.title}/>;
  return (
    <View style={styles.container}>
      <SwitchButton renderList={renderList} setRenderList={setRenderList} />
        <FlatList contentContainerStyle={styles.contentContainerStyle}
          showsHorizontalScrollIndicator={false}
          data={renderList===0?Stories : Reels}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.White,
    height: "77%",
  },
  item: {
    width: 110,
    height: 200,
  },
  contentContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    borderRadius: 8,
  }
});
