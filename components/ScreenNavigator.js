import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useMainContext} from '../context/Main';
import {useNavigation} from '@react-navigation/native';

export default function ScreenNavigator({children}) {
  const {user} = useMainContext();
  const navigation = useNavigation();
  useEffect(() => {
    if (!user) navigation?.navigate('Login');
  }, [user]);

  return <View>{children}</View>;
}
