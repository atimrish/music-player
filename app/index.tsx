import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AudioItem from "@/components/common/musicCollection/AudioItem";
import Wrapper from "@/components/common/Wrapper";
import AddIcon from "@/components/icons/AddIcon";
import {useEffect, useState} from "react";
import AddAudioModal from "@/components/common/musicCollection/AddAudioModal";
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
            </Wrapper>
            <FlatList
                data={audios}
                renderItem={(i) =>
                    <Wrapper>
                        <AudioItem
                            style={{marginVertical: 8}}
                            uri={i.item.cover}
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
