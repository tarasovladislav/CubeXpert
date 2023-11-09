import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
// import { Image } from 'react-native'
import { Image } from 'react-native-elements';

const SubsetElement = ({ navigation, algo }) => {
    return (
        <TouchableOpacity
            style={styles.listElement}
            onPress={() => navigation.navigate('Algo', {
                algorithm: algo._id //change to _id later
            })}
        >
            <Image
                PlaceholderContent={<ActivityIndicator size="large" />}
                style={styles.cubeImage}
                source={{ uri: `https://cubium-fe4h.vercel.app/img/${algo.picturePath.toLowerCase()}.png` }}
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