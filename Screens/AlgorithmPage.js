import React, { useRef, useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Button, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'


import { WebView } from 'react-native-webview';

const AlgorithmPage = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [triggerUseEffect, setTriggerUseEffect] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const cubeAnimationWebView = useRef(null);

    const executeJavaScript = (jsCode) => {
        cubeAnimationWebView.current && cubeAnimationWebView.current.injectJavaScript(jsCode);
    };
    //TODO add loading spinner when loading cube
    const algStr = 'R U R F R L R R U R F R L R'
    // const algStr = 'R2 U2 R2 F R L2 U'
    const algArray = algStr.split(' ')
    const len = algArray.length

    useEffect(() => {
        if (isPlaying) {
            if (currentStep === len - 1) setIsPlaying(false)
            setCurrentStep((prevStep) => (prevStep + 1));
            setTimeout(() => {
                setTriggerUseEffect(!triggerUseEffect)
            }, algArray[currentStep].includes('2') ? 600 : 400)
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
                    source={{ uri: `https://cubium.vercel.app/?alg=${algStr}&hover=1` }}
                    ref={cubeAnimationWebView}
                    scrollEnabled={false}
                    style={styles.webview}
                />
            </View >


            <View>
                <Text style={{ textAlign: 'center' }}>
                    {currentStep > 0 && algArray.slice(0, currentStep - 1).join(' ')}
                    {/* <Text style={{ fontWeight: 700 }}>{currentStep > 1 ? ' ' : ''}{algArray.slice(0, currentStep).join(' ')}{currentStep > 0 ? ' ' : ''}</Text> */}
                    <Text style={{ fontWeight: 700 }}>{currentStep > 1 ? ' ' : ''}{algArray[currentStep - 1]}{currentStep > 0 ? ' ' : ''}</Text>
                    {algArray.slice(currentStep).join(' ')}
                </Text>
            </View>
            <Text style={{ textAlign: 'center' }}>{currentStep} / {len}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Button disabled={currentStep === 0 || isPlaying} style={styles.controlBtn} title="Previous" onPress={() => handleButtonClick("#prev-1")} />
                <Button disabled={currentStep === len || isPlaying} style={styles.controlBtn} title="Next" onPress={() => handleButtonClick("#next-1")} />
                {!isPlaying && <Button disabled={currentStep === len} style={styles.controlBtn} title="Play" onPress={() => handleButtonClick("#play-1")} />}
                {isPlaying && <Button disabled={false} style={styles.controlBtn} title="Pause" onPress={() => handleButtonClick("#pause-1")} />}
                <Button disabled={currentStep == 0 || isPlaying} style={styles.controlBtn} title="Reset" onPress={() => handleButtonClick("#reset-1")} />
            </View>
            <Button style={styles.controlBtn} title="ResetCamera" onPress={() => executeJavaScript(`$("body").trigger("resetCamera"); true`)} />

        </>










    );
};
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#eee',
        minHeight: width * 1.05,
        maxHeight: width * 1.05
    },
    webview: {
        backgroundColor: 'transparent'
    },
    controlBtn: {
        width: 30,
        height: 40,
        backgroundColor: 'black'

    }
});





export default AlgorithmPage