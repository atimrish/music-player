import {Image, StyleSheet, View, Text, StyleProp, ViewStyle} from "react-native";
import OptionsIcon from "@/components/icons/OptionsIcon";

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
        width: 82,
        height: 82,
        borderRadius: 5,
    },
    firstFlex: {
        flexDirection: 'row',
        gap: 10
    },
    title: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        color: '#575353'
    },
    author: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        color: '#7D7D7D'
    }
})

type AudioItemProps = {
    title: string
    author: string
    uri: string,
    style?: StyleProp<ViewStyle>
}

export default function AudioItem(p: AudioItemProps) {
    return (
        <View style={[styles.container, p.style]}>
            <View style={styles.firstFlex}>
                <Image
                    style={styles.audioCover}
                    src={p.uri}
                />
                <View>
                    <Text style={styles.title}>{p.title}</Text>
                    <Text style={styles.author}>{p.author}</Text>
                </View>
            </View>
            <OptionsIcon/>
        </View>
    );
};