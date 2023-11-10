import { useState } from 'react';
import { Button, Modal, StyleSheet, View, Dimensions, Text } from 'react-native';
import { Overlay, } from 'react-native-elements';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider, HueCircular } from 'reanimated-color-picker';

import TouchableButton from './TouchableButton'


import { useSettingsContext } from '../Contexts/SettingsContext';




const ProfileSettings = ({ }) => {
    const { settings, setSettings, setWebViewKey } = useSettingsContext()


    const [showModal, setShowModal] = useState(false);
    const [selectedSide, setSelectedSide] = useState('');
    const [chosenColor, setChosenColor] = useState('')

    const onSelectColor = ({ hex }) => {
        setChosenColor(hex)
    };

    const openColorPicker = (side) => {
        setShowModal(true);
        setSelectedSide(side);
    };

    return (
        <>

            <Text style={{ fontSize: 18, textAlign: 'center' }}>Change preferences</Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableButton text='Up side' onPress={() => openColorPicker('U')} activeColor={settings['U']} />
                <TouchableButton text='Down side' onPress={() => openColorPicker('D')} activeColor={settings['D']} />

            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableButton text='Left ' onPress={() => openColorPicker('L')} activeColor={settings['L']} />
                <TouchableButton text='Right side' onPress={() => openColorPicker('R')} activeColor={settings['R']} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableButton text='Front side' onPress={() => openColorPicker('F')} activeColor={settings['F']} />
                <TouchableButton text='Back side' onPress={() => openColorPicker('B')} activeColor={settings['B']} />
            </View>

            <Button title='Ignored' onPress={() => openColorPicker('ignored')} />
            <Button title='Cube' onPress={() => openColorPicker('cube')} />


            <View style={styles.container}>
                <Overlay visible={showModal} animationType='fade'>
                    <View style={styles.container}>

                        <ColorPicker style={{ gap: 15 }} value={settings[selectedSide]} onComplete={onSelectColor}>
                            <Preview />
                            <Panel1 />
                            <HueSlider />
                            <Swatches colors={[
                                '#fcff02',
                                '#ff0001',
                                '#01dd01',
                                '#1777fe',
                                '#ffa501',
                                '#eeefef',
                            ]} />
                        </ColorPicker>
                    </View>
                    <Button title='Ok' onPress={() => {
                        selectedSide && setSettings({ ...settings, [selectedSide]: chosenColor });
                        setWebViewKey(prev => prev + 1)
                        setShowModal(false)
                    }
                    } />
                    <Button title='Reset' onPress={() => {
                        setShowModal(false)
                    }} />

                </Overlay>
            </View>
        </>
    );
};
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width * 0.8,

        // justifyContent: 'center',
        // alignItems: 'center',
        // alignSelf: 'center' ,
        // justifyContent: 'space-evenly',
    },
});
export default ProfileSettings