import React, { useRef, useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import { WebView } from 'react-native-webview';
import { useSettingsContext } from '../Contexts/SettingsContext';

import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import TouchableButton from './TouchableButton'

import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useFavoritesContext } from '../Contexts/FavoritesContext';


const CubeAnimation = ({ category, alg, isPlaying, setIsPlaying }) => {
    const { settings, webViewKey } = useSettingsContext()
    const { toggleFavorites, isInFavorites, favoritesList } = useFavoritesContext()


    const [currentStep, setCurrentStep] = useState(0)
    const [triggerUseEffect, setTriggerUseEffect] = useState(false)
    // const [isPlaying, setIsPlaying] = useState(false)
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
        <View style={{ flex: 1 }}>

            <View style={styles.container}>


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

            <View style={styles.otherContainer}>
                <View>
                    <Text style={{ textAlign: 'center' }}>
                        {currentStep > 0 && algArray.slice(0, currentStep - 1).join(' ')}
                        <Text style={{ fontWeight: 700 }}>{currentStep > 1 ? ' ' : ''}{algArray[currentStep - 1]}{currentStep > 0 ? ' ' : ''}</Text>
                        {algArray.slice(currentStep).join(' ')}
                    </Text>
                    <Text style={{ textAlign: 'center' }}>{currentStep} / {len}</Text>
                </View>

                
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
                        text={<IconMaterialIcons size={24} color="black" type="material" name="3d-rotation" />} />
                </View>
            </View>
        </View>
    );
};
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        // marginTop: 20,
        // marginBottom: 20,
        flex: 2,
        // height: '100%',
        // minHeight: width * 1.02,
        // justifyContent: 'center',
        // backgroundColor: 'red',
        // flexDirection: 'row',
        // gap:30,
        // alignContent: 'center',
        // alignSelf: 'center',
        marginTop: 10,
        justifyContent: 'center',
        // alignItems: 'center'
    },
    webview: {
        // minHeight: width * 1.02,
        // maxHeight: width * 1.02,
        // minWidth: width,
        // maxWidth: width,
        flex: 1,
        // width: width,
        // height: width,
        // aspectRatio: 2,

        // marginVertical: 50,
        padding: 20,
        // flex: 1,
        // alignSelf: 'center',
        // margin: 30,
        // padding: 30,
        // backgroundColor: '#eee'
        backgroundColor: 'transparent'
    },
    otherContainer: {

    },
    buttonContainer: {
        flexDirection: 'row',
    }
});





export default CubeAnimation