import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { LoginSplashAnimation } from "./animation/LoginSplashAnimation";
import { Navigator } from "./navigations/Navigator";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "asap-bold": require("./assets/fonts/Asap-Bold.ttf"),
    "asap-semi": require("./assets/fonts/Asap-SemiBold.ttf"),
    "asap-italic": require("./assets/fonts/Asap-Italic.ttf"),
    "asap-regular": require("./assets/fonts/Asap-Regular.ttf"),
    "Cochin": require("./assets/fonts/Cochin.ttf")
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
  return <>{!fontLoaded ? <LoginSplashAnimation /> : <Navigator />}</>;
}
