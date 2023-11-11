import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, Dimensions, ActivityIndicator, View } from 'react-native'
import { Image } from 'react-native-elements';
import { imageMapping } from '../assets/img';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useFavoritesContext } from '../Contexts/FavoritesContext';


const SubsetElement = ({ navigation, algo }) => {
    const { toggleFavorites, isInFavorites } = useFavoritesContext()

    const imageSource = imageMapping[`${algo.picturePath.toLowerCase()}`];
    const [isFavorite, setIsFavorite] = useState(isInFavorites(algo._id))



    return (
        <View style={{ padding: 5, flex: 1 }}>

            <TouchableOpacity
                style={styles.listElement}
                onPress={() => navigation.navigate('Algo', {
                    _id: algo._id,
                    name: algo.title,
                })}
            >
                <TouchableOpacity
                    style={{
                        flex: 0, position: 'absolute', bottom: 0, right: 0, zIndex: 2
                    }}
                    onPress={() => {
                        toggleFavorites(algo)
                        setIsFavorite(!isFavorite)
                    }} >
                    <IconAntDesign size={30} color="orange" name={isFavorite ? "star" : "staro"} style={{ padding: 5 }} />
                </TouchableOpacity>

                <Image

                    PlaceholderContent={<ActivityIndicator size="large" />}
                    style={styles.cubeImage}
                    source={imageSource}
                    resizeMode="contain"
                    transition={true}
                />


                <Text>{algo.title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    cubeImage: {
        width: width / 3,
        height: width / 3,
    },
    listElement: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderColor: 'rgba(132, 122, 122, 0.3)',
        borderWidth: 2
        // position: 'relative',

    }
})

export default SubsetElement