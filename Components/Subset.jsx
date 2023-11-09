import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, FlatList, Dimensions } from 'react-native'
import apiService from '../apiService'
import SubsetElement from './SubsetElement';


const Subset = ({ category, subset }) => {
    const [subsetAlgs, setSubsetAlgs] = useState([]);

    useEffect(() => {
        apiService.getSubsetAlgorithms(category, subset).then(data => setSubsetAlgs(data))
    }, [])

    return (
        <>
            {subsetAlgs && <View>
                <Text style={{ textAlign: 'center', }}>{subset}</Text>
                <FlatList
                    data={subsetAlgs}
                    numColumns={2}
                    scrollEnabled={false}
                    renderItem={({ item }) => <SubsetElement algo={item} />}
                    keyExtractor={alg => alg._id}
                />
            </View>}
        </>
    )
}

const styles = StyleSheet.create({

})

export default Subset