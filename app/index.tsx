import {FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AudioItem from "@/components/common/musicCollection/AudioItem";
import Wrapper from "@/components/common/Wrapper";
import AddIcon from "@/components/icons/AddIcon";
import {useEffect, useState} from "react";
import AddAudioModal from "@/components/common/musicCollection/AddAudioModal";
import {useGlobalContext} from "@/context/GlobalContext";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import {router} from 'expo-router'

const styles = StyleSheet.create({
    heading: {
        color: '#575353',
        fontSize: 20,
        fontFamily: 'Montserrat-SemiBold',
    },
    headingBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 22
    },
    playlistText: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#575353',
    },
    playlistBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#E2EBED',
        borderRadius: 10,
        alignItems: 'center',
    }
})

export default function Index() {
    const [modalVisible, setModalVisible] = useState(false);
    const {audios, fetchAudios} = useGlobalContext()

    useEffect(() => {
        fetchAudios()
    }, []);

    return (
        <View>
            <Wrapper>
                <View style={styles.headingBlock}>
                    <Text style={styles.heading}>Коллекция</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <AddIcon/>
                    </TouchableOpacity>
                </View>
                <Pressable style={styles.playlistBlock} onPress={() => router.navigate('/playlist')}>
                    <Text style={styles.playlistText}>Плейлисты</Text>
                    <ArrowRightIcon/>
                </Pressable>
            </Wrapper>
            <FlatList
                data={audios}
                renderItem={(i) =>
                    <Wrapper>
                        <AudioItem
                            style={{marginVertical: 8}}
                            id={i.item.id}
                            coverUri={i.item.cover}
                            audioUri={i.item.uri}
                            title={i.item.title}
                            author={i.item.author}
                        />
                    </Wrapper>
                }
            />
            <AddAudioModal
                modalVisible={modalVisible}
                closeModal={() => setModalVisible(false)}
            />
        </View>
    )
}
