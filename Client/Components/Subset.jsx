import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import apiService from '../apiService'
import SubsetElement from './SubsetElement';
import { Text } from 'react-native';


const Subset = ({ navigation, category, subset }) => {
    const [subsetAlgs, setSubsetAlgs] = useState([]);

    useEffect(() => {
        apiService.getSubsetAlgorithms(category, subset)
            .then(data => setSubsetAlgs(data))
    }, [])

    return (
        <>

        {/* попробовать ListEmptyComponent чтобы избежать растяжение последнего элемента */}

        {/* getItemLayout чтобы заранее знать размер загружемых сообщений чтобы не было стрмного перехода  */}
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