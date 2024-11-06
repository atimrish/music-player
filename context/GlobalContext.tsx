import {createContext, useContext, Dispatch, SetStateAction, ReactNode, useState} from "react";
import {AudioModel, IAudioModel} from "@/services/databaseService/models/AudioModel";

interface IGlobalContext {
    audios: Array<IAudioModel>,
    setAudios: Dispatch<SetStateAction<Array<IAudioModel>>>,
    fetchAudios: () => Promise<void>,
}

const GlobalContext = createContext<IGlobalContext>({
    audios: [],
    setAudios: () => {},
    fetchAudios: async () => {},
})

export const useGlobalContext = () => useContext(GlobalContext)

export default function GlobalContextProvider({children}: { children: ReactNode }) {
    const [audios, setAudios] = useState<Array<IAudioModel>>([])

    const fetchAudios = async () => {
        setAudios(await AudioModel.getAll())
    }

    return (
        <GlobalContext.Provider value={{audios, setAudios, fetchAudios}}>
            {children}
        </GlobalContext.Provider>
    );
};