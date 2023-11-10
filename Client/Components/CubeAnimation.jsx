import React, { useRef, useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import { WebView } from 'react-native-webview';
import { useSettingsContext } from '../Contexts/SettingsContext';

import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import TouchableButton from './TouchableButton'

const CubeAnimation = ({ category, alg, }) => {
    const { settings, webViewKey } = useSettingsContext()


    const [currentStep, setCurrentStep] = useState(0)
    const [triggerUseEffect, setTriggerUseEffect] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [allowControl, setAllowControl] = useState(true)
    const { U, F, R, L, B, D, speed, cube, ignored } = settings
    const cubeAnimationWebView = useRef(null);
    const algArray = alg.split(' ');
    const len = algArray.length;
    let solved = "";
    let setupmoves = "";
    let colored = "";


    //https://stackoverflow.com/questions/58858518/react-native-component-not-re-rendering-on-state-change


    useEffect(() => {
        setCurrentStep(0)
    }, [settings])

    //TODO add loading spinner when loading cube


    //When changing whichAlg, reset currentStep
    useEffect(() => {
        setCurrentStep(0)
        setIsPlaying(false)
    }, [alg])


    useEffect(() => {
        if (isPlaying) {
            setAllowControl(false)
            if (currentStep === len - 1) setIsPlaying(false)
            setCurrentStep((prevStep) => (prevStep + 1));
            setTimeout(() => {
                setTriggerUseEffect(!triggerUseEffect)
                setAllowControl(true)
            }, algArray[currentStep].includes('2') ? parseFloat(speed) * 1.5 : parseFloat(speed)) //TODO change later to user setting about cube speed
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

    // &colored=${colored}
    return (
        <View style={{ justifyContent: 'space-between', flex: 2 }}>

            <View style={styles.container}>
                {/* <View style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignContent: 'center',
                    width:width,
                    height:width
                    // alignItems: 'center'
                }}> */}

                <WebView
                    source={{
                        uri: `https://cubium-fe4h.vercel.app/animation?alg=${alg}&colored=${colored}
                        &speed=${speed}
                        &colors=U:${U} F:${F} R:${R} L:${L} B:${B} D:${D} ignored:${ignored} cube:${cube}
                        &hover=1
                        &solved=${solved}
                        
                        &setupmoves=${setupmoves}
                        ` }}
                    ref={cubeAnimationWebView}
                    key={webViewKey}
                    scrollEnabled={false}
                    style={styles.webview}
                />

                {/* </View> */}

            </View >

            <View>


                <Text style={{ textAlign: 'center' }}>
                    {currentStep > 0 && algArray.slice(0, currentStep - 1).join(' ')}
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
            </View>
        </View>
    );
};
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 2,
        // minHeight: width * 1.02,
        justifyContent: 'center',
    },
    webview: {
        marginTop: 25,
        marginBottom: 25,
        // minHeight: width * 1.02,

        flex: 1,
        backgroundColor: 'transparent'
    },
    buttonContainer: {
        flexDirection: 'row',
    }
});





export default CubeAnimation