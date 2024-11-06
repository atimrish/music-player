import {Image, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import OptionsIcon from "@/components/icons/OptionsIcon";
import {router} from 'expo-router'
import {AudioModel} from "@/services/databaseService/models/AudioModel";
import {useGlobalContext} from "@/context/GlobalContext";
import {StorageService} from "@/services/storageService/StorageService";

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#E2EBED',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    audioCover: {
        width: 64,
        height: 64,
        borderRadius: 5,
    },
    firstFlex: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        color: '#575353'
    },
    author: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        color: '#7D7D7D'
    }
})

type AudioItemProps = {
    id: number
    title: string
    author: string
    coverUri: string,
    audioUri: string
    style?: StyleProp<ViewStyle>
}

export default function AudioItem(p: AudioItemProps) {
    const {fetchAudios} = useGlobalContext()

    const deleteHandler = async () => {
        await StorageService.delete(p.coverUri)
        await StorageService.delete(p.audioUri)
        await AudioModel.deleteById(p.id)
        await fetchAudios()
    }

    return (
        <View style={[styles.container, p.style]}>
            <Pressable
                style={styles.firstFlex}
                onPress={() => router.navigate(`/player/${p.id}`)}
            >
                <Image
                    style={styles.audioCover}
                    src={p.coverUri}
                />
                <View>
                    <Text style={styles.title}>{p.title}</Text>
                    <Text style={styles.author}>{p.author}</Text>
                </View>
            </Pressable>

            <Pressable
                onPress={deleteHandler}
            >
                <OptionsIcon/>
            </Pressable>
        </View>
    );
};