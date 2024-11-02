import {Dimensions, Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import MusicSlider from "@/components/common/MusicSlider";
import PlayerControls from "@/components/common/PlayerControls";
import AudioServiceProvider from "@/services/audioService/context/AudioServiceContext";

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
    },
    musicTitle: {
        fontSize: 24,
        color: '#DBDCDC',
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 40
    },
    musicAuthor: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        color: '#DBDCDC',
        marginTop: 10
    },
    musicCover: {
        width: 200,
        height: 200,
        resizeMode: "cover",
        borderRadius: 25,
        marginTop: 40
    },
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
                    <AudioServiceProvider>
                        <Text style={styles.text}>Слушается сейчас</Text>

                        <Image
                            source={{uri: 'https://www.bygonely.com/wp-content/uploads/2023/02/Nirvana_Nevermind_Album_1.jpg'}}
                            style={styles.musicCover}
                        />

                        <Text style={styles.musicTitle}>In Bloom</Text>
                        <Text style={styles.musicAuthor}>Nirvana</Text>
                        <MusicSlider/>
                        <PlayerControls/>
                    </AudioServiceProvider>
                </View>


            </ImageBackground>
        </View>

    );
};