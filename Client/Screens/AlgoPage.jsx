import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
// import { Image } from 'react-native-elements';
import { Button, Overlay, } from 'react-native-elements';

import apiService from '../apiService'
import ProfileSettings from '../Components/ProfileSettings'
import CubeAnimation from '../Components/CubeAnimation'
import TouchableButton from '../Components/TouchableButton'
import Loading from '../Components/Loading';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';

const AlgoPage = ({ route }) => {
    const { _id } = route.params

    const [isPlaying, setIsPlaying] = useState(false)

    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => setVisible(!visible);

    const [currentAlg, setCurrentAlg] = useState()
    const [whichAlg, setWhichAlg] = useState(0)

    // Get algo details 
    useEffect(() => {
        setIsLoading(true)
        apiService.getAlgo(_id).then(data => setCurrentAlg(data)).then(data => {
        }).finally(() => setIsLoading(false))
    }, [])

    const [isLoading, setIsLoading] = useState(true)
    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            {currentAlg && <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'absolute', left: 0, top: 12, width: 70, zIndex: 2 }}>
                    <Text style={{ fontSize: 20, fontWeight: 800 }}>{whichAlg + 1} / {currentAlg.algo.length}</Text>
                </View>

                <Overlay isVisible={visible} onBackdropPress={toggleOverlay} animationType="fade">
                    <ProfileSettings />
                </Overlay>

                <CubeAnimation isPlaying={isPlaying} setIsPlaying={setIsPlaying} category={currentAlg.category} alg={currentAlg.algo[whichAlg]} currentAlg={currentAlg} />


                <TouchableOpacity
                    onPress={toggleOverlay}
                    disabled={isPlaying}
                    style={{
                        flex: 0,
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 2
                    }}
                >
                    <IconAwesome size={30} color="black" name="cog" style={{ padding: 5 }} />
                </TouchableOpacity>

                {currentAlg.algo.length > 1 && <View style={{ flexDirection: 'row', position: 'relative' }}>
                    <TouchableButton
                        disabled={whichAlg === 0}
                        onPress={() => setWhichAlg(whichAlg - 1)}
                        text='Previous' />
                    <TouchableButton
                        disabled={whichAlg === currentAlg.algo.length - 1}
                        onPress={() => setWhichAlg(whichAlg + 1)}
                        text='Next'
                    />
                </View>}
            </SafeAreaView>}
        </>
    )
}

const styles = StyleSheet.create({

})

export default AlgoPage