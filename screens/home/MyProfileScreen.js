import { useEffect, useState } from "react";
import { View,FlatList, StyleSheet} from "react-native";
import { get_user_info } from "../../api/api";
import { MyProfileListHeader } from "../../components/home-screen/MyProfileListHeader";
import { Post } from "../../components/home-screen/Post";
import color from "../../constants/color/color";
import { getValueFor } from "../../utils/secureStore";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({}) => (
  <View style={styles.item}>
    <Post />
  </View>
);

export const MyProfileScreen = () => {
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState({});
  const renderItem = ({ item }) => <Item title={item.title} />;

  const ItemSeparatorComponent = () => (
    <View style={{ height: 10, backgroundColor: color.BackgroundGray }} />
  );

  useEffect(()=>{
    getValueFor("accessToken")
    .then((token)=>{
      if (token !== null) {
        get_user_info("63e3154dc6ce6b1ee84c7dc7", token)
          .then((res) => {
            if (res.data.code === "1000") {
              setData(res.data.data);
            }
          })
          .catch((err) => console.log(err));
      }
    });
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshing={refresh}
        ListHeaderComponent={() => (<MyProfileListHeader data={data}/>)}
        ItemSeparatorComponent={ItemSeparatorComponent}
        onRefresh={() => {
          console.log("refreshed");
        }}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: color.White,

  },
  title: {
    fontSize: 32,
  },
  contentContainerStyle: {
    backgroundColor: color.BackgroundGray
  }
});
