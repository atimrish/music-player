import {Dimensions, GestureResponderEvent, StyleSheet, Text, View} from "react-native";
import Svg, {Circle} from "react-native-svg";
import {useAudioService} from "@/services/audioService/context/AudioServiceContext";
import {OptimizeService} from "@/services/optimizeService/OptimizeService";
import {useCallback, useRef, useState} from "react";
import {StringService} from "@/services/stringService/StringService";

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    slider: {
        width: '100%',
        height: 4,
        backgroundColor: '#7D7D7D',
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
        color: '#7D7D7D',
        fontFamily: 'Montserrat-Medium',
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

const sliderWidth = Dimensions.get('window').width - 44

export default function MusicSlider() {
    const {
        status,
        setPositionAudio,
        pauseAudio,
        playAudio
    } = useAudioService()

    const isPlayingRef = useRef(false)

    const [percent, setPercent] = useState<number>(0)
    const [isTouching, setIsTouching] = useState<boolean>(false)

    const onTouchStartHandler = async () => {
        isPlayingRef.current = status?.isPlaying || false
        setIsTouching(true)
    }

    const onTouchMoveHandler = useCallback(OptimizeService.throttle(async (e: GestureResponderEvent) => {
        setPercent((e.nativeEvent.pageX - 22) / sliderWidth)
    }, 50), [])

    const onTouchEndHandler = async () => {
        if (pauseAudio && playAudio && status && status.durationMillis && setPositionAudio) {
            await setPositionAudio(status.durationMillis * percent)
        }
        isPlayingRef.current ? playAudio?.() : pauseAudio?.()
        setIsTouching(false)
    }

    let positionOffset = (() => {
        if (isTouching) {
            return percent
        } else if (status && status.durationMillis) {
            return status.positionMillis / status.durationMillis
        }
        return 0
    })()


    return (
        <View style={styles.container}>
            <View style={styles.slider}>
                <View style={{...styles.sliderLine, width: sliderWidth * positionOffset}}/>
                <Svg
                    width={20}
                    height={20}
                    viewBox={"0 0 20 20"}
                    fill="none"
                    style={{...styles.sliderInteractive, left: sliderWidth * positionOffset - 10}}
                    onTouchStart={onTouchStartHandler}
                    onTouchMove={onTouchMoveHandler}
                    onTouchEnd={onTouchEndHandler}
                >
                    <Circle r={8} fill="#fff" cx={10} cy={10} stroke="#5182EF" strokeWidth={4}/>
                </Svg>
            </View>
            <View style={styles.timerBlock}>
                <Text style={styles.timerText}>{StringService.formatTime(status?.positionMillis || 0)}</Text>
                <Text style={styles.timerText}>{StringService.formatTime(status?.durationMillis || 0)}</Text>
            </View>
        </View>
    );
};