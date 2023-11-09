import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text } from 'react-native'
// import { Image } from 'react-native-elements';
import { Button, Overlay } from 'react-native-elements';

import apiService from '../apiService'
import ProfileSettings from '../Components/ProfileSettings'
import CubeAnimation from '../Components/CubeAnimation'
import TouchableButton from '../Components/TouchableButton'
import Loading from '../Components/Loading';

const AlgoPage = ({ route, navigation }) => {
    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };
    /////////////


    const { _id } = route.params
    const [currentAlg, setCurrentAlg] = useState()
    const [whichAlg, setWhichAlg] = useState(0)
    useEffect(() => {
        setIsLoading(true)
        apiService.getAlgo(_id).then(data => setCurrentAlg(data)).finally(() => setIsLoading(false))
    }, [])

    const [isLoading, setIsLoading] = useState(true)

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            {currentAlg && <SafeAreaView>
                {/* <Button title="Open Overlay" onPress={toggleOverlay} /> */}

                <Text>{whichAlg + 1} / {currentAlg.algo.length}</Text>
                {/* 
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <ProfileSettings />
                </Overlay> */}

                <CubeAnimation category={currentAlg.category} alg={currentAlg.algo[whichAlg]} />

                {currentAlg.algo.length > 1 && <View style={{ flexDirection: 'row' }}>
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

                <View style={{ flexDirection: 'row' }}>
                    <TouchableButton
                        text='Add to Favorites'
                    // disabled={whichAlg === currentAlg.algo.length - 1}
                    // onPress={() => setWhichAlg(whichAlg + 1)}
                    />
                </View>
            </SafeAreaView>}
        </>
    )
}

const styles = StyleSheet.create({

})

export default AlgoPage