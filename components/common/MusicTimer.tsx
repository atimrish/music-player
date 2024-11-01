import {StyleSheet, Text} from 'react-native'
import {useAudioContext} from "@/context/AudioContext";
import {AVPlaybackStatusSuccess} from "expo-av";
import {useEffect, useRef, useState} from "react";

const formatTime = (millis: number): string => {
    const minutes = Math.floor(millis / 60 / 1000)
    const seconds = Math.floor(millis / 1000) % 60
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
    const {
        sound,
        setStatus,
        status
    } = useAudioContext()

    useEffect(() => {
        if (sound && status && status.isPlaying) {
            const interval = setInterval(async () => {
                const status = await sound.getStatusAsync() as AVPlaybackStatusSuccess
                setStatus(status)
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [sound, status]);

    return <Text style={styles.currentDurationText}>{formatTime(status?.positionMillis || 0)}</Text>
}