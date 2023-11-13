import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, Dimensions, ActivityIndicator, View } from 'react-native'
import { Image } from 'react-native-elements';
import { imageMapping } from '../assets/img';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useFavoritesContext } from '../Contexts/FavoritesContext';



const SubsetElement = ({ navigation, algo, }) => {


    const styles = getDynamicStyles(algo.category);

    const { toggleFavorites, isInFavorites } = useFavoritesContext()

    const imageSource = imageMapping[`${algo.picturePath.toLowerCase()}`];
    const [isFavorite, setIsFavorite] = useState(isInFavorites(algo._id))


    return (
        <>

            <TouchableOpacity style={styles.algoElement}
                onPress={() => navigation.navigate('Algo', {
                    _id: algo._id,
                    name: algo.title,
                })}
            >
                <View style={{ alignItems: 'center' }}>
                    <Image
                        PlaceholderContent={<ActivityIndicator size="large" />}
                        resizeMode="contain"
                        transition={true}
                        source={imageSource} style={styles.algoImage} />
                </View>
                <Text style={styles.title}>{algo.title}</Text>
                <Text style={styles.firstAlgo}>{algo.algo[0]}</Text>
                <View style={styles.bottomSection}>
                    <TouchableOpacity
                        style={{
                            flex: 0, position: 'absolute', bottom: 0, right: 0, zIndex: 2
                        }}
                        onPress={() => {
                            toggleFavorites(algo)
                            setIsFavorite(!isFavorite)
                        }}>
                        <IconAntDesign size={24} color="orange" name={isFavorite ? "star" : "staro"} style={styles.bottomIcon} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </>
    )
}

const width = Dimensions.get('window').width;
const getDynamicStyles = (category) => {
    const imageWidth = category.toLowerCase() === 'f2l' || category.toLowerCase() === 'patterns' || category.toLowerCase() === 'beginners' ? width / 3 : width / 4


    return StyleSheet.create({
        algoElement: {
            flex: 1,
            maxWidth: width / 2 - 20,
            margin: 10,
            padding: 10,
            borderRadius: 8,
            backgroundColor: 'white',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.23,
            shadowRadius: 2.22,
            elevation: 3,
        },
        algoImage: {
            width: imageWidth,
            height: imageWidth,
        },
        title: {
            marginTop: 5,
            fontSize: 16,
            fontWeight: 'bold',
        },
        firstAlgo: {
            fontSize: 14,
            maxWidth: '90%',
            marginBottom: 5
        },
        bottomSection: {
            flexDirection: 'row',
            position: 'absolute',
            bottom: 5,
            right: 5,
            justifyContent: 'flex-end',
            // other styles for the bottom section
        },
        bottomIcon: {
            // styles for the icons in the bottom section
        },
    })
}
const styles = StyleSheet.create({
    algoElement: {
        flex: 1,
        maxWidth: width / 2 - 20,
        margin: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.22,
        elevation: 3,
    },
    algoImage: {
        width: width / 4,
        height: width / 4,
    },
    title: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    firstAlgo: {
        fontSize: 14,
        maxWidth: '90%',
        marginBottom: 5
    },
    bottomSection: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 5,
        right: 5,
        justifyContent: 'flex-end',
        // other styles for the bottom section
    },
    bottomIcon: {
        // styles for the icons in the bottom section
    },
})

export default SubsetElement