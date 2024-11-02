import {Audio, AVPlaybackStatusSuccess} from "expo-av";

class AudioService {
    audio: Audio.Sound | undefined
    status: AVPlaybackStatusSuccess | undefined

    constructor() {
        this.audio = undefined
        this.status = undefined
    }

    async loadAudio(uri: any) {
        const {sound, status} = await Audio.Sound.createAsync(uri)
        this.audio = sound
        this.status = status as AVPlaybackStatusSuccess
    }

    async playAudio() {
        if (this.audio) {
            this.status = await this.audio.playAsync() as AVPlaybackStatusSuccess
        }
    }

    async pauseAudio() {
        if (this.audio) {
            this. status = await this.audio.pauseAsync() as AVPlaybackStatusSuccess
        }
    }
}

export {AudioService}
