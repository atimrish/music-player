import {Dimensions, StyleSheet, Text, View} from "react-native";
import Svg, {Circle} from "react-native-svg";
import {useAudioService} from "@/services/audioService/context/AudioServiceContext";

const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    slider: {
        width: '100%',
        height: 4,
        backgroundColor: '#fff',
        marginTop: 40,
        marginBottom: 20,
        borderRadius: 4,
        position: 'relative',
        overflow: 'visible'
    },
    sliderInteractive: {
        position: 'absolute',
        top: -8,
        left: -4,
    },
    timerBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    timerText: {
        color: '#DBDCDC',
    },
    sliderLine: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 4,
        backgroundColor: '#5182EF',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4
    }
})

const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60 / 1000)
    const seconds = Math.floor(time / 1000) % 60;
    const minutesStr = minutes.toString().padStart(2, '0')
    const secondsStr = seconds.toString().padStart(2, '0')
    return `${minutesStr}:${secondsStr}`;
}

export default function MusicSlider() {
    const {status} = useAudioService()
    let pixelOffset = 0

    if (status && status.durationMillis) {
        const sliderWidth = Dimensions.get('window').width - 44
        pixelOffset = status.positionMillis / status.durationMillis * sliderWidth
    }

    return (
        <View style={styles.container}>
            <View style={styles.slider}>
                <View style={{...styles.sliderLine, width: pixelOffset}} />

                <Svg
                    width={20}
                    height={20}
                    viewBox={"0 0 20 20"}
                    fill="none"
                    style={{...styles.sliderInteractive, left: pixelOffset - 10}}
                >
                    <Circle r={8} fill="#fff" cx={10} cy={10} stroke="#5182EF" strokeWidth={4} />
                </Svg>
            </View>
            <View style={styles.timerBlock}>
                <Text style={styles.timerText}>{formatTime(status?.positionMillis || 0)}</Text>
                <Text style={styles.timerText}>{formatTime(status?.durationMillis || 0)}</Text>
            </View>
        </View>
    );
};