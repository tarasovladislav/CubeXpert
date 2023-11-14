import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, Text, ScrollView, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import { Image } from 'react-native-elements';
import { imageMapping } from '../assets/img/'
import apiService from '../apiService'
import Loading from '../Components/Loading';

const BeginnersLessonChoice = ({ navigation, }) => {

    //TODO try to reuse for catchoicepage
    const [categoryList, setCategoryList] = useState([])
    const [lessonsList, setLessonsList] = useState([])
    useEffect(() => {
        setIsLoading(true)

        apiService.getAllLessons()
            .then(data => setLessonsList(data))
            .finally(() => setIsLoading(false))
    }, [])
    const [isLoading, setIsLoading] = useState(true)
    if (isLoading) {
        return <Loading />
    }
    return (
        <ScrollView>
            {/* <View style={styles.container}>
                    
                </View> */}


            {lessonsList && lessonsList.map(lesson => (<View style={styles.container} key={lesson.stepTitle}>

                <TouchableOpacity

                    style={{ flexDirection: 'row', alignItems: 'center', gap: 20, margin: 10 }}
                    onPress={() => navigation.navigate('Lesson', {
                        name: lesson.stepTitle,
                        data: lesson
                    })}
                >

                    <Image
                        style={styles.image}
                        source={imageMapping[`${lesson.to.toLowerCase()}`]}
                        resizeMode="contain"
                        transition={true}

                    />

                    <Text style={styles.header}>{lesson.stepTitle}</Text>

                </TouchableOpacity>
            </View>))}
        </ScrollView>
    )
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2.22,
        elevation: 3,
        borderRadius: 8,
        shadowOpacity: 0.23,
    },
    image: {
        width: width / 5,
        height: width / 5,
    },
    header: {
        fontSize: 22,
        fontWeight: 600
    }
})
export default BeginnersLessonChoice