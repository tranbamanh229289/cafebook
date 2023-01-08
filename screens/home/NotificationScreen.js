import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { Avatar } from "../../components/home-screen/Avatar";
import color from "../../constants/color/color";


  
export const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 0,
      uri: "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
      seen: false,
    },
    {
      id: 1,
      uri: "https://thpt-phamhongthai.edu.vn/wp-content/uploads/2022/08/anh-avatar-viet-nam-cute-ngau-tuyet-dep-10.jpg",
      seen: true,
    },
    {
      id: 2,
      uri: "https://avatarfiles.alphacoders.com/291/thumb-291702.png",
      seen: false,
    },
    {
      id: 3,
      uri: "https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg",
      seen: false,
    },
    {
      id: 4,
      uri: "https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg",
      seen: false,
    },
    {
      id: 5,
      uri: "https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg",
      seen: true,
    },
    {
      id: 6,
      uri: "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-cute-2.jpg",
      seen: true,
    },
    {
      id: 7,
      uri: "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-cute-2.jpg",
      seen: true,
    },
    {
      id: 8,
      uri: "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-cute-2.jpg",
      seen: true,
    },
  ]);

  const onPressNotification = (uri, index, seen) => {
    if (!seen) {
      setNotifications((prev) => [
        ...prev.slice(0, index),
        { ...prev[index], seen: true },
        ...prev.slice(index + 1),
      ]);
    }
  };

  const Item = ({ uri, index, seen }) => (
    <>
      {index === 0 && (
        <View style={styles.subTextView}>
          <Text style={styles.subText}>Earlier</Text>
        </View>
      )}
      <TouchableHighlight
        underlayColor={color.TouchableHighlightBorderWhite}
        onPress={() => onPressNotification(uri , index ,seen)}
      >
        <View
          style={[
            styles.item,
            !seen && { backgroundColor: color.UnseenNotification },
          ]}
        >
          <View style={styles.avatar}>
            <Avatar width={60} height={60} source={uri} />
          </View>
          <View style={styles.mainContent}>
            <Text numberOfLines={3} style={styles.textMain}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
            <Text numberOfLines={1} style={styles.textTime}>
              Jan 3 at 10:41 PM
            </Text>
          </View>
          <TouchableHighlight
            style={styles.moreButton}
            underlayColor={color.TouchableHighlightBorderWhite}
            onPress={() => {}}
          >
            <MoreIcon />
          </TouchableHighlight>
        </View>
      </TouchableHighlight>
    </>
  );

  const renderItem = ({ item }) => (
    <Item uri={item.uri} index={item.id} seen={item.seen} />
  );

  return (
    <View style={styles.container}>
      {notifications.length > 0 ? (
        <FlatList
          ListHeaderComponent={ListHeaderComponent}
          showsVerticalScrollIndicator={false}
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          stickyHeaderHiddenOnScroll
          stickyHeaderIndices={[0]}
        />
      ) : (
        <Text></Text>
      )}
    </View>
  );
}

const SearchIcon = () => <Feather name="search" size={22} color="black" />;
const MoreIcon = () => <Feather name="more-horizontal" size={20} color="black" />;

const ListHeaderComponent = () => (
    <View style={styles.header}>
      <View style={styles.headerItem}>
        <View style={styles.subHeader}>
          <Text style={styles.headerText}>Notifications</Text>
        </View>
        <View style={[styles.subHeader, styles.buttons]}>
          <TouchableOpacity style={styles.iconButton}>
            <SearchIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

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
      backgroundColor: color.White,
    },
    subHeader: {
      flex: 1,
      paddingHorizontal: 15,
      paddingVertical: 8,
      marginBottom: 5,
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
      height: 100,
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    avatar: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    mainContent: {
        flex: 6,
    },
    moreButton: {
        flex: 1,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-start",
        marginTop: 10,
    },
    subTextView: {

    },
    subText: {
        fontFamily: "Roboto-Bold",
        fontSize: 18,
        paddingLeft: 10,
    },
    textTime: {
        color: color.GrayText
    },
    textMain: {
    }
  });