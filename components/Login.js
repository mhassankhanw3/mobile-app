import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Input, Layout, Button} from '@ui-kitten/components';
import {useMainContext} from '../context/Main';
import ScreenNavigator from './ScreenNavigator';

export const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {func, user} = useMainContext();

  const submitHandle = () => {
    func.signIn(email, password, navigation);
    // navigation.navigate('Dashboard');
  };
  // if (user) {
  //   navigation.navigate('Registeration');
  // } else {
  //   navigation.navigate('Login');
  // }
  return (
    <ScreenNavigator>
      <Layout style={styles.container}>
        <Input
          style={styles.input}
          placeholder="Enter your Email"
          value={email}
          onChangeText={nextValue => setEmail(nextValue)}
        />
        <Input
          style={styles.input}
          placeholder="Enter your Password"
          value={password}
          onChangeText={nextValue => setPassword(nextValue)}
        />
        <Button style={styles.button} onPress={submitHandle}>
          Login
        </Button>
        <View>
          <Text>or sign up</Text>
        </View>
      </Layout>
    </ScreenNavigator>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    border: '1px',
    // borderWidth: 1,
    // borderColor: 'black',
  },
  input: {
    marginTop: 15,
    width: '100%',
  },
  button: {
    textAlign: 'center',
    marginTop: 30,
  },
});
