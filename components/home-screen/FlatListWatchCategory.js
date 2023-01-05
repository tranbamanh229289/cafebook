import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import color from "../../constants/color/color";

const category = [
    { id: 0, title: "For You" },
    { id: 1, title: "Live" },
    { id: 2, title: "Gaming" },
    { id: 3, title: "Reels" },
    { id: 4, title: "Following" },
  ];

  const ItemSeparatorComponent = () => <View style={{ width: 10 }} />;

  

export const FlatListWatchCategory = () => {
    const renderItem = ({ item }) => <Item title={item.title} id={item.id}/>;
    const [selected , setSelected] = useState(0);

    const Item = ({ title, id }) => (
      <TouchableHighlight
        style={[styles.item, selected === id && {backgroundColor: color.MainBlueBlur}]}
        onPress={() => {setSelected(id)}}
        underlayColor={color.TouchableHighlightBorderWhite}
      >
        <Text style={[styles.textButton , selected === id && {color: color.MainBlue}]}>{title}</Text>
      </TouchableHighlight>
    );

    return (
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        data={category}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        keyExtractor={(item) => item.id}
        horizontal
      />
    );
}

const styles = StyleSheet.create({
  item: {
    width: 80,
    height: 36,
    backgroundColor: color.White,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
  textButton: {
    fontFamily: "Roboto-Medium",
  },
  contentContainerStyle: {
    marginLeft: 3,
  }
});