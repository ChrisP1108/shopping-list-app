import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { getThemeColor, setThemeColor } from './observables/themeColor';
import { getRoute, setRoute } from './observables/router';
import { getData, setData } from './observables/data.js';

import { httpReq } from './httpReq';

import Header from './components/Header';

import Startup from './pages/Startup';
import Login from './pages/Login';
import RegOrUpdate from './pages/RegOrUpdate';
import User from './pages/User';
import Recover1 from './pages/Recover1';
import Recover2 from './pages/Recover2';
import Delete1 from './pages/Delete1';
import Delete2 from './pages/Delete2';
import CreateOrEditList from './pages/CreateOrEditList';
import SavedListItems from './pages/SavedListItems';
import ShoppingLists from './pages/ShoppingLists';
import Checklist from './pages/Checklist';
import AddOrEditItem from './pages/AddOrEditItem';

function App() {

  const [theme, setTheme] = useState(getThemeColor()._value);
  const [loading, setLoading] = useState(true);
  const [route, setAppRoute] = useState(getRoute()._value);

  const token = null;
  
  useEffect(() => {
    getThemeColor().subscribe(setTheme);
    getRoute().subscribe(setAppRoute);
    getData().subscribe(data => {
      if (data) {
        setLoading(false);
      }
    });
    setTimeout(() => {
      if (!token) {
        setRoute('Login')
      }
      setLoading(false);
    }, 3000)
  }, [getThemeColor(), getRoute(), getData()]);

  function router() {
    switch(route) {
      case 'Login': 
        return <Login />;
      case 'Register New User':
        return <RegOrUpdate update={false} />;
      case 'User':
        return <User />;
      case 'Update Credentials':
        return <RegOrUpdate update={true} />;
      case 'Recover Credentials':
        return <Recover1 />;
      case 'Validate Credentials':
        return <Recover2 />;
      case 'Delete User Account':
        return <Delete1 />;
      case 'Confirm User Delete':
        return <Delete2 />;
      case 'Create Shopping List':
        return <CreateOrEditList edit={false} />;
      case 'Shopping List Items':
        return <SavedListItems />;
      case 'Shopping Lists':
        return <ShoppingLists />;
      case 'Shopping List Name':
        return <CreateOrEditList edit={true} />;
      case 'Checklist':
        return <Checklist />;
      case 'Add Shopping Item':
        return <AddOrEditItem edit={false} />;
      case 'Edit Shopping Item':
        return <AddOrEditItem edit={true} />;
    }
  }

  return (
    <>
      {!loading && <Header headline={route} />}
      <LinearGradient colors={['#fff', theme]} style={globalStyles.bodyContainer}>
          { loading && <Startup /> }
          { !loading && router() }
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
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 6,
    borderWidth: 3,
    width: '85%',
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 16,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 16
  },
  fieldHeadingText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  }
});