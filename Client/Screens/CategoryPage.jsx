import React, { useState, useEffect } from 'react'

import apiService from '../apiService'
import { ScrollView } from 'react-native';
import Subset from '../Components/Subset';
import Loading from '../Components/Loading';

const CategoryPage = ({ route, navigation }) => {
    const { category } = route.params
    const [subsetList, setSubsetList] = useState([]);
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        setIsLoading(true)
        apiService.getSubsetList(category)
            .then(data => setSubsetList(data))
            .finally(() => setIsLoading(false))
    }, [])


    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <ScrollView>
                {subsetList && subsetList.map(subset => <Subset navigation={navigation} key={subset} category={category} subset={subset} />)}
            </ScrollView>
        </>
    )
}

export default CategoryPage