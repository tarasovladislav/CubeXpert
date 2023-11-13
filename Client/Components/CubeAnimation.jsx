import React, { useRef, useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native'
import { WebView } from 'react-native-webview';
import { useSettingsContext } from '../Contexts/SettingsContext';

import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import TouchableButton from './TouchableButton'
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useFavoritesContext } from '../Contexts/FavoritesContext';

import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loading from './Loading';

const CubeAnimation = ({ category, alg, isPlaying, setIsPlaying, currentAlg }) => {
    const { toggleFavorites, isInFavorites } = useFavoritesContext()
    const { settings, webViewKey } = useSettingsContext()

    const [isFavorite, setIsFavorite] = useState(isInFavorites(currentAlg._id))

    const [currentStep, setCurrentStep] = useState(0)
    const [triggerUseEffect, setTriggerUseEffect] = useState(false)
    const [allowControl, setAllowControl] = useState(true)
    let { U, F, R, L, B, D, speed, cube, ignored } = settings
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


    //TODO заблокировать копку плей пока не загружен кубик, а то ломаетеся если успеть нажаьб плей пока куб ещё не отобразился

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
        case "Beginners":

            switch (currentAlg.subset) {

                case "Cross":
                    [U, D] = [D, U];
                    [F, R] = [R, F];
                    [B, L] = [L, B];
                    // D:#fcff02 R:#ff0001 F:#01dd01 B:#1777fe L:#ffa501 U:#eeefef
                    colored = currentAlg.colored || 'U*/Ie U F R'
                    setupmoves = currentAlg.setupmoves || ''

                    break;
                case "First Layer":
                    colored = currentAlg.colored || ""
                    setupmoves = currentAlg.setupmoves || ''
                    break;
                case "Second Layer":
                    colored = currentAlg.colored || ""
                    setupmoves = currentAlg.setupmoves || ''
                    break;
                default:
                    break;
            }

            // setupmoves = alg
            break;
        default:
            break;
    }
    return (
        <View style={{ flex: 1 }}>

            <View style={styles.container}>

                <WebView
                    source={{
                        uri: `https://cube-xpert.vercel.app/animation?alg=${alg}&colored=${colored}
                        &speed=${speed}
                        &colors=U:${U} F:${F} R:${R} L:${L} B:${B} D:${D} ignored:${ignored} cube:${cube}
                        &hover=1
                        &solved=${solved}
                        &setupmoves=${setupmoves}
                        ` }}
                    ref={cubeAnimationWebView}
                    key={webViewKey}
                    scrollEnabled={false}
                    bounces={false}
                    overScrollMode={'never'}
                    style={styles.webview}
                    startInLoadingState={true} // Tells the WebView to show the loading view on the first load
                    renderLoading={() => <Loading />}
                    onLoadProgress={() => <Loading />} // TEST
                // onLoadStart={() => <Loading />}
                />
            </View >

            <View style={styles.otherContainer}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 16, width: '80%' }}>
                        {currentStep > 0 && algArray.slice(0, currentStep - 1).join(' ')}
                        <Text style={{ fontWeight: 700 }}>{currentStep > 1 ? ' ' : ''}{algArray[currentStep - 1]}{currentStep > 0 ? ' ' : ''}</Text>
                        {algArray.slice(currentStep).join(' ')}
                    </Text>
                    <Text style={{ textAlign: 'center', fontSize: 16 }}>{currentStep} / {len}</Text>
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
                <TouchableOpacity
                    style={{
                        flex: 0,
                        position: 'absolute',
                        bottom: 55,
                        right: 10,
                        zIndex: 2
                    }}

                    onPress={() => {
                        toggleFavorites(currentAlg)
                        setIsFavorite(!isFavorite)
                    }}
                >
                    <IconAntDesign size={30} color="orange" name={isFavorite ? "star" : "staro"} style={{ padding: 5 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: "100%",
        height: '100%',
        transform: [
            { translateX: -width / 2 },
            { translateY: -width / 2 },
        ],
        backgroundColor: 'transparent'
    },
    buttonContainer: {
        position: 'relative',
        flexDirection: 'row',
    }
});


export default CubeAnimation