import React, { useState, useEffect } from 'react'

import { View, Text, FlatList, ScrollView, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native'
import SubsetElement from '../Components/SubsetElement'
import apiService from '../apiService'
import { imageMapping } from '../assets/img';
import IconEntypo from 'react-native-vector-icons/Entypo';

const LessonPage = ({ navigation, route }) => {
    // const data = navigation.para
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


    // const data = {
    //     stepTitle: 'White Cross',
    //     from: 'crossfrom',
    //     to: 'crossto',
    //     data: [
    //         {
    //             type: 'paragraph',
    //             content: "Hold the white center piece on top, and find an edge in the bottom layer that has white on it."
    //         },
    //         {
    //             type: 'note',
    //             content: "An edge piece has 2 colors on it."
    //         },
    //         {
    //             type: 'paragraph',
    //             content: "Look at the edge piece's other color, and turn the bottom layer so the edge is under the center of the same color."
    //         },
    //         {
    //             type: 'paragraph',
    //             content: "Turn that face to bring the edge piece to the top."
    //         },
    //         {
    //             type: 'algo',
    //             content: ["65521c94145ed356047e91af"]
    //         },
    //         {
    //             type: 'paragraph',
    //             content: "Anytime an edge piece is flipped (example above), fix it by doing the following moves:"
    //         },
    //         {
    //             type: 'algo',
    //             content: ["65521c94145ed356047e91b0"]
    //         },
    //         {
    //             type: 'paragraph',
    //             content: "Anytime you find a white edge piece that is not in the bottom layer, you can move it into the bottom by doing the following moves:"
    //         },
    //         {
    //             type: 'algo',
    //             content: ["65522102b7a4d7b46c35ac8e"]
    //         },
    //         {
    //             type: 'paragraph',
    //             content: "And then solve it like you would for any white edge in the bottom layer."
    //         },
    //         {
    //             type: 'paragraph',
    //             content: "Solve all 4 of the white edge pieces to make a cross. Make sure you always look at both colors on each piece so that you end up with the side colors matching as well."
    //         },
    //     ]
    // }

    const imageFrom = imageMapping[`${data.from.toLowerCase()}`];
    const imageTo = imageMapping[`${data.to.toLowerCase()}`];

    return (
        <>
            <ScrollView>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 10,
                    padding: 10,
                    backgroundColor: 'white',
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 2.22,
                    elevation: 3,
                    borderRadius: 8,
                    shadowOpacity: 0.23,
                }}>
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
                                    renderItem={({ item }) => (<SubsetElement  navigation={navigation} algo={item} />)}
                                    keyExtractor={alg => alg._id}
                                />
                                {/* } */}
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
        // transform: [{ rotate: '180deg'}]

    },

})

export default LessonPage