import {StatusBar} from "expo-status-bar";
import {Slot} from "expo-router";
import {SafeAreaView, StyleSheet, View} from "react-native";
import Constants from "expo-constants/src/Constants";

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight
    }
})

export default function App() {
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View>
                    <StatusBar style="auto" translucent={true}/>
                    <Slot/>
                </View>
            </SafeAreaView>
        </>

    );
}
