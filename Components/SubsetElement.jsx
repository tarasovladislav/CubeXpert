import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native'

const SubsetElement = ({ algo }) => {
    return (
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                style={styles.cubeImage}
                source={{ uri: `http://localhost:3100/img/${algo.picturePath}.png` }}
                resizeMode="contain"
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
    }
})

export default SubsetElement