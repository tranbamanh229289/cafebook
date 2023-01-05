import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import color from "../../constants/color/color";
import { Feather } from "@expo/vector-icons";
import { FlatListWatchCategory } from "../../components/home-screen/FlatListWatchCategory";
import { Video } from 'expo-av';
import {PostHeader} from "../../components/home-screen/PostHeader"
import {PostFooter} from "../../components/home-screen/PostFooter"

const category = [
  { id: 0, uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" },
  { id: 1, uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" },
  { id: 2, uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" },
  { id: 3, uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" },
  { id: 4, uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" },
];

const ItemSeparatorComponent = () => (
  <View style={{ height: 5, backgroundColor: color.BackgroundGray }} />
);

const Item = ({ uri }) => (
  <TouchableWithoutFeedback onPress={() => {}}>
    <View style={styles.item}>
      <PostHeader />
      <Video
        style={styles.video}
        source={{
          uri: uri,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
      />
      <PostFooter/>
    </View>
  </TouchableWithoutFeedback>
);

export const WatchScreen = () => {
  const renderItem = ({ item }) => <Item uri={item.uri} />;

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        data={category}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        keyExtractor={(item) => item.id}
        stickyHeaderHiddenOnScroll
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};

const UserIcon = () => <FontAwesome name="user" size={22} color="black" />;
const SearchIcon = () => <Feather name="search" size={22} color="black" />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.White,
  },
  headerText: {
    fontSize: 28,
    fontFamily: "Roboto-Bold",
  },
  header: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 15,
    backgroundColor: color.White,
  },
  subHeader: {
    flex: 1,
    padding: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  iconButton: {
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.IconBackgroundGray,
    marginRight: 10,
    borderRadius: 16,
  },
  headerItem: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 3,
  },
  item: {
    height: 400,
    flex: 1,
    borderTopColor: color.BackgroundGray,
    borderTopWidth: 1,
  },
  video: {
    flex: 1,
  }
});

const ListHeaderComponent = () => (
  <View style={styles.header}>
    <View style={styles.headerItem}>
      <View style={styles.subHeader}>
        <Text style={styles.headerText}>Watch</Text>
      </View>
      <View style={[styles.subHeader, styles.buttons]}>
        <TouchableOpacity style={styles.iconButton}>
          <UserIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <SearchIcon />
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.headerItem}>
      <FlatListWatchCategory />
    </View>
  </View>
);
