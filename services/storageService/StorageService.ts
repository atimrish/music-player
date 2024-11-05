import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system"

class StorageService {
    static DELIMITER = '\\'
    static AUDIO_PREFIX = 'audio'
    static IMAGE_PREFIX = 'image'
    static AUDIO_DIR = FileSystem.documentDirectory + this.DELIMITER + this.AUDIO_PREFIX
    static IMAGE_DIR = FileSystem.documentDirectory + this.DELIMITER + this.IMAGE_PREFIX

    static async initIfNeeded() {
        const readResult = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory || '')
        if (!readResult.includes('audio')) {
            await FileSystem.makeDirectoryAsync(this.AUDIO_DIR)
        }

        if (!readResult.includes('image')) {
            await FileSystem.makeDirectoryAsync(this.IMAGE_DIR)
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
}

export {StorageService}
