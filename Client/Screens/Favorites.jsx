import React, { useState, useEffect } from 'react'
import apiService from '../apiService'
import { ScrollView, FlatList } from 'react-native';
import Subset from '../Components/Subset';
import Loading from '../Components/Loading';
import { useFavoritesContext } from '../Contexts/FavoritesContext';
import SubsetElement from '../Components/SubsetElement';

const Favorites = ({ route, navigation }) => {
    const { category } = route.params
    const [subsetList, setSubsetList] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const { favoritesList } = useFavoritesContext()
    console.log(favoritesList)

    // useEffect(() => {
    //     setIsLoading(true)
    //     apiService.getSubsetList(category)
    //         .then(data => setSubsetList(data))
    //         .finally(() => setIsLoading(false))
    // }, [])


    // if (isLoading) {
    //     return <Loading />
    // }

    return (
        <>
            <ScrollView>
                <FlatList
                    data={favoritesList}
                    numColumns={2}
                    scrollEnabled={false}
                    renderItem={({ item }) => <SubsetElement navigation={navigation} algo={item} />}
                    keyExtractor={alg => alg._id}
                />
            </ScrollView>
        </>
    )
}

export default Favorites