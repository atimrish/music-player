import {Image, StyleSheet, View} from "react-native";

const styles = StyleSheet.create({
    slider: {
        width: 100,
        height: 100,
        padding: 20,
        shadowColor: "#000",
        marginTop: 40,
        borderWidth: 3,
        borderColor: ''
    },
    musicCover: {
        width: 200,
        height: 200,
        resizeMode: "cover",
        alignSelf: "center",
        borderRadius: 25,
    }
})

export default function MusicSlider() {
    return (
        <View style={styles.slider}>
            <Image
                source={{uri: 'https://www.bygonely.com/wp-content/uploads/2023/02/Nirvana_Nevermind_Album_1.jpg'}}
                style={styles.musicCover}
            />
        </View>
    );
};
