import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ImageBackground, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements'
import Loading from '../Components/Loading'
import apiService from '../apiService'
import MenuItem from '../Components/MenuItem'
import { imageMapping } from '../assets/img';
import SubsetElement from '../Components/SubsetElement'

const Home = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [allAlgs, setAllAlgs] = useState([])
    const [randomAlgo, setRandomAlgo] = useState()
    useEffect(() => loadAlgs(), [])
    useEffect(() => randomAlg(allAlgs), [allAlgs])
    // useEffect(() => navigation.addListener('focus', () => loadAlgs()), [navigation]);

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
            {/* <SubsetElement algo={randomAlgo} /> */}
            <View style={{ flex: 1, }}>
                {randomAlgo && <TouchableOpacity
                    style={styles.listElement}
                    onPress={() => {
                        navigation.navigate('Algo', {
                            _id: randomAlgo._id,
                            name: randomAlgo.title
                        })
                        setTimeout(() => randomAlg(allAlgs), 500)
                    }
                    }
                >
                    <Image
                        PlaceholderContent={<ActivityIndicator size="large" />}
                        style={styles.cubeImage}
                        source={imageMapping[`${randomAlgo.picturePath.toLowerCase()}`]}
                        resizeMode="contain"
                        transition={true}
                    />
                    <Text>{randomAlgo.title}</Text>
                </TouchableOpacity>}

                <View style={{ flex: 1 }}>

                    <View style={{ flexDirection: "row", height: '50%' }}>
                        <MenuItem text="How to solve the cube" />
                        <MenuItem text="Advanced Algorithms" onPress={() => {
                            navigation.navigate('Choose Category')
                        }} />
                    </View>
                    <View style={{ flexDirection: "row", height: '50%', }}>
                        <MenuItem text="Patterns" onPress={() => {
                            navigation.navigate('Category', {
                                name: 'Patterns',
                                category: 'Patterns'
                            })
                        }} />
                        <MenuItem text="Favorites" onPress={() => {
                            navigation.navigate('Favorites', {
                                name: 'Favorites',
                                category: 'Patterns'
                            })
                        }} />
                    </View>
                </View>
            </View>
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
        // backgroundColor: 'red'
    },


})

export default Home

