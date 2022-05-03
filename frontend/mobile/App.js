import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { defaultColor, getThemeColor } from './observables/themeColor.js';

import Header from './components/Header';
import Startup from './pages/Startup';

function App() {
  const [theme, setTheme] = useState(defaultColor());
  const [startingUp, setStartingUp] = useState(false);
  const [route, setRoute] = useState('');
  
  getThemeColor().subscribe(value => setTheme(value));

  return (
    <>
      {!startingUp && <Header headline='Login' />}
      <LinearGradient colors={['#fff', theme]} style={globalStyles.bodyContainer}>
          { startingUp && <Startup /> }
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