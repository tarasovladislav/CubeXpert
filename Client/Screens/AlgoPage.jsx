import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text } from 'react-native'
// import { Image } from 'react-native-elements';
import { Button, Overlay } from 'react-native-elements';

import apiService from '../apiService'
import ProfileSettings from '../Components/ProfileSettings'
import CubeAnimation from '../Components/CubeAnimation'
import TouchableButton from '../Components/TouchableButton'
import Loading from '../Components/Loading';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';

const AlgoPage = ({ route, navigation }) => {

    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };
    /////////////

    //after changing colors cube goes to initial but currentalg state no
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
            {currentAlg && <SafeAreaView style={{flex:1}}>

            
                <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'absolute', left: 0, top: 12, width: 70, zIndex:2 }}>
                    <Text style={{ fontSize: 20, fontWeight: 800 }}>{whichAlg + 1} / {currentAlg.algo.length}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'absolute', right: 0, width: 70, zIndex: 2 }}>
                    <TouchableButton
                        activeColor="transparent"
                        text={<IconAwesome size={24} color="black" name="cog" />}
                        onPress={toggleOverlay} />
                </View>


                {/* TODO make the button disabled when play is active */}
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay} animationType="fade">
                    <ProfileSettings />
                </Overlay>

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