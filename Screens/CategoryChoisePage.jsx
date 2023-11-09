import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, Text, } from 'react-native'
import { Divider } from 'react-native-elements';
import { Image } from 'react-native-elements';


const CategoryChoisePage = ({ navigation }) => {
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        setCategoryList([
            { title: 'F2L', picturePath: 'F2L1' },
            { title: 'OLL', picturePath: 'OLL1' },
            { title: 'PLL', picturePath: 'ua' }
        ])
    }, [])
    /*
        {
            title: 
            imgSrc: 
            desc? :
        }
    */

    return (
        <>
            {categoryList && categoryList.map(cat => (<View>

                <TouchableOpacity
                    key={cat.title}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 20, margin: 10 }}
                    onPress={() => navigation.navigate('Category', {
                        name: cat.title,
                        category: cat.title
                    })}
                >
                    <Image
                        style={{ width: 80, height: 80, }}
                        source={{ uri: `https://cubium-fe4h.vercel.app/img/${cat.picturePath.toLowerCase()}.png` }}
                        resizeMode="contain"
                        transition={true}

                    />
                    <Text>{cat.title}</Text>

                </TouchableOpacity>
                <Divider orientation="horizontal" width={1} />
            </View>))}
        </>
    )
}

export default CategoryChoisePage