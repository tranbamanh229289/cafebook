import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { LoginSplashAnimation } from "./animation/LoginSplashAnimation";
import { Navigator } from "./navigations/Navigator";
import 'expo-dev-client';
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { SearchScreen } from "./screens/home/SearchScreen";
import { SearchHistory } from "./screens/home/SearchHistory";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "asap-bold": require("./assets/fonts/Asap-Bold.ttf"),
    "asap-semi": require("./assets/fonts/Asap-SemiBold.ttf"),
    "asap-italic": require("./assets/fonts/Asap-Italic.ttf"),
    "asap-regular": require("./assets/fonts/Asap-Regular.ttf"),
    "Cochin": require("./assets/fonts/Cochin.ttf"),
    "klavika-bold-italic": require("./assets/fonts/klavika-bold-italic.otf"),
    "klavika-bold": require("./assets/fonts/klavika-bold.otf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Condensed": require("./assets/fonts/Roboto-Condensed.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-BoldCondensed": require("./assets/fonts/Roboto-BoldCondensed.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    if (!fontLoaded) {
      // simulation fetch data in first-time install app
      fetchFonts().then(() => {
        setTimeout(() => {
          setFontLoaded(true);
        }, 3000);
      });
    }
  }, [[fontLoaded]]);
   return <Provider store={store}>{!fontLoaded ? <LoginSplashAnimation /> : <Navigator />}</Provider>;
  // return <SearchHistory/>;
}
