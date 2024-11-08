import {TouchableOpacity, Image, StyleSheet, View, Text, Pressable} from "react-native";
import OptionsIcon from "@/components/icons/OptionsIcon";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E2EBED',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cover: {
        width: 64,
        height: 64,
        backgroundColor: 'gray',
        borderRadius: 5
    },
    title: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16
    },
    titleBlock: {
        flexDirection: 'row',
        gap: 10
    }
})

type Props = {
    title: string,
    coverUri: string,
}

export default function PlaylistAudio(p: Props) {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.titleBlock}>
                <Image style={styles.cover} src={p.coverUri}/>
                <Text style={styles.title}>{p.title}</Text>
            </View>

            <Pressable>
                <OptionsIcon/>
            </Pressable>
        </TouchableOpacity>
    );
}