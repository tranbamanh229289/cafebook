import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} from "react-native";
import {
  CreatePostHeaderRight,
  CreatePostRightBarHeader,
} from "../components/home-screen/CreatePostHeaderRight";
import color from "../constants/color/color";
import { CreatePost } from "../screens/home/CreatePost";
import { MessagingScreen } from "../screens/message/MessagingScreen";
import { CreateMessageScreen } from "../screens/message/CreateMessageScreen";
import { SearchChatScreen } from "../screens/message/SearchChatScreen";
import { SearchScreen } from "../screens/home/SearchScreen";
import LoginScreen from "../screens/login/LoginScreen";
import { BirthDayScreen } from "../screens/register/BirthdayScreen";
import { ConfirmScreen } from "../screens/register/ConfirmScreen";
import { CreateAccountScreen } from "../screens/register/CreateAccountScreen";
import { EmailAddressScreen } from "../screens/register/EmailAdressScreen";
import { GenderScreen } from "../screens/register/GenderScreen";
import { MobileNumberScreen } from "../screens/register/MobileNumberScreen";
import { NameScreen } from "../screens/register/NameScreen";
import { PasswordScreen } from "../screens/register/PasswordScreen";
import { TermAndPrivacyScreen } from "../screens/register/TermAndPrivacyScreen";
import { TabBarNavigator } from "./top-tab-bar/TabBarNavigator";
import { ChatScreen } from "../screens/message/ChatScreen";
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
          options={() => ({
            headerShown: true,
            title: "Create account",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "normal",
            },
            headerShadowVisible: false,
            contentStyle: {
              borderTopWidth: 1,
              borderTopColor: color.HeaderBorderColor,
            },
            statusBarColor: color.White,
            statusBarStyle: "dark",
          })}
        />
        <Stack.Screen
          name="NameScreen"
          component={NameScreen}
          options={() => ({
            headerShown: true,
            title: "Name",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "normal",
            },
            headerShadowVisible: false,
            contentStyle: {
              borderTopWidth: 1,
              borderTopColor: color.HeaderBorderColor,
            },
            statusBarColor: color.White,
            statusBarStyle: "dark",
          })}
        />
        <Stack.Screen
          name="BirthDayScreen"
          component={BirthDayScreen}
          options={() => ({
            headerShown: true,
            title: "Birthday",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "normal",
            },
            headerShadowVisible: false,
            contentStyle: {
              borderTopWidth: 1,
              borderTopColor: color.HeaderBorderColor,
            },
            statusBarColor: color.White,
            statusBarStyle: "dark",
          })}
        />
        <Stack.Screen
          name="GenderScreen"
          component={GenderScreen}
          options={() => ({
            headerShown: true,
            title: "Gender",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "normal",
            },
            headerShadowVisible: false,
            contentStyle: {
              borderTopWidth: 1,
              borderTopColor: color.HeaderBorderColor,
            },
            statusBarColor: color.White,
            statusBarStyle: "dark",
          })}
        />
        <Stack.Screen
          name="MobileNumberScreen"
          component={MobileNumberScreen}
          options={() => ({
            headerShown: true,
            title: "Mobile number",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "normal",
            },
            headerShadowVisible: false,
            contentStyle: {
              borderTopWidth: 1,
              borderTopColor: color.HeaderBorderColor,
            },
            statusBarColor: color.White,
            statusBarStyle: "dark",
          })}
        />
        <Stack.Screen
          name="EmailAddressScreen"
          component={EmailAddressScreen}
          options={() => ({
            headerShown: true,
            title: "Email address",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "normal",
            },
            headerShadowVisible: false,
            contentStyle: {
              borderTopWidth: 1,
              borderTopColor: color.HeaderBorderColor,
            },
            statusBarColor: color.White,
            statusBarStyle: "dark",
          })}
        />
        <Stack.Screen
          name="PasswordScreen"
          component={PasswordScreen}
          options={() => ({
            headerShown: true,
            title: "Password",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "normal",
            },
            headerShadowVisible: false,
            contentStyle: {
              borderTopWidth: 1,
              borderTopColor: color.HeaderBorderColor,
            },
            statusBarColor: color.White,
            statusBarStyle: "dark",
          })}
        />
        <Stack.Screen
          name="TermAndPrivacyScreen"
          component={TermAndPrivacyScreen}
          options={() => ({
            headerShown: true,
            title: "Terms & Privacy",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "normal",
            },
            headerShadowVisible: false,
            contentStyle: {
              borderTopWidth: 1,
              borderTopColor: color.HeaderBorderColor,
            },
            statusBarColor: color.White,
            statusBarStyle: "dark",
          })}
        />
        <Stack.Screen
          name="ConfirmScreen"
          component={ConfirmScreen}
          options={() => ({
            headerShown: true,
            title: "Confirmation",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "normal",
            },
            headerShadowVisible: false,
            contentStyle: {
              borderTopWidth: 1,
              borderTopColor: color.HeaderBorderColor,
            },
            statusBarColor: color.White,
            statusBarStyle: "dark",
          })}
        />
        <Stack.Screen
          name="HomeTab"
          component={TabBarNavigator}
          options={({ route }) => ({
            header: () => null,
            headerBackVisible: false,
            headerShadowVisible: false,
            statusBarColor: color.White,
            statusBarStyle: "dark",
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
          name="CreateMessage"
          component={CreateMessageScreen}
          options={() => ({
            headerShown: false,
            headerTransparent: true,
          })}
        />
        <Stack.Screen
          name="SearchChat"
          component={SearchChatScreen}
          options={() => ({
            headerShown: false,
            headerTransparent: true,
          })}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={() => ({
            headerShown: true,
            title: "Create post",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "normal",
            },
            headerShadowVisible: false,
            contentStyle: {
              borderTopWidth: 1,
              borderTopColor: color.HeaderBorderColor,
            },
            statusBarColor: color.White,
            statusBarStyle: "dark",
            headerRight: () => <CreatePostHeaderRight />,
          })}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={() => ({
            headerShown: false,
            headerTransparent: true,
          })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
