import { useState } from "react";
import { View,FlatList, StyleSheet} from "react-native";
import { MyProfileListHeader } from "../../components/home-screen/MyProfileListHeader";
import { Post } from "../../components/home-screen/Post";
import color from "../../constants/color/color";

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
  const renderItem = ({ item }) => <Item title={item.title} />;

  const ItemSeparatorComponent = () => (
    <View style={{ height: 10, backgroundColor: color.BackgroundGray }} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshing={refresh}
        ListHeaderComponent={() => (<MyProfileListHeader/>)}
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
