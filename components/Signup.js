import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input, Layout, Button, Modal, Spinner} from '@ui-kitten/components';
import {useMainContext} from '../context/Main';

export const Signup = ({navigation}) => {
  const [value, setValue] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {func, signUpLoading, setSignUpLoading, loading, setLoading} =
    useMainContext();
  const submitHandle = () => {
    if (func.newUser(email, password, navigation)) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation?.navigate('Registeration');
      }, 6000);
    }
  };
  const goLoginPage = () => {
    navigation?.navigate('Login');
  };
  return (
    <>
      <Layout
        style={{
          width: '100%',
          paddingTop: 50,
          backgroundColor: 'white',
          height: '100%',
        }}>
        <View>
          <Text style={styles.head}>Sign Up</Text>
        </View>
        <View style={{padding: 20}}>
          <View>
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
              Sign up
            </Button>
          </View>
          <View
            style={{
              width: '100%',
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              //   justifyContent: 'center',
            }}>
            <Text>Already have an account?</Text>
            <Text style={styles.logintxtlink} onPress={goLoginPage}>
              login
            </Text>
          </View>
        </View>
      </Layout>
      {loading ? (
        <Modal
          visible={loading}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setLoading(false)}>
          <View style={styles.controlContainer}>
            <Spinner status="control" size="giant" />
          </View>
        </Modal>
      ) : (
        ''
      )}
    </>
  );
};

const styles = StyleSheet.create({
  //   container: {
  //     padding: 10,
  //   },
  controlContainer: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#ffd909',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    marginTop: 15,
    width: '100%',
  },
  button: {
    textAlign: 'center',
    marginTop: 30,
  },
  head: {
    color: 'black',
    textAlign: 'center',
    width: '100%',
    margin: 'auto',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logintxt: {
    paddingTop: 10,
    color: 'black',
    textAlign: 'center',
    width: '100%',
    margin: 'auto',
  },
  logintxtlink: {
    fontSize: 16,
    color: '#2563eb',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginLeft: 10,
  },
  display: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //   loginLink: {
  //     padding: 10,
  //     width: '100%',
  //     maxWidth: '100%',
  //     // margin: 'auto',
  //     // textAlign: 'center',
  //     borderColor: 'black',
  //     borderWidth: 1,
  //     display: 'flex',
  //     flexDirection: 'column',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
});
