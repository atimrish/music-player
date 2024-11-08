import {FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {BlurView} from "expo-blur";
import Button from "@/components/ui/Button";
import Wrapper from "@/components/common/Wrapper";
import PlaylistModalItem, {PlaylistModalItemProps} from "@/components/common/playlist/PlaylistModalItem";
import {useEffect, useState} from "react";
import {useGlobalContext} from "@/context/GlobalContext";
import {StorageService} from "@/services/storageService/StorageService";
import {PlaylistModel} from "@/services/databaseService/models/PlaylistModel";
import {StringService} from "@/services/stringService/StringService";

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        position: 'relative'
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#dad8d8',
        borderRadius: 10,
        paddingTop: 22
    },
    heading: {
        color: '#575353',
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        marginBottom: 12
    },
    buttonsBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16
    },
    button: {
        width: '47%',
    },
    textInput: {
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 6,
        paddingVertical: 4,
        fontSize: 16,
        borderRadius: 5,
        marginVertical: 10,
        fontFamily: 'Montserrat-Medium',
    },
    coverPreview: {
        width: 100,
        height: 100,
        backgroundColor: 'gray',
        borderRadius: 10
    },
    coverPreviewBlock: {
        flexDirection: 'row',
        gap: 20,
    },
    selectFile: {
        color: '#7D7D7D',
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        marginVertical: 8
    },
    downloadUsing: {
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        color: '#575353',
        marginVertical: 20
    },
    list: {
        height: 300
    }
})

type Props = {
    visible: boolean,
    closeModal: () => void,
}

interface IAddPlaylistForm {
    title: string,
    coverUri: string,
    audios: Array<number>
}

export default function AddPlaylistModal(p: Props) {
    const [data, setData] = useState<Array<PlaylistModalItemProps>>([]);
    const {audios, fetchPlaylists} = useGlobalContext()
    const [formState, setFormState] = useState<IAddPlaylistForm>({
        title: '',
        audios: [],
        coverUri: ''
    })

    const onSubmit = async () => {
        const selectedAudios = data.filter(i => i.checked).map(i => i.id)
        const pathToCopy = StorageService.PLAYLIST_DIR + StringService.randomString() + StringService.fileExtension(formState.coverUri)
        await PlaylistModel.create({
            id: 0,
            title: formState.title,
            cover: await StorageService.copyToStorage(formState.coverUri, pathToCopy),
            audios: selectedAudios,
        })
        await fetchPlaylists()
        p.closeModal()
    }

    useEffect(() => {
        setData(
            audios.map((item) => {
                return {
                    id: item.id,
                    coverUri: item.cover,
                    title: item.title,
                    author: item.author,
                    checked: false,
                    setChecked: setData
                }
            })
        )
    }, [audios]);

    return (
        <Modal
            visible={p.visible}
            transparent={true}
            animationType="slide"
        >
            <BlurView intensity={70} tint="dark" style={styles.modal}>
                <View style={styles.modalContainer}>
                    <Wrapper>
                        <Text style={styles.heading}>Добавить плейлист</Text>

                        <TextInput
                            style={styles.textInput}
                            placeholder="Название"
                            value={formState.title}
                            onChange={(e) => setFormState({
                                ...formState,
                                title: e.nativeEvent.text
                            })}
                        />

                        <Text style={styles.downloadUsing}>Обложка</Text>
                        <View style={styles.coverPreviewBlock}>
                            <Image style={styles.coverPreview} src={formState.coverUri}/>

                            <TouchableOpacity
                                onPress={async () => {
                                    const {canceled, assets} = await StorageService.pick({type: 'image/*'})
                                    if (!canceled) setFormState({...formState, coverUri: assets[0].uri})
                                }}
                            >
                                <Text style={styles.selectFile}>Выбрать обложку</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.downloadUsing}>Аудио</Text>
                        <FlatList
                            style={styles.list}
                            data={data}
                            renderItem={i => <PlaylistModalItem {...i.item}/>}
                        />

                        <View style={styles.buttonsBlock}>
                            <Button title="Сохранить" style={{width: '48%'}} onPress={onSubmit}/>
                            <Button title="Отмена" style={{width: '48%'}} onPress={p.closeModal}/>
                        </View>
                    </Wrapper>
                </View>
            </BlurView>
        </Modal>
    );
}