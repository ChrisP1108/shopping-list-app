import React, { useState, useEffect } from 'react';
import { Text, View, Image, Animated, StyleSheet } from 'react-native';

import { getThemeColor } from '../observables/themeColor';
import { getRoute, goBackRoute } from '../observables/router';

function Header({ headline }: any) {

    const [theme, setTheme]: any = useState(getThemeColor()._value);
    const [tabs, setTabs]: any = useState({ backRoute: false, rightTab: null });
    
    useEffect(() => {
        getThemeColor().subscribe(setTheme);
        getRoute().subscribe((route: any) => {
            if (route.history.length) {
                setTabs({...tabs, backRoute: true})
            } else setTabs({...tabs, backRoute: false})
        });
    }, [getThemeColor(), getRoute()])
    
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