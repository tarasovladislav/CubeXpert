import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, Text, ScrollView} from 'react-native'
import { Divider } from 'react-native-elements';
import { Image } from 'react-native-elements';
import {imageMapping} from '../assets/img/'
import apiService from '../apiService'
const BeginnersLessonChoice = ({ navigation,  }) => {
    const [categoryList, setCategoryList] = useState([])
    const [lessonsList, setLessonsList] = useState([])
    useEffect(() => {
        apiService.getAllLessons().then(data=> setLessonsList(data))


        // setCategoryList([
        //     { title: 'Move Notation', picturePath: 'F2L1' },
        //     { title: 'OLL', picturePath: 'OLL1' },
        //     { title: 'PLL', picturePath: 'ua' }
        // ])
    }, [])

    return (
        <ScrollView>
            {lessonsList && lessonsList.map(lesson => (<View key={lesson.stepTitle}>

                <TouchableOpacity
                    
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 20, margin: 10 }}
                    onPress={() => navigation.navigate('Lesson', {
                        name: lesson.stepTitle,
                        data: lesson
                    })}
                >
                    <Image
                        style={{ width: 80, height: 80, }}
                        source={imageMapping[`${lesson.to.toLowerCase()}`]}
                        resizeMode="contain"
                        transition={true}

                    />
                    <Text>{lesson.stepTitle}</Text>

                </TouchableOpacity>
                <Divider orientation="horizontal" width={1} />
            </View>))}
        </ScrollView>
    )
}

export default BeginnersLessonChoice