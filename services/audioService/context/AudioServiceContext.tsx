import {createContext, ReactNode, useContext, useEffect, useRef, useState} from "react";
import {AudioService} from "@/services/audioService/AudioService";
import {Audio, AVPlaybackStatusSuccess} from "expo-av";

interface IAudioService {
    audio: Audio.Sound,
    status: AVPlaybackStatusSuccess,
    loadAudio: (data: any) => Promise<void>,
    playAudio: () => Promise<void>,
    pauseAudio: () => Promise<void>,
    setPositionAudio: (position: number) => Promise<void>,
}

const AudioServiceContext = createContext<Partial<IAudioService>>({})
const useAudioService = () => useContext(AudioServiceContext)

export default function AudioServiceProvider({children}: { children: ReactNode }) {
    const audioService = useRef(new AudioService())

    const [audio, setAudio] = useState(audioService.current.audio)
    const [status, setStatus] = useState(audioService.current.status)

    const loadAudio: IAudioService['loadAudio'] = async (uri) => {
        await audioService.current.loadAudio(uri)
        setAudio(audioService.current.audio)
        setStatus(audioService.current.status)
    }

    const playAudio: IAudioService['playAudio'] = async () => {
        if (audio) {
            await audioService.current.playAudio()
            setStatus(await audio.getStatusAsync() as AVPlaybackStatusSuccess)
        }
    }

    const pauseAudio: IAudioService['pauseAudio'] = async () => {
        if (audio) {
            await audioService.current.pauseAudio()
            setStatus(await audio.getStatusAsync() as AVPlaybackStatusSuccess)
        }
    }

    const setPositionAudio: IAudioService['setPositionAudio'] = async (position) => {
        if (audio) {
            await audioService.current.setPositionAudio(position)
            setStatus(await audio.getStatusAsync() as AVPlaybackStatusSuccess)
        }
    }

    useEffect(() => {
        if (audio && status && status.isPlaying) {
            const interval = setInterval(async () => {
                setStatus(await audio.getStatusAsync() as AVPlaybackStatusSuccess)
            }, 1000)

            return () => clearInterval(interval)
        }
    }, [status]);

    return (
        <AudioServiceContext.Provider
            value={{
                audio,
                status,
                loadAudio,
                playAudio,
                pauseAudio,
                setPositionAudio
            }}
        >
            {children}
        </AudioServiceContext.Provider>
    )
}

export {useAudioService}
