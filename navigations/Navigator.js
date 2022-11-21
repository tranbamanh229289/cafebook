import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View, Animated, Easing } from "react-native";
import { CreatePostHeaderRight, CreatePostRightBarHeader } from "../components/home-screen/CreatePostHeaderRight";
import color from "../constants/color/color";
import { CreatePost } from "../screens/home/CreatePost";
import { MessagingScreen } from "../screens/home/MessagingScreen";
import { SearchScreen } from "../screens/home/SearchScreen";
import LoginScreen from "../screens/login/LoginScreen";
import { CreateAccountScreen } from "../screens/register/CreateAccountScreen";
import { NameScreen } from "../screens/register/NameScreen";
import { TabBarNavigator } from "./top-tab-bar/TabBarNavigator";

const Stack = createNativeStackNavigator();
export const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={() => ({
            headerShown: false,
            headerTransparent: true,
            statusBarTranslucent: false,
            statusBarColor: "transparent",
            statusBarTranslucent: true,
          })}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccountScreen}
          options={()=>({
            headerShown: true,
            title: "Create account",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "normal",
            },
            headerShadowVisible: false,     
            contentStyle: {
              borderTopWidth: 1,
              borderTopColor: color.HeaderBorderColor
            },
            statusBarColor: "transparent",
            statusBarStyle: "dark",
          })}
        />
        <Stack.Screen
          name="NameScreen"
          component={NameScreen}
          options={()=>({
            headerShown: true,
            title: "Name",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "normal",
            },
            headerShadowVisible: false,     
            contentStyle: {
              borderTopWidth: 1,
              borderTopColor: color.HeaderBorderColor
            },
            statusBarColor: "transparent",
            statusBarStyle: "dark"
          })}
        />
        <Stack.Screen
          name="HomeTab"
          component={TabBarNavigator}
          options={({ route }) => ({
            header: () => null,
            headerBackVisible: false,
            headerShadowVisible: false,
            statusBarColor: "transparent",
            statusBarStyle: "dark"
          })}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={() => ({
            headerShown: false,
            headerTransparent: true,
          })}
        />
        <Stack.Screen
          name="Message"
          component={MessagingScreen}
          options={() => ({
            headerShown: false,
            headerTransparent: true,
          })}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={()=>({
            headerShown: true,
            title: "Create post",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "normal",
            },
            headerRight: () => <CreatePostHeaderRight/>
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  
});
