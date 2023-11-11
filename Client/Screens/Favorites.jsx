import React, { useState, useEffect } from 'react'
import apiService from '../apiService'
import { ScrollView, FlatList, View, Text } from 'react-native';
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
    // Create a placeholder item with a unique key
    // const placeholderItem = { _id: 'placeholder', title: '', picturePath: '' };

    // // Add the placeholder item to the end of favoritesList
    // const updatedFavoritesList = [...favoritesList, placeholderItem];
    return (
        <>
            <ScrollView>
                <FlatList

                    data={favoritesList}
                    numColumns={2}
                    scrollEnabled={false}
                    renderItem={({ item }) => {
                        // if (item._id !== 'placeholder') {
                        return <SubsetElement navigation={navigation} algo={item} />;
                        // }
                        // // Return an empty View for the placeholder item
                        // return <View style={{ flex: 1 }} />;
                    }
                    }
                    ListEmptyComponent={
                        <Text style={{ textAlign: 'center', fontSize: 20 }}>No Favorite Algorithms Yet</Text>


                    }
                    keyExtractor={alg => alg._id}
                />
            </ScrollView>
        </>
    )
}

export default Favorites