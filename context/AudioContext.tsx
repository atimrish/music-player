import {createContext, ReactNode, useContext, useState} from "react";
import {Audio, AVPlaybackStatus} from "expo-av";

interface AudioContext {
    sound?: Audio.Sound,
    setSound: (sound: Audio.Sound) => void,

    status?: AVPlaybackStatus,
    setStatus: (status: AVPlaybackStatus) => void,

    isPlaying: boolean,
    setIsPlaying: (isPlaying: boolean) => void,
}

const AudioContext = createContext<AudioContext>({
    sound: undefined,
    status: undefined,
    isPlaying: false,
    setSound: (sound: Audio.Sound) => {},
    setStatus: (status: AVPlaybackStatus) => {},
    setIsPlaying: (isPlaying: boolean) => {},
})

export const useAudioContext = () => useContext(AudioContext)

export default function AudioContextProvider({children}: {children: ReactNode}) {
    const [sound, setSound] = useState<Audio.Sound>()
    const [status, setStatus] = useState<AVPlaybackStatus>()
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <AudioContext.Provider value={{ sound, status, isPlaying, setSound, setStatus, setIsPlaying }}>
            {children}
        </AudioContext.Provider>
    )
}
