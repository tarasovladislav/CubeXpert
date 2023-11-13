import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AlgoPage from './Screens/AlgoPage';
import Subset from './Components/Subset';
import { TouchableOpacity } from 'react-native-web';
import CategoryPage from './Screens/CategoryPage';
import CategoryChoisePage from './Screens/CategoryChoisePage';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Screens/Home';
const Stack = createNativeStackNavigator();
import { createContext, useState } from 'react';

// export const SettingsContext = createContext();
import { SettingsContextProvider } from './Contexts/SettingsContext';
import { FavoritesContextProvider } from './Contexts/FavoritesContext';
import Favorites from './Screens/Favorites';
import BeginnersLessonChoice from './Screens/BeginnersLessonChoice';
import LessonPage from './Screens/LessonPage';
export default function App() {





    return (
        <NavigationContainer>
            {/* <Stack.Navigator initialRouteName="Details"> */}
            <FavoritesContextProvider>
                <SettingsContextProvider>
                    <Stack.Navigator
                        initialRouteName="Home"
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: '#7870ec',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerBackTitle: 'Back'

                        }}
                    >


                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Choose Category" component={CategoryChoisePage} options={{
                            title: 'Advanced Algorithms'
                        }} />
                        <Stack.Screen name="Beginners Lessons" component={BeginnersLessonChoice} options={{
                            title: 'Beginners Lessons'
                        }} />
                        <Stack.Screen name="Lesson" component={LessonPage} options={({ route }) => ({ title: route.params.name })} />
                        <Stack.Screen name="Favorites" component={Favorites} options={({ route }) => ({ title: route.params.name })} />
                        <Stack.Screen name="Category" component={CategoryPage} options={({ route }) => ({ title: route.params.name })} />
                        <Stack.Screen name="Algo" component={AlgoPage} options={({ route }) => ({ title: route.params.name })} />

                    </Stack.Navigator>
                </SettingsContextProvider>
            </FavoritesContextProvider>
        </NavigationContainer>
    );
}
