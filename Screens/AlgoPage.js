import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CubeAnimation from '../Components/CubeAnimation'
import apiService from '../apiService'
import TouchableButton from '../Components/TouchableButton'

const AlgoPage = () => {
    const [currentAlg, setCurrentAlg] = useState()
    const [whichAlg, setWhichAlg] = useState(0)
    useEffect(() => {
        apiService.getAlgo("F2L1").then(data => setCurrentAlg(data))
    }, [])

    return (
        <>
            {currentAlg && <SafeAreaView>


                <CubeAnimation category={currentAlg.category} alg={currentAlg.algo[whichAlg]} />

                <View style={{ flexDirection: 'row' }}>
                    <TouchableButton
                        disabled={whichAlg === 0}
                        onPress={() => setWhichAlg(whichAlg - 1)}
                        text='Previous' />
                    <TouchableButton
                        disabled={whichAlg === currentAlg.algo.length - 1}
                        onPress={() => setWhichAlg(whichAlg + 1)}
                        text='Next'
                    />
                </View>
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