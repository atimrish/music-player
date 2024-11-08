import {DBService} from "@/services/databaseService/DBService";

interface IPlaylistModel {
    id: number
    title: string,
    cover: string,
    audios: Array<number>
}

const fromJson = (i: IPlaylistModel) => {
    i.audios = JSON.parse(i.audios.toString())
    return i
}

class PlaylistModel {
    static TABLE_NAME = 'playlist'

    static async getAll() {
        const res = await DBService.getAll<IPlaylistModel>(this.TABLE_NAME)
        return res.map(fromJson)
    }

    static async getById(id: number) {
        const res = await DBService.getById<IPlaylistModel>(this.TABLE_NAME, id)
        return fromJson(res)
    }

    static async create(data: IPlaylistModel): Promise<number> {
        return await DBService.create<IPlaylistModel>(this.TABLE_NAME, data)
    }

    static async deleteById(id: number) {
        return await DBService.deleteById(this.TABLE_NAME, id)
    }
}

export {PlaylistModel, IPlaylistModel}