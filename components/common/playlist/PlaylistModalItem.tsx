import {View, Image, StyleSheet, Text} from "react-native";
import {Checkbox} from "expo-checkbox";
import React, {SetStateAction} from "react";

const styles = StyleSheet.create({
    cover: {
        width: 48,
        height: 48,
        backgroundColor: 'gray',
        borderRadius: 5
    },
    container: {
        flexDirection: 'row',
        marginVertical: 4,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#575353',
        fontSize: 14,
    },
    author: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#7D7D7D',
        fontSize: 12
    },
    contentBlock: {
        flexDirection: 'row',
        gap: 10
    }
})

export type PlaylistModalItemProps = {
    id: number,
    coverUri: string,
    title: string,
    author: string,
    checked: boolean,
    setChecked: React.Dispatch<SetStateAction<Array<PlaylistModalItemProps>>>
}

export default function PlaylistModalItem(p: PlaylistModalItemProps) {
    return (
        <View style={styles.container}>
            <View style={styles.contentBlock}>
                <Image style={styles.cover} src={p.coverUri}/>

                <View>
                    <Text style={styles.title}>{p.title}</Text>
                    <Text style={styles.author}>{p.author}</Text>
                </View>
            </View>

            <Checkbox
                value={p.checked}
                onValueChange={(value) => {
                    p.setChecked(prev => prev.map(i => {
                        if (i.id === p.id) i.checked = value
                        return i
                    }))
                }}
            />
        </View>
    );
};