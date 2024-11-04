import {StatusBar} from "expo-status-bar";
import {router, Slot, SplashScreen} from "expo-router";
import {Dimensions, StyleSheet, View} from "react-native";
import Constants from "expo-constants/src/Constants";
import {useFonts} from "expo-font";
import {useEffect} from "react";

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 28,
        backgroundColor: '#E9ECEE',
        minHeight: Dimensions.get('window').height,
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
        router.navigate('/collection')
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <>
            <View style={styles.container}>
                <View>
                    <StatusBar style="auto" translucent={true}/>
                    <Slot/>
                </View>
            </View>
        </>

    );
}
