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

export default function App() {





    return (
        <NavigationContainer>
            {/* <Stack.Navigator initialRouteName="Details"> */}
            <SettingsContextProvider>
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#f4511e',
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
                    <Stack.Screen name="Category" component={CategoryPage} options={({ route }) => ({ title: route.params.name })} />
                    <Stack.Screen name="Algo" component={AlgoPage} options={({ route }) => ({ title: route.params.name })} />

                </Stack.Navigator>
            </SettingsContextProvider>
        </NavigationContainer>
    );
}