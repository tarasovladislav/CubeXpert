import React, { useEffect, useState } from 'react'
import { ScrollView, FlatList, View, Text, StyleSheet } from 'react-native';
import { useFavoritesContext } from '../Contexts/FavoritesContext';
import SubsetElement from '../Components/SubsetElement';

const Favorites = ({ navigation }) => {
    const { favoritesList } = useFavoritesContext()
    const [groupedFavorites, setGroupedFavorites] = useState([])

    function groupAlgorithmsByCategory(algorithms) {
        const categories = {};

        algorithms.forEach(algo => {
            const category = algo.category;

            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(algo);
        });
        const sortedCategories = Object.keys(categories).sort();

        return sortedCategories.map(categorytitle => ({
            categorytitle,
            algoArray: categories[categorytitle]
        })).sort();
    }

    useEffect(() => {
        setGroupedFavorites(groupAlgorithmsByCategory(favoritesList));
    }, [favoritesList])


    //TODO style no favorite algs
    return (
        <>
            <ScrollView>
                {groupedFavorites.length ? groupedFavorites.map((category) => {
                    return <View key={category.categorytitle}>
                        <Text style={styles.categorytitle}>{category.categorytitle}</Text>
                        <FlatList
                            data={category.algoArray}
                            numColumns={2}
                            scrollEnabled={false}
                            renderItem={({ item }) => <SubsetElement navigation={navigation} algo={item} />}
                            keyExtractor={alg => alg._id}
                        />
                    </View >

                }) : <Text >No favorite algorithms yet</Text>}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    categorytitle: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2.22,
        elevation: 3,
        shadowOpacity: 0.23,
    }
})


export default Favorites