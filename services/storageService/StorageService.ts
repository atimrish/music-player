import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system"

class StorageService {
    static DELIMITER = '/'

    static AUDIO_PREFIX = 'audio'
    static IMAGE_PREFIX = 'image'
    static PLAYLIST_PREFIX = 'playlist'

    static AUDIO_DIR = FileSystem.documentDirectory + this.DELIMITER + this.AUDIO_PREFIX
    static IMAGE_DIR = FileSystem.documentDirectory + this.DELIMITER + this.IMAGE_PREFIX
    static PLAYLIST_DIR = FileSystem.documentDirectory + this.DELIMITER + this.PLAYLIST_PREFIX

    static async initIfNeeded() {
        const readResult = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory || '')
        if (!readResult.includes(this.AUDIO_PREFIX)) {
            await FileSystem.makeDirectoryAsync(this.AUDIO_DIR)
        }
        if (!readResult.includes(this.IMAGE_PREFIX)) {
            await FileSystem.makeDirectoryAsync(this.IMAGE_DIR)
        }
        if (!readResult.includes(this.PLAYLIST_PREFIX)) {
            await FileSystem.makeDirectoryAsync(this.PLAYLIST_DIR)
        }
    }

    static async pick(opts?: DocumentPicker.DocumentPickerOptions) {
        return await DocumentPicker.getDocumentAsync(opts)
    }

    static async copyToStorage(from: string, filename: string) {
        const to = FileSystem.documentDirectory + filename
        await FileSystem.copyAsync({from, to})
        return to
    }

    static async download(uri: string, filename: string) {
        const path = FileSystem.documentDirectory + filename
        await FileSystem.downloadAsync(uri, path)
        return path
    }

    static async delete(uri: string) {
        await FileSystem.deleteAsync(uri)
    }
}

export {StorageService}
