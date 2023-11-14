import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ImageBackground, Dimensions, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native'
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
    useEffect(() => {
        setIsLoading(true)
        apiService.getAllAlgs()
            .then(data => setAllAlgs(data.filter(alg => alg.category !== 'Beginners')))
            .finally(() => setIsLoading(false))
    }, [])

    useEffect(() => randomAlg(allAlgs), [allAlgs])



    const randomAlg = (arr) => {
        setRandomAlgo(arr[Math.floor(Math.random() * arr.length)])
    }

    if (isLoading) {
        return <Loading />
    }

    //TODO add slider to top to render once again random alg

 return (
        <>
            {/* <View style={{ flex: 1, }}> */}
            <View style={{ flex: 1 }}>
                {randomAlgo && <MenuItem text="Random Algorithm"
                    onPress={() => {
                        navigation.navigate('Algo', {
                            _id: randomAlgo._id,
                            name: randomAlgo.title
                        })
                        setTimeout(() => randomAlg(allAlgs), 500)
                    }}
                >
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            PlaceholderContent={<ActivityIndicator size="large" />}
                            style={styles.cubeImage}
                            source={imageMapping[`${randomAlgo.picturePath.toLowerCase()}`]}
                            resizeMode="contain"
                            transition={true}
                        />
                        <Text style={styles.firstAlgo}>{randomAlgo.algo[0]}</Text>
                        {/* TODO make container to become larger when content does not fit!!! */}
                    </View>
                </MenuItem>
                }
            </View>
            <View style={{ flex: 1 }}>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonRow}>
                        <MenuItem text="Beginners Method" onPress={() => {
                            navigation.navigate('Beginners Lessons')
                        }} />

                        <MenuItem text="Advanced Algorithms" onPress={() => {
                            navigation.navigate('Choose Category')
                        }} />
                    </View>

                    <View style={styles.buttonRow}>
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
            {/* </View> */}
        </>
    )
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    cubeImage: {
        width: width / 2,
        height: width / 2,
        margin: 5
    },
    listElement: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2.22,
        elevation: 3,
        borderRadius: 8,
        shadowOpacity: 0.23,
    },
    buttonRow: {
        flexDirection: "row",
        height: '50%'
    },
    buttonContainer: {
        flex: 1,

    },
    firstAlgo: {
        fontSize: 20,
        textAlign: 'center',
        maxWidth: '80%',
        marginBottom: 5


    }
})

export default Home

