import React, {useState, createContext, useContext, useEffect} from 'react';
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
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState('');
  const [logout, setLogout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const newUser = async (email, password, navigation) => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('User account created & signed in!');
        // navigation.navigate('Login');
        console.log(res, 'res');
        // return true;
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        // navigation.navigate('Signup');

        console.error(error);
        // return false;
      });
  };
  const signIn = async (email, password, navigation) => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('Registeration');
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
  // useEffect(async () => {
  //   await firebase.initializeApp(config);
  // }, []);
  useEffect(() => {
    // You can await here
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }
    // ...
  }, []);
  const Form = async state => {
    await firestore()
      .collection('Registration')
      .doc(user.uid)
      .set({
        name: state.name,
        selectedIndex: state.selectedIndex,
        date: state.date,
        age: state.age,
        defaultSingle: state.defaultSingle,
        noOfChildren: state.noOfChildren,
        ageOfChildren: state.ageOfChildren,
        livingWith: state.livingWith,
        height: state.height,
        complexion: state.complexion,
        cast: state.cast,
        sect: state.sect,
        nationality: state.nationality,
        education: state.education,
        institute: state.institute,
        companyName: state.companyName,
        salary: state.salary,
        fatherName: state.fatherName,
        fatherOrigin: state.fatherOrigin,
        fatherOccupations: state.fatherOccupations,
        motherName: state.motherName,
        motherOrigin: state.motherOrigin,
        motherOccupation: state.motherOccupation,
        noOfBrothers: state.noOfBrothers,
        noOfMarriedBrothers: state.noOfMarriedBrothers,
        noOfSisters: state.noOfSisters,
        noOfMarriedSisters: state.noOfMarriedSisters,
        familyStatus: state.familyStatus,
        streetaddress: state.streetaddress,
        addressLineTwo: state.addressLineTwo,
        city: state.city,
        region: state.region,
        postalCode: state.postalCode,
        selectedCountry: state.selectedCountry,
        selectedHouse: state.selectedHouse,
        selectedRent: state.selectedRent,
        yards: state.yards,
        phoneNumber: state.phoneNumber,
        mobileNumber: state.mobileNumber,
        email: state.email,
        nationality: state.nationality,
        familyStatus: state.familyStatus,
        requirAge: state.requirAge,
        requirHeight: state.requirHeight,
        requirStatus: state.requirStatus,
        requirChild: state.requirChild,
        requirComplexion: state.requirComplexion,
        requirEducation: state.requirEducation,
        requireCast: state.requireCast,
        requirSect: state.requirSect,
        requirArea: state.requirArea,
        requirFamilyStatus: state.requirFamilyStatus,
        requirAnyOtherRequir: state.requirAnyOtherRequir,
        requrHearAbout: state.requrHearAbout,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  const Logout = async (email, password, navigation) => {
    await auth()
      .signOut(email, password)
      .then(res => {
        console.log('User signed out!');
        console.log(res);
        navigation?.navigate('Login');
      })
      .catch(error => {
        navigation?.navigate('Registeration');
        console.error(error);
      });
  };

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  // unsubscribe on unmount

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
        user: user,
        setUser: setUser,
        func: {
          newUser,
          signIn,
          Form,
          Logout,
          // logOut,
        },
      }}>
      {children}
    </MyContext.Provider>
  );
};
