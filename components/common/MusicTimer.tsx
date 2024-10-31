import {Text, StyleSheet} from 'react-native'
import {useAudioContext} from "@/context/AudioContext";
import {useEffect} from "react";

const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60;
    const minutesStr = minutes.toString().padStart(2, '0')
    const secondsStr = seconds.toString().padStart(2, '0')
    return `${minutesStr}:${secondsStr}`;
}

const styles = StyleSheet.create({
    currentDurationText: {
        color: '#989999',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
})

export default function MusicTimer() {
    const {isPlaying, seconds, setSeconds} = useAudioContext()

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => setSeconds(prev => prev + 1), 1000)
            return () => clearInterval(interval)
        }

    }, [isPlaying]);

    return <Text style={styles.currentDurationText}>{formatTime(seconds)}</Text>
}