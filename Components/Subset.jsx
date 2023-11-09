import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, Dimensions } from 'react-native'
import apiService from '../apiService'
import SubsetElement from './SubsetElement';
// import { Text } from 'react-native-elements';
import { Text } from 'react-native';
import Loading from './Loading';


const Subset = ({ navigation, category, subset }) => {
    const [subsetAlgs, setSubsetAlgs] = useState([]);

    useEffect(() => {
        apiService.getSubsetAlgorithms(category, subset)
            .then(data => setSubsetAlgs(data))
    }, [])

    return (
        <>
            {subsetAlgs && <View>
                <Text h2 style={styles.subsetTitle}>{subset}</Text>
                <FlatList
                    data={subsetAlgs}
                    numColumns={2}
                    scrollEnabled={false}
                    renderItem={({ item }) => <SubsetElement navigation={navigation} algo={item} />}
                    keyExtractor={alg => alg._id}
                />
            </View>}
        </>
    )
}

const styles = StyleSheet.create({
    subsetTitle: {
        textAlign: 'center',
        fontSize: 24,
        margin: 10,
    }
})

export default Subset