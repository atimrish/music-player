import {createContext, ReactNode, useContext, useState} from "react";
import {AudioModel, IAudioModel} from "@/services/databaseService/models/AudioModel";
import {IPlaylistModel, PlaylistModel} from "@/services/databaseService/models/PlaylistModel";

interface IGlobalContext {
    audios: Array<IAudioModel>,
    fetchAudios: () => Promise<void>,
    playlists: Array<IPlaylistModel>
    fetchPlaylists: () => Promise<void>,
}

const GlobalContext = createContext<IGlobalContext>({
    audios: [],
    fetchAudios: async () => {},
    playlists: [],
    fetchPlaylists: async () => {},
})

export const useGlobalContext = () => useContext(GlobalContext)

export default function GlobalContextProvider({children}: { children: ReactNode }) {
    const [audios, setAudios] = useState<Array<IAudioModel>>([])
    const [playlists, setPlaylists] = useState<Array<IPlaylistModel>>([])



    const fetchAudios = async () => {
        setAudios(await AudioModel.getAll())
    }

    const fetchPlaylists = async () => {
        setPlaylists(await PlaylistModel.getAll())
    }

    return (
        <GlobalContext.Provider value={{audios, fetchAudios, playlists, fetchPlaylists}}>
            {children}
        </GlobalContext.Provider>
    );
};