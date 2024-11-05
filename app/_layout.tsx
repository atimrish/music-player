import {StatusBar} from "expo-status-bar";
import {Slot, SplashScreen} from "expo-router";
import {Dimensions, StyleSheet, View} from "react-native";
import Constants from "expo-constants/src/Constants";
import {useFonts} from "expo-font";
import {useEffect} from "react";
import {DBService} from "@/services/databaseService/DBService";
import GlobalContextProvider from "@/context/GlobalContext";
import {StorageService} from "@/services/storageService/StorageService";

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 28,
        backgroundColor: '#E9ECEE',
        minHeight: Dimensions.get('screen').height,
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

    useEffect(() => {
        DBService.migrateIfNeeded()
        StorageService.initIfNeeded()
    }, []);

    if (!loaded && !error) {
        return null;
    }

    return (
        <>
            <View style={styles.container}>
                <GlobalContextProvider>
                    <StatusBar style="auto" translucent={true}/>
                    <Slot/>
                </GlobalContextProvider>
            </View>
        </>

    );
}
