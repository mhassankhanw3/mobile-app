import React from 'react';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  Layout,
  StyleService,
  Text,
} from '@ui-kitten/components';
import {Signup} from './components/Signup';
import {Login} from './components/Login';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthContext from './context/Main';
import Dashboard from './components/Dashboard';

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Signup"
        component={Signup}
        // options={{title: 'Welcome'}}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  </NavigationContainer>

  // <Layout
  //   style={{
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     padding: 10,
  //     width: '100%',
  //   }}>
  //   <Text style={styles.head}>Welcome to Rishta App!</Text>
  //   <Signup />
  // </Layout>
);

const styles = StyleSheet.create({
  head: {
    textAlign: 'center',
    width: '100%',
    margin: 'auto',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default () => (
  <AuthContext>
    <ApplicationProvider {...eva} theme={eva.light}>
      <App />
    </ApplicationProvider>
  </AuthContext>
);
