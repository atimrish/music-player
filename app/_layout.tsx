import {StatusBar} from "expo-status-bar";
import {Slot, SplashScreen} from "expo-router";
import {SafeAreaView, StyleSheet, View} from "react-native";
import Constants from "expo-constants/src/Constants";
import {useFonts} from "expo-font";
import {useEffect} from "react";

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#E9ECEE',
    }
})

SplashScreen.preventAutoHideAsync()

export default function App() {
    const [loaded, error] = useFonts({
        'Montserrat-Medium': require('@/assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-SemiBold': require('@/assets/fonts/Montserrat-SemiBold.ttf'),
    })

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync()
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

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
