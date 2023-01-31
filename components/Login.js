import React from 'react';
import {StyleSheet} from 'react-native';
import {Input, Layout, Button} from '@ui-kitten/components';
import {useMainContext} from '../context/Main';

export const Login = ({navigation}) => {
  const [value, setValue] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {func} = useMainContext();

  const submitHandle = () => {
    func.newUser(email, password);
    navigation.navigate('Dashboard');
  };

  return (
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
    </Layout>
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
