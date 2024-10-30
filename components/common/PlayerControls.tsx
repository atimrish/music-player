import {StyleSheet, View} from "react-native";
import PrevIcon from "@/components/icons/PrevIcon";
import PauseIcon from "@/components/icons/PauseIcon";
import NextIcon from "@/components/icons/NextIcon";
import RandomIcon from "@/components/icons/RandomIcon";
import RepeatIcon from "@/components/icons/RepeatIcon";
import {useEffect} from "react";
import {Audio} from "expo-av";
import PlayIcon from "@/components/icons/PlayIcon";
import {useAudioContext} from "@/context/AudioContext";

const styles = StyleSheet.create({
    playerControls: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 40
    },
    playerInner: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30
    }
})

export default function PlayerControls() {

    const {isPlaying, sound, setSound, setIsPlaying, setStatus} = useAudioContext()

    useEffect(() => {
        (async () => {
            const {sound, status} = await Audio.Sound.createAsync(require('@/assets/audio/In Bloom.mp3'))
            setSound(sound)
            setStatus(status)
        })()
    }, []);

    useEffect(() => {
        if (sound) {
            isPlaying ? sound.playAsync() : sound.pauseAsync()
        }
    }, [isPlaying, sound]);

    const mainButton = isPlaying ?
        (
            <View onTouchStart={() => setIsPlaying(false)}>
                <PauseIcon/>
            </View>
        ) : (
            <View onTouchStart={() => setIsPlaying(true)}>
                <PlayIcon/>
            </View>
        )

    return (
        <View style={styles.playerControls}>
            <RandomIcon/>
            <View style={styles.playerInner}>
                <PrevIcon/>
                {mainButton}
                <NextIcon/>
            </View>
            <RepeatIcon/>
        </View>

    );
};