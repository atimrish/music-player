import {DBService} from "@/services/databaseService/DBService";

interface IAudioModel {
    id: number
    title: string
    author: string
    cover: string
    uri: string
}

class AudioModel {
    static TABLE_NAME = 'audio'

    static async getAll() {
        return await DBService.getAll<IAudioModel>(this.TABLE_NAME)
    }

    static async getById(id: number) {
        return await DBService.getById<IAudioModel>(this.TABLE_NAME, id)
    }

    static async create(data: IAudioModel): Promise<number> {
        return await DBService.create<IAudioModel>(this.TABLE_NAME, data)
    }

    static async deleteById(id: number) {
        return await DBService.deleteById(this.TABLE_NAME, id)
    }
}

export {AudioModel, IAudioModel}