import React, { useState, useEffect } from 'react'

import apiService from '../apiService'
import { ScrollView } from 'react-native';
import Subset from '../Components/Subset';


const CategoryPage = ({ route, navigation }) => {
    const { category } = route.params
    const [subsetList, setSubsetList] = useState([]);

    useEffect(() => {
        apiService.getSubsetList(category).then(data => setSubsetList(data))
    }, [])

    return (
        <>
            <ScrollView>
                {subsetList && subsetList.map(subset => <Subset navigation={navigation} key={subset} category={category} subset={subset} />)}
            </ScrollView>
        </>
    )
}

export default CategoryPage