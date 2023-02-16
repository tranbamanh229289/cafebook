import { useEffect, useState } from "react";
import { View,FlatList, StyleSheet} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MyProfileListHeader } from "../../components/home-screen/MyProfileListHeader";
import { Post } from "../../components/home-screen/Post";
import color from "../../constants/color/color";
import { appendMyListPost, getMyListPost } from "../../redux/features/post/postSlice";

const Item = ({ postId }) => (
  <View style={styles.item}>
    <Post postId={postId}/>
  </View>
);
export const MyProfileScreen = () => {
  const dispatch = useDispatch();
  const myPosts = useSelector((state) => state.post.myPosts);
  const loading = useSelector((state) => state.post.loading);
  const token = useSelector((state) => state.auth.data.token);
  const [page, setPage] = useState(1);
  
  useEffect(()=>{
    if (token !== undefined) {
      if (page === 1) {
        dispatch(getMyListPost({token: token, page: page}));
      }
      else {
        dispatch(appendMyListPost({token: token, page: page}));
      }
    }
  }, [page,token]);

  const renderItem = ({ item }) => (
    <Item postId={item.id}/>
  );

  const ItemSeparatorComponent = () => (
    <View style={{ height: 10, backgroundColor: color.BackgroundGray }} />
  );

  const handleOnEndReached = () => {
    setPage(prev => prev + 1);
  }

  const handleRefresh = () => {
    setPage(1);
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        data={myPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={handleRefresh}
        ListHeaderComponent={() => (<MyProfileListHeader/>)}
        ItemSeparatorComponent={ItemSeparatorComponent}
        onEndReached={handleOnEndReached}
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
