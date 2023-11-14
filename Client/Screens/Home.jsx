import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native'
import { Image } from 'react-native-elements'
import Loading from '../Components/Loading'
import apiService from '../apiService'
import MenuItem from '../Components/MenuItem'
import { imageMapping } from '../assets/img';

const Home = ({ navigation }) => {
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

    return (
        <>
            <SafeAreaView style={{ flex: 1, }}>
                <View style={{ flex: 1, }}>
                    {randomAlgo && <MenuItem
                        onPress={() => {
                            navigation.navigate('Algo', {
                                _id: randomAlgo._id,
                                name: randomAlgo.title
                            })
                            setTimeout(() => randomAlg(allAlgs), 500)
                        }}
                    >
                        <Text style={styles.title}>Random Algorithm</Text>
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <Image
                                PlaceholderContent={<ActivityIndicator size="large" />}
                                style={styles.cubeImage}
                                source={imageMapping[`${randomAlgo.picturePath.toLowerCase()}`]}
                                resizeMode="contain"
                                transition={true}
                            />
                        </View>
                        <Text style={styles.firstAlgo}>{randomAlgo.algo[0]}</Text>
                    </MenuItem>
                    }
                </View>
                <View style={{ flex: 0 }}>
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
            </SafeAreaView>
        </>
    )
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    cubeImage: {
        flex: 1,
        aspectRatio: 1,
        maxWidth: width,
        maxHeight: width,
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
        justifyContent: 'space-between'

    },
    buttonRow: {
        flexDirection: "row",
        height: width / 3.5
    },
    buttonContainer: {
        flex: 0,
    },
    firstAlgo: {
        fontSize: 20,
        textAlign: 'center',
        maxWidth: '85%',
        marginBottom: 10,
        alignSelf: 'center'
    },
    title: {
        padding: 10,
        alignSelf: 'center',
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    }
})

export default Home

