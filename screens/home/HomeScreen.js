import { useFocusEffect } from "@react-navigation/native";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ListHeader } from "../../components/home-screen/ListHeader";
import { Post } from "../../components/home-screen/Post";
import color from "../../constants/color/color";
import {
  AppendListPost,
  getListPost,
  onRefresh,
  pressRefresh,
  refreshListPost,
} from "../../redux/features/post/postSlice";
import { getUserInfo } from "../../redux/features/user/userSlice";

const Item = ({ avatar, username, images, described, like , is_liked, comment, created }) => (
  <View style={styles.item}>
    <Post
      avatar={avatar}
      username={username}
      images={images}
      described={described}
      is_liked={is_liked}
      like={like}
      comment={comment}
      created={created}
    />
  </View>
);

const { height } = Dimensions.get("screen");

export const HomeScreen = memo(
  ({ navigation, route, setHeaderVisible, scrollY }) => {
    const [index, setIndex] = useState(0);
    const token = useSelector((state) => state.auth.data.token);
    const userId = useSelector((state) => state.auth.data.id);
    const loading = useSelector((state) => state.post.loading);
    const posts = useSelector((state) => state.post.data.posts);

    console.log(posts);

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
      dispatch(getUserInfo({ token, userId }))
        .unwrap()
        .then((res) => console.log("get user infomation"))
        .catch((err) => console.log(err));
    }, [token]);

    useEffect(() => {
      if (index === 0) {
        dispatch(getListPost({ token: token }));
      } else {
        dispatch(AppendListPost({ token: token, index: index }));
      }
    }, [index]);

    const renderItem = ({ item }) => (
      <Item
        title={item.title}
        avatar={item.author.avatar}
        username={item.author.username}
        images={item.image}
        described={item.described}
        like={item.like}
        is_liked={item.is_liked}
        comment={item.comment}
        created={item.created}
      />
    );

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
  }
);

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
