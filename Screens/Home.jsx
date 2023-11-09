import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ImageBackground, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements'
import Loading from '../Components/Loading'
import apiService from '../apiService'
import MenuItem from '../Components/MenuItem'

const Home = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [allAlgs, setAllAlgs] = useState([])
    const [randomAlgo, setRandomAlgo] = useState()
    useEffect(() => loadAlgs(), [])
    useEffect(() => randomAlg(allAlgs), [allAlgs])
    useEffect(() => navigation.addListener('focus', () => loadAlgs()), [navigation]);

    const loadAlgs = () => {
        setIsLoading(true)
        apiService.getAllAlgs()
            .then(data => setAllAlgs(data))
            .finally(() => setIsLoading(false))
    }

    const randomAlg = (arr) => {
        setRandomAlgo(arr[Math.floor(Math.random() * arr.length)])
    }




    if (isLoading) {
        return <Loading />
    }

    //TODO add slider to top to render once again random alg
    return (
        <>
            {randomAlgo && <TouchableOpacity
                style={styles.listElement}
                onPress={() => navigation.navigate('Algo', {
                    _id: randomAlgo._id 
                })}
            >
                <Image
                    PlaceholderContent={<ActivityIndicator size="large" />}
                    style={styles.cubeImage}
                    source={{ uri: `https://cubium-fe4h.vercel.app/img/${randomAlgo.picturePath.toLowerCase()}.png` }}
                    resizeMode="contain"
                    transition={true}
                />
                <Text>{randomAlgo.title}</Text>
            </TouchableOpacity>}
            <View style={{ flexDirection: "row", height: 100 }}>


                    <MenuItem text="Advanced Algorithms" />


                <MenuItem text="Advanced Algorithms" />

            </View>
            <MenuItem text="Advanced Algorithms" />

        </>
    )
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    cubeImage: {
        width: width / 1.4,
        height: width / 1.4,
        margin: 10
    },
    listElement: {
        alignItems: 'center',
    },


})

export default Home

