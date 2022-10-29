import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View, Animated, Easing } from "react-native";
import { RightBarHeader } from "../components/home-screen/RightBarHeader";
import color from "../constants/color/color";
import { MessagingScreen } from "../screens/home/MessagingScreen";
import { SearchScreen } from "../screens/home/SearchScreen";
import LoginScreen from "../screens/login/LoginScreen";
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
          })}
        />
        <Stack.Screen
          name="HomeTab"
          component={TabBarNavigator}
          options={({ route }) => ({
            header: () => null,
            headerBackVisible: false,
            headerShadowVisible: false,
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  
});
