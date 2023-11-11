import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text } from 'react-native'
// import { Image } from 'react-native-elements';
import { Button, Overlay, } from 'react-native-elements';

import apiService from '../apiService'
import ProfileSettings from '../Components/ProfileSettings'
import CubeAnimation from '../Components/CubeAnimation'
import TouchableButton from '../Components/TouchableButton'
import Loading from '../Components/Loading';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import { useFavoritesContext } from '../Contexts/FavoritesContext';
import IconAntDesign from 'react-native-vector-icons/AntDesign';



const AlgoPage = ({ route }) => {
    const { toggleFavorites, favoritesList, isInFavorites } = useFavoritesContext()


    const [isPlaying, setIsPlaying] = useState(false)
    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => setVisible(!visible);


    //after changing colors cube goes to initial but currentalg state no
    const { _id } = route.params
    const [currentAlg, setCurrentAlg] = useState()
    const [whichAlg, setWhichAlg] = useState(0)
    const [isFavorite, setIsFavorite] = useState(isInFavorites(_id))
    useEffect(() => {
        setIsLoading(true)

        apiService.getAlgo(_id).then(data => setCurrentAlg(data)).then(data => {

            setIsFavorite(isInFavorites(_id))
        }).finally(() => {
            setIsLoading(false)
        }


        )
    }, [])







    // useEffect(() => {
    //     console.log(currentAlg)
    //     // setIsFavorite(favoritesList.findIndex((alg) => alg._id === currentAlg._id) === -1 ? false : true)

    // }, [favoritesList])


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

                <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'absolute', right: 0, width: 70, zIndex: 2 }}>
                    <TouchableButton
                        activeColor="transparent"
                        disabledColor="transparent"
                        text={<IconAwesome size={30} color="black" name="cog" />}
                        onPress={toggleOverlay}
                        disabled={isPlaying}

                    />
                </View>

                <View style={{ flex: 0, width: 70, height: 70, position: 'absolute', top: 50, right: 0, zIndex: 2 }}>
                    <TouchableButton
                        activeColor="transparent"
                        disabledColor="transparent"
                        text={<IconAntDesign size={30} color="orange" name={isFavorite ? "star" : "staro"} />}
                        // disabled={whichAlg === currentAlg.algo.length - 1}
                        onPress={() => {
                            toggleFavorites(currentAlg)
                            setIsFavorite(!isFavorite)
                        }}
                    />
                </View>

                <Overlay isVisible={visible} onBackdropPress={toggleOverlay} animationType="fade">
                    <ProfileSettings />
                </Overlay>
                <CubeAnimation isPlaying={isPlaying} setIsPlaying={setIsPlaying} category={currentAlg.category} alg={currentAlg.algo[whichAlg]} />

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

                {/* переикнуть кнопку избранных куда нибудть выше */}

                {/* 
                <View style={{ flexDirection: 'row' }}>
                    <TouchableButton
                    // text={<IconAntDesign size={24} color="orange" name="staro" />}
                    // disabled={whichAlg === currentAlg.algo.length - 1}
                    // onPress={() => setWhichAlg(whichAlg + 1)}
                    />
                    <TouchableButton
                        text={<IconAntDesign size={24} color="orange" name="staro" />}
                        // disabled={whichAlg === currentAlg.algo.length - 1}
                        onPress={() => {
                            // toggleFavorites(currentAlg)
                            // setIsFavorite(isInFavorites(currentAlg))

                        }}
                    />

                </View> */}







            </SafeAreaView>}
        </>
    )
}

const styles = StyleSheet.create({

})

export default AlgoPage