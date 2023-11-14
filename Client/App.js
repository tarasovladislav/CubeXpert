import AlgoPage from './Screens/AlgoPage';
import CategoryPage from './Screens/CategoryPage';
import CategoryChoisePage from './Screens/CategoryChoisePage';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Screens/Home';
const Stack = createNativeStackNavigator();

import { SettingsContextProvider } from './Contexts/SettingsContext';
import { FavoritesContextProvider } from './Contexts/FavoritesContext';
import Favorites from './Screens/Favorites';
import BeginnersLessonChoice from './Screens/BeginnersLessonChoice';
import LessonPage from './Screens/LessonPage';
import commonStyles from './commonStyles';


export default function App() {
    return (
        <NavigationContainer>
            <FavoritesContextProvider>
                <SettingsContextProvider>
                    <Stack.Navigator
                        initialRouteName="Home"
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: '#6374ae',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerBackTitle: 'Back',
                            contentStyle: {backgroundColor: commonStyles.backgroundColor}
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
