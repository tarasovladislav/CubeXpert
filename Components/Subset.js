import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import apiService from '../apiService'


const Subset = ({ category, subset }) => {
    const [subsetAlgs, setSubsetAlgs] = useState([]);

    useEffect(() => {
        apiService.getSubsetAlgorithms(category, subset).then(data => setSubsetAlgs(data))
    }, [])


    return (
        <View>
            <Text style={{ textAlign: 'center' }}>{subset}</Text>
            {subsetAlgs.map(alg=> {
                return <Text>{alg.algo[0]}</Text>
            })}
        </View>
    )
}

export default Subset