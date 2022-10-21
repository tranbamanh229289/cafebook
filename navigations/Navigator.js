import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/login/HomeScreen";
import LoginScreen from "../screens/login/LoginScreen";

const Stack = createNativeStackNavigator();
export const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen}
        options={()=>({
          headerShown: false,
          headerTransparent: true,
        })}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen}
        options={()=>({
          title: "Home",
          headerShown: true,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "#bfbfbf"
          }
        })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
