import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { defaultColor, getThemeColor, setThemeColor } from './observables/themeColor.js';

import Loading from './pages/Loading'

function App() {
  const [theme, setTheme] = useState(defaultColor());

  getThemeColor().subscribe(value => setTheme(value));

  return (
    <LinearGradient colors={['#fff', theme]} style={globalStyles.bodyContainer}>
        <Loading />
    </LinearGradient>
  )
}

export default App;

export const globalStyles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    alignItems: 'center'
  },
  fieldHeadingText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  }
});