import {Dimensions, ImageBackground, StyleSheet, Text, View} from "react-native";
import MusicSlider from "@/components/common/MusicSlider";
import PlayerControls from "@/components/common/PlayerControls";
import AudioContextProvider, {useAudioContext} from "@/context/AudioContext";
import MusicTimer from "@/components/common/MusicTimer";

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
        fontWeight: '600'
    },
    musicAuthor: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        color: '#DBDCDC',
        marginTop: 10
    }
})

export default function Index() {
    const {sound} = useAudioContext();

    return (
        <View style={styles.mainContainer}>
            <ImageBackground
                source={{uri: 'https://www.bygonely.com/wp-content/uploads/2023/02/Nirvana_Nevermind_Album_1.jpg'}}
                style={styles.imageBackground}
                blurRadius={30}
            >
                <View style={styles.paddingContainer}>
                    <AudioContextProvider>
                        <Text style={styles.text}>Слушается сейчас</Text>
                        <MusicSlider/>
                        <MusicTimer/>
                        <Text style={styles.musicTitle}>In Bloom</Text>
                        <Text style={styles.musicAuthor}>Nirvana</Text>

                        <PlayerControls/>
                    </AudioContextProvider>
                </View>


            </ImageBackground>
        </View>

    );
};