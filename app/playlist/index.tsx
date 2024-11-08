import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Wrapper from "@/components/common/Wrapper";
import AddIcon from "@/components/icons/AddIcon";
import AddPlaylistModal from "@/components/common/playlist/AddPlaylistModal";
import {useEffect, useState} from "react";
import PlaylistAudio from "@/components/common/playlist/PlaylistAudio";
import {useGlobalContext} from "@/context/GlobalContext";

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
})

export default function Index() {
    const [modalVisible, setModalVisible] = useState(false);
    const {playlists, fetchPlaylists} = useGlobalContext()

    useEffect(() => {
        fetchPlaylists()
    }, []);

    return (
        <Wrapper>
            <View style={styles.headingBlock}>
                <Text style={styles.heading}>Плейлисты</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <AddIcon/>
                </TouchableOpacity>
            </View>

            <FlatList
                data={playlists}
                renderItem={i => <PlaylistAudio title={i.item.title} coverUri={i.item.cover}/>}
            />

            <AddPlaylistModal visible={modalVisible} closeModal={() => setModalVisible(false)} />
        </Wrapper>
    );
};