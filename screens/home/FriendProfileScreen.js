import { useEffect, useState } from "react";
import { View,FlatList, StyleSheet} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { get_user_info } from "../../api/api";
import { FriendProfileListHeader } from "../../components/home-screen/FriendProfileListHeader";
import { Post } from "../../components/home-screen/Post";
import color from "../../constants/color/color";

const Item = ({ postId }) => (
  <View style={styles.item}>
    <Post postId={postId}/>
  </View>
);
export const FriendProfileScreen = ({route}) => {
  const dispatch = useDispatch();
  const [friendPosts, setFriendPosts] = useState([]);
  const token = useSelector((state) => state.auth.data.token);
  const [userData, setUserData] = useState({});
  const posts = useSelector((state) => state.post.data.posts);
  const loading = useSelector((state) => state.post.loading);

  useEffect(()=>{
    get_user_info(route.params.id, token)
    .then(res => setUserData(res.data.data))
    .catch(err => console.log(err));
  }, [route.params.id]);

  useEffect(()=>{
    setFriendPosts(posts.filter((post) => post.author.id === route.params.id));
  }, [loading]);

  const renderItem = ({ item }) => (
    <Item postId={item.id}/>
  );

  const ItemSeparatorComponent = () => (
    <View style={{ height: 10, backgroundColor: color.BackgroundGray }} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        data={friendPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <FriendProfileListHeader
            linkAvatar={userData.avatar}
            username={userData.username}
            cover_image={userData.cover_image}
            is_friend={userData.is_friend}
          />
        )}
        ItemSeparatorComponent={ItemSeparatorComponent}
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
