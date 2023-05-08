import React, {useState, createContext, useContext, useEffect} from 'react';
// import firebase from '../firebase/config';
import emailjs, {send} from 'emailjs-com';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  Image,
} from 'react-native';
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
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const newUser = async (email, password, navigation) => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        // setLoading(true);
        console.log('User account created & signed in!');
        console.log(res, 'res');

        // setLoading(false);
        // return true;
      })
      .catch(error => {
        setLoading(false);
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          Alert.alert(
            'Error',
            'That email address is already in use!',

            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          Alert.alert(
            'Error',
            'That email address is invalid!',

            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
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
        // Alert.alert(
        //   'Congratulations',
        //   'User account created & signed in!',

        //   [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        // );
        navigation?.navigate('Registeration');
      })
      .catch(error => {
        Alert.alert(
          'Something went wrong!',
          'Please check your email and password',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        );
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          Alert.alert('Error', 'That email address is already in use!', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          Alert.alert('Error', 'That email address is invalid!', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
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
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
      const storage = firebase.storage();
    }
  }, []);
  const Form = async (
    state,
    fileUrlResponse,
    documentUrlResponse,
    imgUrlResponse,
    setState,
    setFileUrlResponse,
    setDocumentUrlResponse,
    setImgUrlResponse,
    // newImgUrlResponse,
  ) => {
    if (imgUrlResponse && fileUrlResponse && documentUrlResponse) {
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
          imgUrlResponse: imgUrlResponse,
          fileUrlResponse: fileUrlResponse,
          documentUrlResponse: documentUrlResponse,
        })
        .then(res => {
          // state;
          // imgUrlResponse;
          // fileUrlResponse;
          // documentUrlResponse;
          Alert.alert('Submit', 'Your Form has been submitted', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
          console.log('User added!');
          setState('');
          setImgUrlResponse('');
          setFileUrlResponse('');
          setDocumentUrlResponse('');
          // sendEmail();
          // setLoading(true);
        })
        .catch(error => {
          Alert.alert('Error', 'Please fill the required Fields', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
          console.log(error, 'error');
        });
    } else {
      console.log(error, 'error');
    }
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

  // function sendEmail() {
  //   const templateParams = {
  //     name: 'Taha',
  //     notes: 'Check this out!',
  //   };

  //   emailjs.send('service_3hxhuca', 'template_5aqs914', templateParams).then(
  //     function (response) {
  //       console.log('SUCCESS!', response.status, response.text);
  //     },
  //     function (error) {
  //       console.log('FAILED...', error);
  //     },
  //   );
  // }

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
        pageLoading: pageLoading,
        setPageLoading: setPageLoading,
        setLoading: setLoading,
        logout: logout,
        setLogout: setLogout,
        user: user,
        setUser: setUser,
        message: message,
        setMessage: setMessage,
        visible: visible,
        setVisible: setVisible,
        signUpLoading: signUpLoading,
        setSignUpLoading: setSignUpLoading,
        func: {
          newUser,
          signIn,
          Form,
          Logout,
          // sendEmail,
        },
      }}>
      {children}
    </MyContext.Provider>
  );
};
