import {Dimensions, ImageBackground, StyleSheet, Text, View} from "react-native";
import MusicSlider from "@/components/common/MusicSlider";

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        resizeMode: "cover",
        paddingTop: 28,
        paddingLeft: 22,
        paddingRight: 22,
    },
    paddingContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    mainContainer: {
        width: '100%',
        height: Dimensions.get("window").height,
    },
    text: {
        color: '#F5F5F5',
        fontSize: 16,
        textAlign: 'center',
    }
})

export default function Index() {
    return (
        <View style={styles.mainContainer}>
            <ImageBackground
                source={{uri: 'https://www.bygonely.com/wp-content/uploads/2023/02/Nirvana_Nevermind_Album_1.jpg'}}
                style={styles.imageBackground}
                blurRadius={30}
            >
                <View style={styles.paddingContainer}>
                    <Text style={styles.text}>Слушается сейчас</Text>
                    <MusicSlider/>
                </View>

            </ImageBackground>
        </View>

    );
};