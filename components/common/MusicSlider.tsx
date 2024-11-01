import {Image, StyleSheet, View, Text} from "react-native";
import Svg, {Rect} from "react-native-svg";
import {useAudioContext} from "@/context/AudioContext";

const styles = StyleSheet.create({
    slider: {
        padding: 20,
        shadowColor: "#000",
        marginTop: 40,
        borderWidth: 3,
        borderRadius: 35,
        borderColor: '#DBDCDC'
    },
    musicCover: {
        width: 200,
        height: 200,
        resizeMode: "cover",
        alignSelf: "center",
        borderRadius: 25,
    },
    interactiveSlider: {
        position: 'absolute',
        top: -3.5,
        left: -3.5,
        zIndex: 2
    },
    interactiveCircle: {
        position: "absolute",
        zIndex: 3,
        top: -15
    }
})

export default function MusicSlider() {
    const {status} = useAudioContext()
    let seconds = 0
    let allSeconds = 1
    const allLength = 960

    if (status) {
        seconds = Math.trunc(status.positionMillis / 1000)
        allSeconds = status.durationMillis ? Math.trunc(status.durationMillis / 1000) : 1
    }

    return (
        <View>
            <View style={styles.slider}>
                <Image
                    source={{uri: 'https://www.bygonely.com/wp-content/uploads/2023/02/Nirvana_Nevermind_Album_1.jpg'}}
                    style={styles.musicCover}
                />

                <Svg width={250} height={250} viewBox="0 0 250 250" style={styles.interactiveSlider}>
                   <Rect
                       x={2}
                       y={2}
                       width={243}
                       height={243}
                       rx={35}
                       ry={35}
                       fill="none"
                       stroke="#5182EF"
                       strokeWidth={4}
                       strokeDasharray={[0,310,allLength / allSeconds * seconds, allLength - seconds]}
                   />
                </Svg>

                {/*<Svg width={260} height={260} viewBox="0 0 260 260" style={styles.interactiveCircle}>*/}
                {/*    <Circle r={10} x={120 + offset} y={13} fill="#5182EF" stroke="#DBDCDC" strokeWidth={5}/>*/}
                {/*</Svg>*/}

            </View>
        </View>
    );
};
