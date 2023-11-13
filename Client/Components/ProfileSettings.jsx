import { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { Overlay } from 'react-native-elements';
import { Slider, Icon } from '@rneui/themed';
import ColorPicker, { Panel1, Swatches, Preview, HueSlider } from 'reanimated-color-picker';

import TouchableButton from './TouchableButton'





import { useSettingsContext } from '../Contexts/SettingsContext';

const ProfileSettings = ({ }) => {
    const { settings, setSettings, setWebViewKey, defaultSettings } = useSettingsContext()


    const [showLayout, setShowLayout] = useState(false);
    const [selectedSide, setSelectedSide] = useState('');
    const [selectedColor, setSelectedColor] = useState('')
    const [textColors, setTextColors] = useState({});
    const [selectedSpeed, setSelectedSpeed] = useState(settings['speed'])

    const isColorDark = (color) => {
        const hex = color.replace(/^#/, '');
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness < 100; // adjust this
    };

    const getTextColor = (backgroundColor) => {
        return isColorDark(backgroundColor) ? 'white' : 'black';
    }

    const openColorPicker = (side) => {
        setShowLayout(true);
        setSelectedSide(side);
    };

    useEffect(() => {
        if (selectedSide && selectedColor) {
            setShowLayout(false);
        }
        setTextColors({
            U: getTextColor(settings['U']),
            D: getTextColor(settings['D']),
            L: getTextColor(settings['L']),
            R: getTextColor(settings['R']),
            F: getTextColor(settings['F']),
            B: getTextColor(settings['B']),
            ignored: getTextColor(settings['ignored']),
            cube: getTextColor(settings['cube']),
        })
    }, [settings]);

    useEffect(() => {
        setSettings({ ...settings, ['speed']: selectedSpeed })
    }, [selectedSpeed])

    return (
        <>
            <Text style={styles.title}>Change Colors</Text>
            <View style={styles.buttonContainer}>
                <TouchableButton text='Up side' onPress={() => openColorPicker('U')} activeColor={settings['U']} textColor={textColors['U']} />
                <TouchableButton text='Down side' onPress={() => openColorPicker('D')} activeColor={settings['D']} textColor={textColors['D']} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableButton text='Left side' onPress={() => openColorPicker('L')} activeColor={settings['L']} textColor={textColors['L']} />
                <TouchableButton text='Right side' onPress={() => openColorPicker('R')} activeColor={settings['R']} textColor={textColors['R']} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableButton text='Front side' onPress={() => openColorPicker('F')} activeColor={settings['F']} textColor={textColors['F']} />
                <TouchableButton text='Back side' onPress={() => openColorPicker('B')} activeColor={settings['B']} textColor={textColors['B']} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableButton text='Ignored' onPress={() => openColorPicker('ignored')} activeColor={settings['ignored']} textColor={textColors['ignored']} />
                <TouchableButton text='Cube' onPress={() => openColorPicker('cube')} activeColor={settings['cube']} textColor={textColors['cube']} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableButton text='RESET COLORS'
                    onPress={() => { setSettings({ ...defaultSettings }); setShowLayout(false) }} />
            </View>


            <View style={styles.container}>
                <Overlay visible={showLayout} animationType='fade'>
                    <View style={styles.container}>
                        <ColorPicker style={{ gap: 15 }} value={settings[selectedSide]} onComplete={({ hex }) => setSelectedColor(hex)}>
                            <Preview />
                            <Panel1 boundedThumb={true} thumbSize={25} />
                            <HueSlider boundedThumb={true} thumbSize={25} />
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
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableButton text='Reset' onPress={() => setShowLayout(false)} activeColor={settings[selectedSide]} textColor={textColors[selectedSide]} />
                        <TouchableButton text='Ok' onPress={() => {
                            selectedSide && selectedColor && setSettings({ ...settings, [selectedSide]: selectedColor });
                            if (isColorDark(selectedColor)) {
                                setTextColors({ ...textColors, [selectedSide]: 'white' });
                            } else {
                                setTextColors({ ...textColors, [selectedSide]: 'black' });
                            }
                            setWebViewKey(prev => prev + 1)
                            setShowLayout(false)
                        }}
                        />
                    </View>
                </Overlay>

                <Text style={styles.title}>Change Rotation Speed</Text>

                <Slider
                    value={selectedSpeed}
                    onSlidingComplete={setSelectedSpeed}
                    maximumValue={1500}
                    minimumValue={100}
                    step={100}
                    trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                    thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                    thumbProps={{
                        children: (
                            <Icon
                                name="clock-fast"
                                type="material-community"
                                size={15}
                                reverse
                                containerStyle={{ bottom: 15, right: 15, }}
                            />
                        ),
                    }}
                />
                <Text style={{ textAlign: 'center' }}>Speed: {settings['speed']} ms / rotation</Text>
            </View>
        </>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row'
    },
    container: {
        width: width * 0.8,

        // justifyContent: 'center',
        // alignItems: 'center',
        // alignSelf: 'center' ,
        // justifyContent: 'space-evenly',
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10
    }
});
export default ProfileSettings