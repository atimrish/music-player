import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CECECE',
        borderColor: '#7D7D7D',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 6,
        paddingHorizontal: 20
    },
    text: {
        color: '#7D7D7D',
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        textAlign: 'center'
    }
})

type Props = TouchableOpacityProps & {
    title: string
}

export default function Button(p: Props) {
    const {style, ...props} = p

    return (
        <TouchableOpacity style={[styles.container, style]} {...props}>
            <Text style={styles.text}>{p.title}</Text>
        </TouchableOpacity>
    );
};
