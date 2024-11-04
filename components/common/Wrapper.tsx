import {ReactNode} from "react";
import {StyleSheet, View} from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 22
    }
})

export default function Wrapper({ children }: { children: ReactNode }) {
    return <View style={styles.container}>{children}</View>
}