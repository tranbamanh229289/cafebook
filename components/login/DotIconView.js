import { Entypo } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

export const DotIconView = () => {
    return (
        <View style={styles.container}>
            <Entypo name="dot-single" size={12} color="#737373" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});