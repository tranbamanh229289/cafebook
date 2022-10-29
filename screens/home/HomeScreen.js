import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { View, Text, StatusBar, BackHandler, ScrollView, FlatList, StyleSheet, Animated } from "react-native";
import { ListHeader } from "../../components/home-screen/ListHeader";

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

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export const HomeScreen = ({ navigation, route , setHeaderVisible, scrollY}) => {
  const [refresh, setRefresh] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setHeaderVisible(true);
      return () => {
        setHeaderVisible(false);
      };
    }, [])
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false}/>
      <Animated.FlatList
        showsVerticalScrollIndicator={false}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshing={refresh}
        ListHeaderComponent={ListHeader}
        onRefresh={()=>{
          console.log("refreshed");
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        onEndReached={()=>{
          setRefresh(true);
          setTimeout(()=>{
            DATA.push({
              id: '58694a0f-3da1-471f-bd96-145' + Math.random().toString(),
              title: 'Third Item',
            },);
            setRefresh(false)
          },1000)
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
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 500
  },
  title: {
    fontSize: 32,
  },
});
