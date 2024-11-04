import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system"

/*
* TODO:
*    получение файла
*    сохранение файла
*    удаление файла
*/
class StorageService {
    static async pick(opts?: DocumentPicker.DocumentPickerOptions) {
        return await DocumentPicker.getDocumentAsync(opts)
    }

    static async copy(from: string, to: string) {
        return await FileSystem.copyAsync({from, to})
    }

    static async download(uri: string) {
        await FileSystem.downloadAsync(uri, '')
    }
}

export {StorageService}
