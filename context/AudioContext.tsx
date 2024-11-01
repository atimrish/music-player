import React, {createContext, ReactNode, useContext, useState} from "react";
import {Audio, AVPlaybackStatusSuccess} from "expo-av";

interface AudioContext {
    sound?: Audio.Sound,
    setSound: React.Dispatch<React.SetStateAction<Audio.Sound | undefined>>,

    status?: AVPlaybackStatusSuccess,
    setStatus: React.Dispatch<React.SetStateAction<AVPlaybackStatusSuccess | undefined>>,
}

const AudioContext = createContext<AudioContext>({
    sound: undefined,
    status: undefined,
    setSound: () => {},
    setStatus: () => {}
})

export const useAudioContext = () => useContext(AudioContext)

export default function AudioContextProvider({children}: { children: ReactNode }) {
    const [sound, setSound] = useState<Audio.Sound>()
    const [status, setStatus] = useState<AVPlaybackStatusSuccess | undefined>(undefined)

    return (
        <AudioContext.Provider value={{
            sound,
            status,
            setSound,
            setStatus
        }}>
            {children}
        </AudioContext.Provider>
    )
}
