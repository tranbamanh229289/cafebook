<<<<<<< HEAD
import { useState } from "react";
import { View,FlatList, StyleSheet} from "react-native";
import { MyProfileListHeader } from "../../components/home-screen/MyProfileListHeader";
import { Post } from "../../components/home-screen/Post";
import color from "../../constants/color/color";
=======
<<<<<<< Updated upstream
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import color from "../../constants/color/color";
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from "@expo/vector-icons";
import { Avatar } from "../../components/home-screen/Avatar";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
=======
import axios from "axios";
import { useEffect, useState } from "react";
import { View,FlatList, StyleSheet} from "react-native";
import { get_user_info } from "../../api/api";
import { MyProfileListHeader } from "../../components/home-screen/MyProfileListHeader";
import { Post } from "../../components/home-screen/Post";
import color from "../../constants/color/color";
import { getValueFor } from "../../utils/secureStore";
>>>>>>> Stashed changes
>>>>>>> b358421 (add secure storage , call api get_user_info)

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

<<<<<<< HEAD
const Item = ({}) => (
  <View style={styles.item}>
    <Post />
  </View>
);

export const MyProfileScreen = () => {
  const [refresh, setRefresh] = useState(false);

=======
export const MyProfileScreen = () => {
<<<<<<< Updated upstream
    return (
      <ScrollView style={styles.container}>
        <View style={styles.backgroundImageView}>
          <ImageBackground
            style={styles.backgroundImage}
            resizeMode="cover"
            source={{
              uri: "https://i.pinimg.com/originals/29/21/61/292161866ea60cb8995d44aaba1ec84a.jpg",
            }}
          />
          <View style={styles.imageButtonView}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={[
                styles.imageButton,
                { backgroundColor: color.TextMainBlue },
              ]}
            >
              <MakeupIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton} activeOpacity={0.6}>
              <CameraIcon />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.avatarView} activeOpacity={0.8}>
            <Avatar
              width={DEVICE_HEIGHT * 0.23}
              height={DEVICE_HEIGHT * 0.23}
              source={
                "https://thpt-phamhongthai.edu.vn/wp-content/uploads/2022/08/anh-avatar-viet-nam-cute-ngau-tuyet-dep-10.jpg"
              }
            />
            <TouchableOpacity style={styles.avatarButtonView} activeOpacity={0.6}>
              <CameraIcon/>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View style={styles.infomation}>
          <Text style={styles.textName}>Son Ngu yen</Text>
          <View style={styles.nameButtonView}>
            <TouchableHighlight
              style={[
                styles.nameButton,
                { backgroundColor: color.WhiteTextMainBlue },
              ]}
              underlayColor={color.MainBlue}
              onPress={() => {}}
            >
              <View style={styles.buttonText}>
                <PlusIcon />
                <Text style={[{ color: color.White }, styles.text]}>
                  Add to story
                </Text>
              </View>
            </TouchableHighlight>
            <View style={styles.nameButtonBr} />
            <TouchableHighlight
              style={styles.nameButton}
              underlayColor={color.TouchableHighlightBorderWhite}
              onPress={() => {}}
            >
              <View style={styles.buttonText}>
                <EditIcon />
                <Text style={styles.text}>Edit profile</Text>
              </View>
            </TouchableHighlight>
            <View style={styles.nameButtonBr} />
            <TouchableHighlight
              style={styles.moreButton}
              underlayColor={color.TouchableHighlightBorderWhite}
              onPress={() => {}}
            >
              <View style={styles.buttonText}>
                <MoreIcon />
              </View>
            </TouchableHighlight>
          </View>
          <View
            style={{ borderTopWidth: 0.5, borderTopColor: color.BorderTopGray, marginTop: 10, }}
          />
        </View>
      </ScrollView>
    );
}

const CameraIcon = () => <Fontisto name="camera" size={16} color={color.Black} />;
const MakeupIcon = () => <Foundation name="torso-female" size={24} color={color.White} />;
const PlusIcon = () => (
  <View
    style={{
      width: 20,
      height: 20,
      backgroundColor: color.White,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <AntDesign name="plus" size={18} color={color.MainBlue} />
  </View>
);
const EditIcon = () => <MaterialIcons name="edit" size={24} color="black" />;
const MoreIcon = () => (
  <Feather name="more-horizontal" size={24} color="black" />
);
=======
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState({});
>>>>>>> b358421 (add secure storage , call api get_user_info)
  const renderItem = ({ item }) => <Item title={item.title} />;

  const ItemSeparatorComponent = () => (
    <View style={{ height: 10, backgroundColor: color.BackgroundGray }} />
  );

<<<<<<< HEAD
=======
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

>>>>>>> b358421 (add secure storage , call api get_user_info)
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshing={refresh}
<<<<<<< HEAD
        ListHeaderComponent={MyProfileListHeader}
=======
        ListHeaderComponent={() => (<MyProfileListHeader data={data}/>)}
>>>>>>> b358421 (add secure storage , call api get_user_info)
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
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
>>>>>>> b358421 (add secure storage , call api get_user_info)

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
