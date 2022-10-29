import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HomeScreen } from "../../screens/home/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import color from "../../constants/color/color";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { StyleSheet, Animated } from "react-native";
import { FriendScreen } from "../../screens/home/FriendScreen";
import { WatchScreen } from "../../screens/home/WatchScreen";
import { NewfeedScreen } from "../../screens/home/NewfeedScreen";
import { NotificationScreen } from "../../screens/home/NotificationScreen";
import { MenuScreen } from "../../screens/home/MenuScreen";
import { useCallback, useEffect, useRef, useState } from "react";
import { CollapsibleHeader } from "../../components/home-screen/CollapsibleHeader";

const Tab = createMaterialTopTabNavigator();

export const TabBarNavigator = () => {
  const [headerVisible, setHeaderVisible] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const clampedScrollY = scrollY.interpolate({
    inputRange: [-0.7, 0.7],
    outputRange: [-0.12, 0.12],
    extrapolateLeft: "clamp",
  });

  const minusScrollY = Animated.multiply(clampedScrollY, -1);

  const translateY = Animated.diffClamp(minusScrollY, -55, 0);

  return (
    <Animated.View style={[styles.container, { transform: [{translateY: headerVisible ? translateY : 0}]}]}>
      {headerVisible && <CollapsibleHeader scrollY={scrollY} />}
      <Tab.Navigator
        backBehavior="history"
        screenOptions={() => ({
          tabBarItemStyle: !headerVisible
            ? styles.tabBarItemContainerHeaderInvisible
            : styles.tabBarItemContainer,
          tabBarIconStyle: styles.tabBarIconStyle,
          tabBarShowLabel: false,
          tabBarPressColor: color.White,
          tabBarStyle: styles.tabBarStyle,
          tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
        })}
      >
        <Tab.Screen
          name="HomeScreen"
          options={() => ({
            tabBarIcon: ({ focused }) => (focused ? homeIconFocused : homeIcon),
          })}
        >
          {(props) => (
            <HomeScreen
              setHeaderVisible={setHeaderVisible}
              scrollY={scrollY}
              {...props}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Friends"
          component={FriendScreen}
          options={() => ({
            tabBarIcon: ({ focused }) => (focused ? friendFocused : friend),
          })}
        />
        <Tab.Screen
          name="Watch"
          component={WatchScreen}
          options={() => ({
            tabBarIcon: ({ focused }) => (focused ? videoFocused : video),
          })}
        />
        <Tab.Screen
          name="New Feeds"
          component={NewfeedScreen}
          options={() => ({
            tabBarIcon: ({ focused }) => (focused ? newfeedFocused : newfeed),
          })}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationScreen}
          options={() => ({
            tabBarIcon: ({ focused }) =>
              focused ? notificationFocused : notification,
          })}
        />
        <Tab.Screen
          name="Menu"
          component={MenuScreen}
          options={() => ({
            tabBarIcon: ({ focused }) => (focused ? MenuFocused : Menu),
          })}
        />
      </Tab.Navigator>
    </Animated.View>
  );
};

const size = 24;

const homeIcon = (
  <Ionicons name="home-outline" size={size} color={color.Black} />
);
const homeIconFocused = (
  <Entypo name="home" size={size} color={color.MainBlue} />
);
const friendFocused = (
  <FontAwesome5 name="user-friends" size={size} color={color.MainBlue} />
);
const friend = <Feather name="users" size={size} color={color.Black} />;
const videoFocused = (
  <MaterialCommunityIcons
    name="television-pause"
    size={size}
    color={color.MainBlue}
  />
);
const video = (
  <MaterialIcons name="ondemand-video" size={size} color={color.Black} />
);
const newfeedFocused = (
  <MaterialCommunityIcons
    name="newspaper-variant"
    size={size}
    color={color.MainBlue}
  />
);
const newfeed = (
  <MaterialCommunityIcons
    name="newspaper-variant-outline"
    size={size}
    color={color.Black}
  />
);
const notificationFocused = (
  <Fontisto name="bell-alt" size={size} color={color.MainBlue} />
);
const notification = <Fontisto name="bell" size={size} color={color.Black} />;
const MenuFocused = (
  <SimpleLineIcons name="menu" size={size} color={color.MainBlue} />
);
const Menu = <SimpleLineIcons name="menu" size={size} color="black" />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:color.White
  },
  tabBarItemContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#cecece",
  },
  tabBarIconStyle: {
    width: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarItemContainerHeaderInvisible: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#cecece",
  },
  tabBarStyle: {
    elevation: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  tabBarIndicatorStyle: {
    backgroundColor: "#115cbf",
    borderWidth: 1,
    borderColor: "#115cbf",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
});
