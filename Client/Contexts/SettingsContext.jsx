import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsContext = createContext();

const SettingsContextProvider = ({ children }) => {
    const [webViewKey, setWebViewKey] = useState(1);

    const [settings, setSettings] = useState({
        U: '#fcff02',
        F: '#ff0001',
        R: '#01dd01',
        L: '#1777fe',
        B: '#ffa501',
        D: '#eeefef',
        cube: '#000000',
        ignored: '#454445',
        speed: '500'
    })

    useEffect(() => {
        AsyncStorage.getItem('settings')
            .then(savedSettings => {
                console.log(savedSettings, 'INITIAL')
                savedSettings && setSettings(JSON.parse(savedSettings));
            })
            .catch(error => {
                console.error('Error retrieving settings: ', error);
            });
    }, []);

    useEffect(() => {
        const settingsJson = JSON.stringify(settings)
        AsyncStorage.setItem('settings', settingsJson)
            .then(() => {
                console.log('Settings updated in LocalStorage')
            })
            .catch((error) => {
                console.log(error)
            })
    }, [settings])

    return (
        <SettingsContext.Provider value={{ settings, setSettings, webViewKey, setWebViewKey }}>
            {children}
        </SettingsContext.Provider>
    );
};

const useSettingsContext = () => {
    return useContext(SettingsContext);
};

export { SettingsContextProvider, useSettingsContext };