import {StyleSheet, View} from "react-native";
import PrevIcon from "@/components/icons/PrevIcon";
import PauseIcon from "@/components/icons/PauseIcon";
import NextIcon from "@/components/icons/NextIcon";
import RandomIcon from "@/components/icons/RandomIcon";
import RepeatIcon from "@/components/icons/RepeatIcon";
import {useEffect} from "react";
import PlayIcon from "@/components/icons/PlayIcon";
import {useAudioService} from "@/services/audioService/context/AudioServiceContext";

const styles = StyleSheet.create({
    playerControls: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
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
    const {status, loadAudio, pauseAudio, playAudio} = useAudioService()

    useEffect(() => {
        const data = require('@/assets/audio/In Bloom.mp3')
        loadAudio && loadAudio(data)
    }, []);

    const setStatusOnClick = async () => {
        if (status && pauseAudio && playAudio) {
            status.isPlaying ? pauseAudio() : playAudio()
        }
    }

    return (
        <View>
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
        </View>
    );
};