import React, {useState, createContext, useContext} from 'react';
// import firebase from '../firebase/config';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import firestore from '@react-native-firebase/firestore';
import keys from '../android/app/google-services.json';

const MyContext = createContext();
export const useMainContext = () => useContext(MyContext);
export default MainContextProvider = props => {
  const [email, setEmail] = useState('');
  const [logout, setLogout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const newUser = async (email, password, navigation) => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('Login');
        // return true;
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        navigation.navigate('Signup');

        console.error(error);
        // return false;
      });
  };
  const signIn = async (email, password, navigation) => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('PersonalInfo');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        navigation.navigate('Login');
        console.error(error);
      });
  };
  // let newKey = keys.project_info.project_id;
  const config = {
    clientId:
      '1020581952427-6jh87650pl54bkh6d162d4kumjfur14n.apps.googleusercontent.com',
    appId: '1:1020581952427:android:18cddae179af29c0fbb0ee',
    apiKey: 'AIzaSyAwmTenNm-lvxpQnTLKtT4FxaNR0Ccruiw',
    databaseURL: 'x',
    storageBucket: 'mobileapp-88504.appspot.com',
    messagingSenderId: 'x',
    projectId: 'mobileapp-88504',

    // enable persistence by adding the below flag
    persistence: true,
  };

  const Form = async state => {
    await firebase.initializeApp(config);
    await firestore()
      .collection('Registration')
      .add({
        name: state.name,
        age: state.age,
        noOfChildren: state.noOfChildren,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  // const signIn = async (email, password) => {
  //   await firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       console.log(userCredential, "users");
  //       const user = userCredential.user;
  //       setLoading(true);

  //       setError(false);
  //       setSuccess(true);
  //       router.push("/login/Dashboard");
  //       // setLoading(false);
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorMessage = error.message;
  //       setError(errorMessage);
  //       setSuccess(false);
  //       setLoading(false);
  //       router.push("/login");
  //       // console.log(error.message, "error");
  //       const errorCode = error.code;
  //       console.log(errorCode, "errorCode");

  //       console.log(errorMessage, "errorMessage");
  //       // ..
  //     });
  // };
  // const logOut = async (email, password) => {
  //   const auth = getAuth();
  //   signOut(auth)
  //     .then((res) => {
  //       console.log(res);
  //       // Sign-out successful.
  //       setLogout(message.success("Loagout"));
  //       router.push("/login");
  //     })
  //     .catch((error) => {
  //       // An error happened.
  //       setLogout(false);
  //       router.push("/");
  //     });
  // };
  const {children} = props;
  return (
    <MyContext.Provider
      value={{
        error: error,
        success: success,
        setSuccess: setSuccess,
        loading: loading,
        setLoading: setLoading,
        logout: logout,
        setLogout: setLogout,
        func: {
          newUser,
          signIn,
          Form,
          // logOut,
        },
      }}>
      {children}
    </MyContext.Provider>
  );
};
