import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Input, Layout, Button} from '@ui-kitten/components';
import {useMainContext} from '../context/Main';
import ScreenNavigator from './ScreenNavigator';
// import {useNavigation} from '@react-navigation/native';
export const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {func, user} = useMainContext();

  const submitHandle = () => {
    func.signIn(email, password, navigation);
  };
  const goSignUp = () => {
    navigation?.navigate('Signup');
  };
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
        <View
          style={{
            marginTop: 10,
            textAlign: 'center',
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          <Text style={{textAlign: 'center'}}>do not have an account?</Text>
          <Text
            style={{
              textAlign: 'center',
              textDecorationLine: 'underline',
              color: '#2563eb',
              fontSize: 16,
            }}
            onPress={goSignUp}>
            sign up
          </Text>
        </View>
      </Layout>
    </ScreenNavigator>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    border: '1px',
    backgroundColor: 'white',
    height: '100%',
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
