import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import color from "../../constants/color/color";
import { Avatar } from "../../components/home-screen/Avatar";
import { Paper } from "../../components/home-screen/Paper";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, getValueFor } from "../../utils/secureStore";
import { logout } from "../../redux/features/auth/authSlice";

export const MenuScreen = ({navigation}) => {
  const avatar = useSelector((state) => state.auth.data.avatar);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const token = await getValueFor("accessToken");
    await deleteItem("accessToken");
    dispatch(logout({ token: token }))
    .unwrap()
    .then(res => console.log(auth))
    .catch(err => console.log(err));
    navigation.navigate("Login");
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topBarContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Menu</Text>
          </View>
          <View style={styles.rightItemContainer}>
            <TouchableOpacity style={styles.icon}>
              <SettingIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <SearchIcon />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableHighlight
          style={styles.avatarContainer}
          onPress={() => {navigation.navigate("MyProfile")}}
          underlayColor={color.TouchableHighlightBorderWhite}
        >
          <>
            <View style={styles.avatar}>
              <Avatar source={avatar}/>
            </View>
            <View style={styles.name}>
              <Text style={styles.nameBold}>Sơn Nguyễn</Text>
              <Text style={{ color: color.GrayText }}>See your profile</Text>
            </View>
          </>
        </TouchableHighlight>
      </View>
      <View style={styles.br}/>
      <View style={styles.shortcut}>
        <View style={styles.shortcutHeader}>
          <Text style={styles.nameBold}>All shortcuts</Text>
        </View>
        <View style={styles.row}>
          <Paper width="49%" height={74} text="Find friends" icon={<MaterialIcons name="person-search" size={24} color={color.MainBlue}/>}/>
          <Paper width="49%" height={74} text="Saved" icon={<Entypo name="pin" size={24} color={color.Purple} />}/>
        </View>
        <View style={styles.row}>
          <Paper width="49%" height={74} text="Reels" icon={<MaterialCommunityIcons name="movie-play" size={24} color={color.Orange} />}/>
          <Paper width="49%" height={74} text="Dating" icon={<Octicons name="heart-fill" size={24} color={color.Red} />}/>
        </View>
        <View style={styles.row}>
          <Paper width="49%" height={74} text="Feeds" icon={<MaterialCommunityIcons name="newspaper-variant-multiple" size={24} color={color.MainBlue}/>}/>
          <Paper width="49%" height={74} text="Groups" icon={<MaterialCommunityIcons name="account-group" size={24} color={color.MainBlue}/>}/>
        </View>
        <View style={styles.row}>
          <Paper width="49%" height={74} text="Marketplace" icon={<MaterialCommunityIcons name="store" size={24} color={color.greenIcon} />}/>
          <Paper width="49%" height={74} text="Videos on Watch" icon={<MaterialCommunityIcons name="television-play" size={24} color={color.TextMainBlue} />}/>
        </View>
        <View style={styles.row}>
          <Paper width="49%" height={74} text="Memonries" icon={<Entypo name="back-in-time" size={24} color={color.MainBlue} />}/>
          <Paper width="49%" height={74} text="Pages" icon={<FontAwesome name="flag" size={24} color={color.Orange} />}/>
        </View>
        <TouchableHighlight style={styles.seemoreButton} onPress={()=>{}} underlayColor={color.TouchableHighlightBorderWhite}>
          <Text style={styles.buttonText}>See more</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.settingContainer}>
        <TouchableHighlight style={styles.settingButtonContainer} onPress={()=>{}} underlayColor={color.TouchableHighlightBorderWhite}>
          <View style={styles.settingButton}>
            <MaterialIcons name="help" size={30} color={color.SettingIconGray}/>
            <Text style={styles.nameBold}> Help & support </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.settingButtonContainer} onPress={()=>{}} underlayColor={color.TouchableHighlightBorderWhite}>
          <View style={styles.settingButton}>
            <Fontisto name="player-settings" size={28} color={color.SettingIconGray} />
            <Text style={styles.nameBold}> Setting push notification</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.seemoreButton} onPress={handleLogout} underlayColor={color.TouchableHighlightBorderWhite}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.MenuBackgroundGray,
  },
  header: {
    height: 100,
    flexDirection: "column",
  },
  topBarContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  rightItemContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-end",
  },
  icon: {
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.IconBackgroundGray,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    fontFamily: "Roboto-Bold",
    fontSize: 26,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    flex: 1,
  },
  avatar: {
    
  },
  name: {
    marginLeft: 10,
  },
  nameBold: {
    fontFamily: "Roboto-Medium",
    fontSize: 15,
  },
  br: {
    width: "90%",
    borderBottomWidth: 1,
    marginTop: 10,
    alignSelf: "center",
    borderBottomColor: color.BrGray,
    elevation: 1,
  },
  shortcut: {
    padding: 10,
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    marginBottom: 10,
  },
  shortcutHeader: {
    height: 36,
  },
  seemoreButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: color.IconBackgroundGray,
    marginTop: 10,
    borderRadius: 6,
    width: "100%"
  },
  buttonText: {
    fontFamily: "Roboto-Medium"
  },
  settingContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 25,
  },
  settingButtonContainer: {
    paddingLeft: 10,
    height: 60,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: color.BorderTopGray,
    justifyContent: "center",
  },
  settingButton: {
    flexDirection: "row",
    alignItems: "center",
  }
});

const ICON_SIZE = 20;
const SettingIcon = () => (
  <Ionicons name="settings-sharp" size={ICON_SIZE} color="black" />
);
const SearchIcon = () => (
  <Feather name="search" size={ICON_SIZE} color="black" />
);
