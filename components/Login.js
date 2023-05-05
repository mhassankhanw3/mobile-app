import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
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
        <View
          style={{
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 10,
          }}>
          <Image
            style={{
              width: 170,
              height: 130,
              marginLeft: 'auto',
              marginRight: 'auto',
              // marginTop: 10,
            }}
            source={{
              uri: 'https://d21b0h47110qhi.cloudfront.net/image/logo-copy-0jik8m8VSXvJcvH.png',
            }}
          />
        </View>
        <View>
          <Text style={styles.head}>Login</Text>
        </View>
        <View style={{paddingLeft: 20, paddingRight: 20}}>
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
              Login
            </Button>
          </View>
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
        </View>
      </Layout>
    </ScreenNavigator>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 50,
    backgroundColor: 'white',
    height: '100%',
    // borderWidth: 1,
    // borderColor: 'black',
  },
  head: {
    color: 'black',
    textAlign: 'center',
    width: '100%',
    margin: 'auto',
    fontSize: 24,
    fontWeight: 'bold',
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
