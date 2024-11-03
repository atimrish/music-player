import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
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
        color: '#575353',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Montserrat-Medium',
        fontWeight: 'medium'
    },
    musicTitle: {
        fontSize: 24,
        color: '#575353',
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 40,
        fontFamily: 'Montserrat-SemiBold',

    },
    musicAuthor: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        color: '#7D7D7D',
        marginTop: 10,
        fontFamily: 'Montserrat-Medium',
    },
    musicCover: {
        width: 300,
        height: 300,
        resizeMode: "cover",
        borderRadius: 25,
        marginTop: 40
    },
})

export default function Index() {

    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageBackground}>
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
            </View>
        </View>

    );
};