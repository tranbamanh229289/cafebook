import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ListHeader } from "../../components/home-screen/ListHeader";
import { Post } from "../../components/home-screen/Post";
import color from "../../constants/color/color";
import {
  AppendListPost,
  getListPost,
} from "../../redux/features/post/postSlice";
import { getUserInfo } from "../../redux/features/user/userSlice";

const Item = ({ postId }) => (
  <View style={styles.item}>
    <Post postId={postId} />
  </View>
);

const { height } = Dimensions.get("screen");

export const HomeScreen = ({
  navigation,
  route,
  setHeaderVisible,
  scrollY,
}) => {
  const [index, setIndex] = useState(0);
  const token = useSelector((state) => state.auth.data.token);
  const userId = useSelector((state) => state.auth.data.id);
  const loading = useSelector((state) => state.post.loading);
  const posts = useSelector((state) => state.post.data.posts);
  const mapData = useSelector((state) => state.post.mapData);

  const onEndReached = () => {
    setIndex((prev) => prev + 5);
  };
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

  useEffect(() => {
    dispatch(getUserInfo({ token, userId }));
  }, [token]);

  useEffect(() => {
    if (token !== undefined && token !== null) {
      if (index === 0) {
        dispatch(getListPost({ token: token }));
      } else {
        dispatch(AppendListPost({ token: token, index: index }));
      }
    }
  }, [index, token]);

  const renderItem = ({ item }) => <Item postId={item.id} />;

  const ItemSeparatorComponent = () => (
    <View style={{ height: 10, backgroundColor: color.BackgroundGray }} />
  );

  const handleOnRefresh = () => {
    setIndex(0);
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" translucent={false}/> */}
      <Animated.FlatList
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        ListHeaderComponent={ListHeader}
        ItemSeparatorComponent={ItemSeparatorComponent}
        onRefresh={handleOnRefresh}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        onEndReached={onEndReached}
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
    backgroundColor: color.BackgroundGray,
  },
});
