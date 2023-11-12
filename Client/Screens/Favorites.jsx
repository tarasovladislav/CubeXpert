import React, { useState } from 'react'
import { ScrollView, FlatList, View, Text } from 'react-native';
import { useFavoritesContext } from '../Contexts/FavoritesContext';
import SubsetElement from '../Components/SubsetElement';

const Favorites = ({ route, navigation }) => {
    const { favoritesList } = useFavoritesContext()

    return (
        <>
            <ScrollView>
                <FlatList
                    data={favoritesList}
                    numColumns={2}
                    scrollEnabled={false}
                    renderItem={({ item }) => <SubsetElement navigation={navigation} algo={item} />}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: 20 }}>No Favorite Algorithms Yet</Text>}
                    keyExtractor={alg => alg._id}
                />
            </ScrollView>
        </>
    )
}

export default Favorites