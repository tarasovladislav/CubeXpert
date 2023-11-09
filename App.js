import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AlgoPage from './Screens/AlgoPage';
import Subset from './Components/Subset';
import { TouchableOpacity } from 'react-native-web';
import CategoryPage from './Screens/CategoryPage';
import CategoryChoisePage from './Screens/CategoryChoisePage';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();


export default function App() {
    return (
        <NavigationContainer>
            {/* <Stack.Navigator initialRouteName="Details"> */}
            <Stack.Navigator
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
                <Stack.Screen name="Choose Category" component={CategoryChoisePage} options={{
                    title: 'Advanced Algorithms'
                }} />
                <Stack.Screen name="Category" component={CategoryPage} options={({ route }) => ({ title: route.params.name })} />
                {/* <CategoryPage category='F2L' /> */}
                <Stack.Screen name="Algo" component={AlgoPage} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
