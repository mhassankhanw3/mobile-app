import React, {useState, createContext, useContext} from 'react';
// import firebase from '../firebase/config';
import auth, {firebase} from '@react-native-firebase/auth';
// import {Login} from '../components/Login';
// import Dashboard from '../components/Dashboard';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const MyContext = createContext();
export const useMainContext = () => useContext(MyContext);
export default MainContextProvider = (props, {navigation}) => {
  const [email, setEmail] = useState('');
  const [logout, setLogout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const newUser = async (email, password) => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  const signIn = async (email, password) => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('Dashboard');
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
          // logOut,
        },
      }}>
      {children}
    </MyContext.Provider>
  );
};
