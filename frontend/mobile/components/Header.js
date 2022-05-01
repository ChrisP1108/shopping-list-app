import React, { useState, useEffect } from 'react';
import { Text, View, Image, Animated, StyleSheet } from 'react-native';
import { defaultColor, getThemeColor } from '../observables/themeColor.js';

function Header({ headline }) {
    const [theme, setTheme] = useState(defaultColor());

    getThemeColor().subscribe(value => setTheme(value));

    return (
        <View style={{height: 60, backgroundColor: theme, alignItems: 'center'}}>
            <Text style={{color: 'white', marginTop: 'auto', 
                marginBottom: 'auto', fontSize: 22, fontWeight: 'bold'}}>
                    {headline}
            </Text>
        </View>
    )
}

export default Header