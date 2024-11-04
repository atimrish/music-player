import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AudioItem from "@/components/common/musicCollection/AudioItem";
import Wrapper from "@/components/common/Wrapper";
import AddIcon from "@/components/icons/AddIcon";
import {useState} from "react";
import AddAudioModal from "@/components/common/musicCollection/AddAudioModal";

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

export default function Collection() {
    const [modalVisible, setModalVisible] = useState(false);

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
                data={[{
                    uri: 'https://www.bygonely.com/wp-content/uploads/2023/02/Nirvana_Nevermind_Album_1.jpg',
                    title: 'In Bloom',
                    author: 'Nirvana'
                },]}
                renderItem={(i) =>
                    <Wrapper><AudioItem style={{marginVertical: 8}} {...i.item} /></Wrapper>}
            />
            <AddAudioModal
                modalVisible={modalVisible}
                closeModal={() => setModalVisible(false)}
            />
        </View>
    )
}
