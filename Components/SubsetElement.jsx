import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements';
import { imageMapping } from '../assets/img';


const SubsetElement = ({ navigation, algo }) => {

    const imageSource = imageMapping[`${algo.picturePath.toLowerCase()}`];

    return (
        <TouchableOpacity
            style={styles.listElement}
            onPress={() => navigation.navigate('Algo', {
                _id: algo._id,
                name: algo.title,
            })}
        >
            <Image
                PlaceholderContent={<ActivityIndicator size="large" />}
                style={styles.cubeImage}
                source={imageSource}
                resizeMode="contain"
                transition={true}
            />
            <Text>{algo.title}</Text>
        </TouchableOpacity>
    )
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    cubeImage: {
        width: width / 2.5,
        height: width / 2.5,
    },
    listElement: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(132, 122, 122, 0.3)',

    }
})

export default SubsetElement