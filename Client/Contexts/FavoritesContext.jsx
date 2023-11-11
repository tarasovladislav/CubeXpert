import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

const FavoritesContextProvider = ({ children }) => {
    const [favoritesList, setFavoritesList] = useState([])


    const toggleFavorites = (item) => {
        // setFavoritesList([])
        const index = favoritesList.findIndex((alg) => alg._id === item._id)

        console.log(item)
        if (index === -1) {
            setFavoritesList([...favoritesList, item])
            return
        } else {
            setFavoritesList(
                favoritesList.filter(alg => alg._id !== item._id)
            );
        }


    }
    const isInFavorites = (id) => {
        return favoritesList.findIndex((alg) => alg._id === id) === -1 ? false:true
    }


    useEffect(() => {
        AsyncStorage.getItem('favoritesList')
            .then(savedFavorites => {
                // console.log(savedFavorites, 'INITIAL')
                savedFavorites && setFavoritesList(JSON.parse(savedFavorites));
            })
            .catch(error => {
                console.error('Error retrieving settings: ', error);
            });
    }, []);

    useEffect(() => {
        console.log('AFTER RUN IT IS ', favoritesList);

        const favoritesJson = JSON.stringify(favoritesList)
        AsyncStorage.setItem('favoritesList', favoritesJson)
            .then(() => {
                console.log('Settings updated in LocalStorage')
            })
            .catch((error) => {
                console.log(error)
            })
    }, [favoritesList])



    return (
        <FavoritesContext.Provider value={{ toggleFavorites, isInFavorites, favoritesList }}>
            {children}
        </FavoritesContext.Provider>
    );
};

const useFavoritesContext = () => {
    return useContext(FavoritesContext);
};

export { FavoritesContextProvider, useFavoritesContext };