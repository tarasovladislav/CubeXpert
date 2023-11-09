import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AlgoPage from './Screens/AlgoPage';
import Subset from './Components/Subset';
import { TouchableOpacity } from 'react-native-web';
import CategoryPage from './Screens/CategoryPage';
export default function App() {
    return (

        <View style={styles.container}>
            <SafeAreaView>
                <CategoryPage category='F2L'/>
                {/* <Subset category='F2L' subset='Free Pairs' /> */}
                {/* <AlgoPage /> */}
            </SafeAreaView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});
