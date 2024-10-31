import React, {createContext, ReactNode, useContext, useState} from "react";
import {Audio, AVPlaybackStatus} from "expo-av";

interface AudioContext {
    sound?: Audio.Sound,
    setSound: React.Dispatch<React.SetStateAction<Audio.Sound | undefined>>,

    status?: AVPlaybackStatus,
    setStatus: React.Dispatch<React.SetStateAction<AVPlaybackStatus | undefined>>,

    isPlaying: boolean,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,

    seconds: number,
    setSeconds: React.Dispatch<React.SetStateAction<number>>,
}

const AudioContext = createContext<AudioContext>({
    sound: undefined,
    status: undefined,
    isPlaying: false,
    seconds: 0,
    setSound: () => {},
    setStatus: () => {},
    setIsPlaying: () => {},
    setSeconds: () => {},
})

export const useAudioContext = () => useContext(AudioContext)

export default function AudioContextProvider({children}: { children: ReactNode }) {
    const [sound, setSound] = useState<Audio.Sound>()
    const [status, setStatus] = useState<AVPlaybackStatus>()
    const [isPlaying, setIsPlaying] = useState(false)
    const [seconds, setSeconds] = useState<number>(0)

    return (
        <AudioContext.Provider value={{
            sound,
            status,
            isPlaying,
            seconds,
            setSound,
            setStatus,
            setIsPlaying,
            setSeconds
        }}>
            {children}
        </AudioContext.Provider>
    )
}
