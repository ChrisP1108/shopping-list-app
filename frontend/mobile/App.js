import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { defaultColor, getThemeColor } from './observables/themeColor.js';

import Header from './components/Header';
import Startup from './pages/Startup';

function App() {
  const [theme, setTheme] = useState(defaultColor());
  const [loading, setLoading] = useState(false);
  getThemeColor().subscribe(value => setTheme(value));

  return (
    <>
      {!loading && <Header headline='Login' />}
      <LinearGradient colors={['#fff', theme]} style={globalStyles.bodyContainer}>
          { loading && <Startup /> }
      </LinearGradient>
    </>
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