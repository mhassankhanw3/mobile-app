import React from 'react';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  Layout,
  StyleService,
  Text,
  IconRegistry,
} from '@ui-kitten/components';
import {useMainContext} from './context/Main';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {Signup} from './components/Signup';
import {Login} from './components/Login';
import {StyleSheet, View, Pressable, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthContext from './context/Main';
import Dashboard from './components/Dashboard';
import Registeration from './components/Registeration';
import {Form} from './components/Form';

const Stack = createNativeStackNavigator();

const App = () => {
  const {func} = useMainContext();
  const logout = navigation => {
    func.Logout(navigation);
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Form" component={Form} /> */}
        <Stack.Screen
          name="Registeration"
          component={Registeration}
          options={{
            headerRight: () => (
              <Pressable style={styles.button} onPress={logout}>
                <Text style={styles.textBtn}>Logout</Text>
              </Pressable>
            ),
          }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
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
};

const styles = StyleSheet.create({
  head: {
    textAlign: 'center',
    width: '100%',
    margin: 'auto',
    fontSize: 28,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 50,
    elevation: 1,
    backgroundColor: '#ffd909',
    width: 80,
    // marginLeft: 'auto',
    // marginRight: 'auto',
    textAlign: 'center',
  },
  textBtn: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default () => (
  <AuthContext>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <App />
    </ApplicationProvider>
  </AuthContext>
);
