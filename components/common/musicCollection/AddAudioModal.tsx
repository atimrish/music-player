import {BlurView} from "expo-blur";
import {Image, Modal, StyleSheet, Text, TextInput, View} from "react-native";
import Wrapper from "@/components/common/Wrapper";
import RadioGroup, {RadioButtonProps} from "react-native-radio-buttons-group";
import {useState} from "react";
import Button from "@/components/ui/Button"
import {StorageService} from "@/services/storageService/StorageService";

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
    downloadUsing: {
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        color: '#575353',
        marginVertical: 20
    },
    radioContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    selectFile: {
        color: '#7D7D7D',
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        marginVertical: 8
    },
    buttonsBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16
    },
    button: {
        width: '47%',
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
    }
})

type Props = {
    modalVisible: boolean,
    closeModal: Function,
}

const radio: Array<RadioButtonProps> = [
    {
        id: '1',
        label: 'ссылку',
        value: 'option1'
    },
    {
        id: '2',
        label: 'внутреннее хранилище',
        value: 'option2'
    },
    {
        id: '3',
        label: 'ссылку YouTube to mp3',
        value: 'option2'
    }
]

interface IAddAudioForm {
    title: string,
    author: string,
    downloadBy?: '1' | '2' | '3',
    imageURI: string,
    linkURI?: string,
    localURI?: string,
    youTubeURI?: string
}

export default function AddAudioModal(p: Props) {
    const [selectedId, setSelectedId] = useState('')

    const [formState, setFormState] = useState<IAddAudioForm>({
        title: '',
        author: '',
        imageURI: '',
        linkURI: ''
    })

    const handleDocumentPick = async () => {
        const {canceled, assets} = await StorageService.pick({type: 'audio/mpeg'})
        if (!canceled) {
            setFormState({...formState, localURI: assets[0].uri})
        }
    }

    const handleCoverPick = async () => {
        const {canceled, assets} = await StorageService.pick({type: 'image/*'})
        if (!canceled) {
            setFormState({...formState, imageURI: assets[0].uri})
        }
    }

    const handleSubmit = async () => {
        if (selectedId === '1') {
            await StorageService.download(formState.linkURI || '')
        }

        if (selectedId === '2') {

        }

        if (selectedId === '3') {

        }
    }

    return (
        <Modal
            visible={p.modalVisible}
            transparent={true}
            animationType="slide"
        >
            <BlurView intensity={70} tint="dark" style={styles.modal}>
                <View style={styles.modalContainer}>
                    <Wrapper>
                        <Text style={styles.heading}>Добавить аудио</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="название аудио"
                            value={formState.title}
                            onChange={e => setFormState({
                                ...formState, title: e.nativeEvent.text
                            })}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="исполнитель"
                            value={formState.author}
                            onChange={e => setFormState({
                                ...formState, author: e.nativeEvent.text
                            })}
                        />

                        <Text style={styles.downloadUsing}>Обложка</Text>
                        <View style={styles.coverPreviewBlock}>
                            <Image src={formState.imageURI} style={styles.coverPreview}/>

                            <View>
                                <Text
                                    style={styles.selectFile}
                                    onPress={handleCoverPick}
                                >Выбрать обложку</Text>
                            </View>
                        </View>

                        <Text style={styles.downloadUsing}>Загрузить используя</Text>

                        <RadioGroup
                            radioButtons={radio}
                            containerStyle={styles.radioContainer}
                            onPress={setSelectedId}
                            selectedId={selectedId}
                        />
                        {selectedId === '1' &&
                            <TextInput
                                style={styles.textInput}
                                placeholder="ссылка"
                                value={formState.linkURI}
                                onChange={e => setFormState({
                                    ...formState, linkURI: e.nativeEvent.text
                                })}
                            />
                        }

                        {selectedId === '2' &&
                            <Text
                                style={styles.selectFile}
                                onPress={handleDocumentPick}
                            >Выбрать файл</Text>
                        }

                        {selectedId === '3' &&
                            <TextInput
                                style={styles.textInput}
                                placeholder="ссылка на видео YouTube"
                                value={formState.youTubeURI}
                            />
                        }

                        <View style={styles.buttonsBlock}>
                            <Button title="Сохранить" style={{width: '48%'}} onPress={handleSubmit}/>
                            <Button title="Отмена" style={{width: '48%'}} onPress={() => p.closeModal()}/>
                        </View>
                    </Wrapper>
                </View>
            </BlurView>
        </Modal>
    );
};