import {Image, StyleSheet, Text, View} from "react-native";
import MusicSlider from "@/components/common/MusicSlider";
import PlayerControls from "@/components/common/PlayerControls";
import {useAudioService} from "@/services/audioService/context/AudioServiceContext";
import Wrapper from "@/components/common/Wrapper";
import {useLocalSearchParams} from "expo-router";
import {useEffect, useRef, useState} from "react";
import {AudioModel, IAudioModel} from "@/services/databaseService/models/AudioModel";

const styles = StyleSheet.create({
    paddingContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    mainContainer: {
        width: '100%',
        height: '100%',
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

export default function Id() {
    const {id} = useLocalSearchParams();
    const {loadAudio} = useAudioService()
    const [audioState, setAudioState] = useState<IAudioModel>({
        id: 0,
        title: '',
        author: '',
        cover: '',
        uri: ''
    })

    useEffect(() => {
        AudioModel.getById(+id).then(res => setAudioState(res))
    }, []);

    useEffect(() => {
        if (loadAudio && audioState.uri.length > 0) {
            loadAudio(audioState.uri)
        }
    }, [audioState]);

    return (
        <View style={styles.mainContainer}>
            <Wrapper>
                <View style={styles.paddingContainer}>
                    <Text style={styles.text}>Слушается сейчас</Text>
                    <Image
                        src={audioState.cover}
                        style={styles.musicCover}
                    />
                    <Text style={styles.musicTitle}>{audioState.title}</Text>
                    <Text style={styles.musicAuthor}>{audioState.author}</Text>
                    <MusicSlider/>
                    <PlayerControls/>
                </View>
            </Wrapper>
        </View>

    );
};