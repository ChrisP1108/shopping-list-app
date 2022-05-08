import React, { useState, useEffect } from 'react';
import { useObservableState } from 'observable-hooks';

import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { getThemeColor, setThemeColor } from './observables/themeColor';
import { getRoute, setRoute } from './observables/router';
import { getData, setData } from './observables/data';

import { getToken, storeToken } from './middleware/storage';
import { httpGet } from './middleware/httpReq';

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

import { globalStyles } from './styles';

function App() {

  const [theme, setTheme] = useState(getThemeColor()._value);
  const [route, setAppRoute] = useState(getRoute()._value.current);
  const [error, setError] = useState({ isErr: false, msg: null });
  
  useEffect(() => {
    let loaded = false;
    getThemeColor().subscribe(setTheme);
    getRoute().subscribe(value => setAppRoute(value.current));
    httpGet('/users/user').then(res => {
      loaded = true;
      if (res.ok) {
        setData(res.data);
      }
      console.log(res);
      setTimeout(() => {
        if (res.ok) {
          setRoute('User')
        } else if (!res.ok && res.status){
          setRoute('Login')
        } else {
          setError({ isErr: true, msg: 'Error Connecting To Server'});
        }
      }, 3000)
    });
    setTimeout(() => {
      if (!loaded) {
        setError({ isErr: true, msg: 'Server Connection Timed Out'});
      }
    }, 12000)
  }, [getThemeColor(), getRoute(), setData()]);

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
      {route && <Header headline={route} />}
      <LinearGradient colors={['#fff', theme]} style={globalStyles.bodyContainer}>
          { !route && <Startup error={error} /> }
          { route && router() }
      </LinearGradient>
    </>
  )
}

export default App;