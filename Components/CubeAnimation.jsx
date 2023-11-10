import React, { useRef, useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import { WebView } from 'react-native-webview';

import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import TouchableButton from './TouchableButton'

const CubeAnimation = ({ category, alg, settings }) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [triggerUseEffect, setTriggerUseEffect] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [allowControl, setAllowControl] = useState(true)
    const { U, F, R, L, B, D, speed, cube, ignored } = settings
    const cubeAnimationWebView = useRef(null);
    const algStr = alg;
    const algArray = algStr.split(' ');
    const len = algArray.length;
    let solved = "";
    let setupmoves = "";
    let colored = "";



    const executeJavaScript = (jsCode) => {
        cubeAnimationWebView.current && cubeAnimationWebView.current.injectJavaScript(jsCode);
    };

    switch (category) {
        case "F2L":
            solved = "U-*"
            break;
        case "OLL":
            colored = "u"
            break;
        case "Patterns":
            setupmoves = alg
            break;
        default:
            break;
    }


    //TODO add loading spinner when loading cube


    //for coloring ?colored=u&colors=ignored:red cube:yellow solve:#ddd

    //When changing whichAlg, reset currentStep
    useEffect(() => {
        setCurrentStep(0)
        setIsPlaying(false)
    }, [alg])

    //For Play/Stop animation
    useEffect(() => {
        if (isPlaying) {
            setAllowControl(false)
            if (currentStep === len - 1) setIsPlaying(false)
            setCurrentStep((prevStep) => (prevStep + 1));
            setTimeout(() => {
                setTriggerUseEffect(!triggerUseEffect)
                setAllowControl(true)
            }, algArray[currentStep].includes('2') ? speed * 1.5 : speed) //TODO change later to user setting about cube speed
        }
    }, [isPlaying, triggerUseEffect])


    const handleButtonClick = (elementSelector) => {
        executeJavaScript(`$("${elementSelector}").click();true`);
        switch (elementSelector) {
            case '#play-1':
                setIsPlaying(true);
                break;
            case '#pause-1':
                setIsPlaying(false);
                break;
            case '#reset-1':
                setCurrentStep(0);
                break;
            case '#prev-1':
                setCurrentStep((prevStep) => (prevStep - 1));
                break;
            case '#next-1':
                setCurrentStep((prevStep) => (prevStep + 1));
                break;
            default:
                break;
        }
    };

    return (
        <>
            <View style={styles.container}>
                <WebView
                    source={{
                        uri: `https://cubium-fe4h.vercel.app/animation?alg=${algStr}
                    &hover=1
                    &solved=${solved}
                    &setupmoves=${setupmoves}
                    &colored=${colored}
                    &speed=${speed}
                    &colors=U:${U} F:${F} R:${R} L:${L} B:${B} D:${D} ignored:${ignored} cube:${cube}
                    ` }}
                    ref={cubeAnimationWebView}
                    scrollEnabled={false}
                    style={styles.webview}
                />
            </View >
            <Text style={{ textAlign: 'center' }}>
                {currentStep > 0 && algArray.slice(0, currentStep - 1).join(' ')}
                {/* <Text style={{ fontWeight: 700 }}>{currentStep > 1 ? ' ' : ''}{algArray.slice(0, currentStep).join(' ')}{currentStep > 0 ? ' ' : ''}</Text> */}
                <Text style={{ fontWeight: 700 }}>{currentStep > 1 ? ' ' : ''}{algArray[currentStep - 1]}{currentStep > 0 ? ' ' : ''}</Text>
                {algArray.slice(currentStep).join(' ')}
            </Text>
            <Text style={{ textAlign: 'center' }}>{currentStep} / {len}</Text>

            <View style={styles.buttonContainer}>
                <TouchableButton
                    disabled={currentStep === 0 || isPlaying || !allowControl}
                    onPress={() => handleButtonClick("#prev-1")}
                    text={<IconAwesome size={24} color="black" name="arrow-left" />} />
                <TouchableButton
                    disabled={currentStep === len || isPlaying || !allowControl}
                    onPress={() => handleButtonClick("#next-1")}
                    text={<IconAwesome size={24} color="black" name="arrow-right" />} />
                {!isPlaying && <TouchableButton
                    disabled={currentStep === len}
                    onPress={() => handleButtonClick("#play-1")}
                    text={<IconAwesome size={24} color="black" name="play" />} />}
                {isPlaying && <TouchableButton
                    onPress={() => handleButtonClick("#pause-1")}
                    text={<IconAwesome size={24} color="black" name="pause" />} />}
                <TouchableButton
                    disabled={currentStep == 0 || isPlaying || !allowControl}
                    onPress={() => handleButtonClick("#reset-1")}
                    text={<IconAwesome size={24} color="black" name="redo" />} />
                <TouchableButton
                    onPress={() => executeJavaScript(`$("body").trigger("resetCamera"); true`)}
                    text={<IconAwesome size={24} color="black" name="arrows-alt" />} />
            </View>
        </>
    );
};
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: width * 1.00,
        maxHeight: width * 1.00
    },
    webview: {
        backgroundColor: 'transparent'
    },
    buttonContainer: {
        flexDirection: 'row',
    }
});





export default CubeAnimation