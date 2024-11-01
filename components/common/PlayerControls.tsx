import {StyleSheet, View} from "react-native";
import PrevIcon from "@/components/icons/PrevIcon";
import PauseIcon from "@/components/icons/PauseIcon";
import NextIcon from "@/components/icons/NextIcon";
import RandomIcon from "@/components/icons/RandomIcon";
import RepeatIcon from "@/components/icons/RepeatIcon";
import {useEffect} from "react";
import {Audio, AVPlaybackStatusSuccess} from "expo-av";
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

    const {
        sound,
        status,
        setSound,
        setStatus
    } = useAudioContext()

    useEffect(() => {
        (async () => {
            const {sound, status} = await Audio.Sound.createAsync(require('@/assets/audio/In Bloom.mp3'))
            setSound(sound)
            setStatus(status as AVPlaybackStatusSuccess)
        })()
    }, []);

    const setStatusOnClick = async () => {
        if (sound) {
            const newStatus = await sound.getStatusAsync() as AVPlaybackStatusSuccess
            if (newStatus.isPlaying) {
                setStatus(await sound.pauseAsync() as AVPlaybackStatusSuccess)
            } else {
                setStatus(await sound.playAsync() as AVPlaybackStatusSuccess)
            }
        }
    }

    return (
        <View style={styles.playerControls}>
            <RandomIcon/>
            <View style={styles.playerInner}>
                <PrevIcon/>
                <View onTouchStart={() => setStatusOnClick()}>
                    {status && status.isPlaying ? <PauseIcon/> : <PlayIcon/>}
                </View>
                <NextIcon/>
            </View>
            <RepeatIcon/>
        </View>

    );
};