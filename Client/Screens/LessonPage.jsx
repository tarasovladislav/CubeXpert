import React, { useState, useEffect } from 'react'

import { View, Text, FlatList, ScrollView, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native'
import SubsetElement from '../Components/SubsetElement'
import apiService from '../apiService'
import { imageMapping } from '../assets/img';
import IconEntypo from 'react-native-vector-icons/Entypo';

const LessonPage = ({ navigation, route }) => {
    const { data } = route.params

    const [algoData, setAlgoData] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await Promise.all(
                data.data.map(async (element) => {
                    if (element.type === 'algo') {
                        const algoIds = Array.isArray(element.content) ? element.content : [element.content];
                        const algoDataArray = await Promise.all(
                            algoIds.map(async (algoId) => {
                                return await apiService.getAlgo(algoId);
                            })
                        );
                        return algoDataArray;
                    } else {
                        return [];
                    }
                })
            );

            setAlgoData(fetchedData);
        };

        fetchData();
    }, []);

    const imageFrom = imageMapping[`${data.from.toLowerCase()}`];
    const imageTo = imageMapping[`${data.to.toLowerCase()}`];

    return (
        <>
            <ScrollView>

                <View style={styles.container}>
                    <Image
                        PlaceholderContent={<ActivityIndicator size="large" />}
                        resizeMode="contain"
                        transition={true}
                        source={imageFrom} style={styles.algoImage} />
                    <IconEntypo size={50} color="black" name='arrow-right' style={styles.bottomIcon} />

                    <Image
                        PlaceholderContent={<ActivityIndicator size="large" />}
                        resizeMode="contain"
                        transition={true}
                        source={imageTo} style={styles.algoImage} />
                </View>




                {data.data.map((element, index) => {
                    switch (element.type) {
                        case 'paragraph':
                            return <Text key={element._id} style={styles.paragraph}>{element.content}</Text>

                        case 'algo':
                            return <View key={element._id} style={{ flex: 1, }}>
                                {/* {data.data[index].content.length === 1 ? <SubsetElement navigation={navigation} algo={algoData[index]} /> : */}

                                <FlatList
                                    data={algoData[index]}
                                    numColumns={2}
                                    scrollEnabled={false}
                                    renderItem={({ item }) => (<SubsetElement navigation={navigation} algo={item} />)}
                                    keyExtractor={alg => alg._id}
                                />
                            </View>

                        case 'image':
                            return <View style={styles.container}>
                                {element.content.map((image) => {
                                    return <Image
                                        PlaceholderContent={<ActivityIndicator size="large" />}
                                        resizeMode="contain"
                                        transition={true}
                                        source={imageMapping[image]}
                                        style={element.content.length === 2 ? styles.algoImage : styles.algoImage2}
                                    />
                                })}
                            </View>


                        case 'note':
                            return <Text key={element._id} style={styles.note}><Text style={{ fontWeight: 'bold' }}>Note:</Text> {element.content}</Text>

                        default:
                            break;
                    }
                })}
            </ScrollView>

        </>
    )
}
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    note: {
        marginHorizontal: 10,
        textAlign: 'center',
    },
    paragraph: {
        marginHorizontal: 10,
        fontSize: 16,
        margin: 10,

    },
    algoImage: {
        width: width / 3,
        height: width / 3,
    },
    algoImage2: {
        width: width / 3.5,
        height: width / 3.5,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2.22,
        elevation: 3,
        borderRadius: 8,
        shadowOpacity: 0.23,
    }

})

export default LessonPage