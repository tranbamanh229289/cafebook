import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { View, Text, StatusBar, BackHandler, ScrollView, FlatList, StyleSheet, Animated, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ListHeader } from "../../components/home-screen/ListHeader";
import { Post } from "../../components/home-screen/Post";
import color from "../../constants/color/color";
import { getUserInfo } from "../../redux/features/user/userSlice";
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

const Item = ({ title }) => (
  <View style={styles.item}>
    <Post/>
  </View>
);

const {height} = Dimensions.get("screen");

export const HomeScreen = memo(({ navigation, route , setHeaderVisible, scrollY}) => {
  const token = useSelector((state) => state.auth.data.token);
  const userId = useSelector((state) => state.auth.data.id);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      setHeaderVisible(true);
      scrollY.setValue(0);
      return () => {
        setHeaderVisible(false);
      };
    }, [])
  );

  useEffect(()=>{
    dispatch(getUserInfo({token, userId}));
  }, [token])
  
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  
  const ItemSeparatorComponent = () => (
    <View style={{height: 10 , backgroundColor: color.BackgroundGray}}/>
  );

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" translucent={false}/> */}
      <Animated.FlatList
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshing={refresh}
        ListHeaderComponent={ListHeader}
        ItemSeparatorComponent={ItemSeparatorComponent}
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
});

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
