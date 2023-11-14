import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, Text, ScrollView, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import { Image } from 'react-native-elements';
import { imageMapping } from '../assets/img/'

const CategoryChoisePage = ({ navigation, }) => {
    const [categoryList, setCategoryList] = useState([
        { title: 'First Two Layers', path: 'F2L', picturePath: 'F2L1' },
        { title: 'Orient Last Layer', path: 'OLL', picturePath: 'OLL1' },
        { title: 'Position Last Layer', path: 'PLL', picturePath: 'ua' }
    ])

    return (
        <>
            {categoryList && categoryList.map(cat => (<View style={styles.container} key={cat.title}>

                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 20, margin: 10 }}
                    onPress={() => navigation.navigate('Category', {
                        name: cat.title,
                        category: cat.path
                    })}
                >
                    <Image
                        style={styles.image}
                        source={imageMapping[`${cat.picturePath.toLowerCase()}`]}
                        resizeMode="contain"
                        transition={true}

                    />
                    <Text style={styles.header}>{cat.title}</Text>

                </TouchableOpacity>
            </View>))}
        </>
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
        width: width / 4,
        height: width / 4,
    },
    header: {
        fontSize: 22,
        fontWeight: 600
    }
})

export default CategoryChoisePage