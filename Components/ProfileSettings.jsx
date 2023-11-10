import { useState } from 'react';
import { Button, Modal, StyleSheet, View, Dimensions, Text } from 'react-native';
import { Overlay } from 'react-native-elements';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';

const ProfileSettings = ({ settings, setSettings }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedSide, setSelectedSide] = useState('');

    const onSelectColor = ({ hex }) => {
        selectedSide && setSettings({ ...settings, [selectedSide]: hex });
    };

    // Function to open the color picker for a specific side
    const openColorPicker = (side) => {
        setSelectedSide(side);
        setShowModal(true);
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 18, textAlign: 'center' }}>Change preferences</Text>
            <Button title='U' onPress={() => openColorPicker('U')} />
            <Button title='D' onPress={() => openColorPicker('D')} />
            <Button title='R' onPress={() => openColorPicker('R')} />
            <Button title='L' onPress={() => openColorPicker('L')} />
            <Button title='F' onPress={() => openColorPicker('F')} />
            <Button title='B' onPress={() => openColorPicker('B')} />
            <Button title='Ignored' onPress={() => openColorPicker('ignored')} />
            <Button title='Cube' onPress={() => openColorPicker('cube')} />


            <Overlay visible={showModal} animationType='fade'>
                <View style={styles.container}>

                <ColorPicker style={{ width: '100%' }} value={settings[selectedSide]} onComplete={onSelectColor}>
                    <Preview />
                    <Panel1 />
                    <HueSlider />
                </ColorPicker>
                </View>
                <Button title='Ok' onPress={() => setShowModal(false)} />
            </Overlay>
        </View>
    );
};
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width * 0.8,
        justifyContent: 'center',
    },
});
export default ProfileSettings