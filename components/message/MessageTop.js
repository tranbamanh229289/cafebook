import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
import { SearchBar } from "./SearchBar";
import { SuggestPeopleList } from "./SuggestPeopleList";
  export const MessageTop = () => {
    return (
      <View>
        <SearchBar/>
        <SuggestPeopleList/>
      </View>
    );
  };
  