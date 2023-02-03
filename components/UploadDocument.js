import React, {useState, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  Pressable,
  Layout,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import getPath from '@flyerhq/react-native-android-uri-path';
// import * as FilePicker from 'react-native-file-picker';
import DocumentPicker, {types} from 'react-native-document-picker';

export default function UploadDocument({title, state, setState}) {
  const [documentResponse, setDocumentResponse] = useState([]);
  const [mainUrl, setMainUrl] = useState('');

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf],
      });
      setDocumentResponse(response);
      const reference = storage().ref(response[0].name);
      const path = getPath(response[0].uri);
      await reference.putFile(path);
      const url = await reference.getDownloadURL();
      setMainUrl(url);
      // setMainUrl(url);
      setState({...state, documentUrl: url});
      console.log(state, 'state');
      // console.log(response, 'response');
    } catch (err) {
      console.warn(err);
    }
  }, []);
  return (
    <View style={{marginTop: 20}}>
      <Text style={styles.filesText}>{title}</Text>
      <View style={styles.dropfiles}>
        <Text style={styles.dragtxt}>Drop Files here or</Text>
        <Text style={{textAlign: 'center', fontSize: 12, color: '#dc2626'}}>
          {mainUrl}
        </Text>
        {documentResponse.map((file, index) => (
          <Text
            key={index.toString()}
            style={styles.uri}
            numberOfLines={1}
            ellipsizeMode={'middle'}>
            <Text style={styles.upload}>Uploaded:</Text> {file?.name}
          </Text>
        ))}

        {/* {photo ? (
        <Image style={{width: 300, height: 300}} source={{uri: photo}} />
      ) : (
        ''
      )} */}
        <Pressable style={styles.button} onPress={handleDocumentSelection}>
          <Text style={styles.text}>Select Files</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 50,
    elevation: 1,
    backgroundColor: '#ffd909',
    width: 140,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  filesText: {
    fontWeight: 600,
    fontSize: 16,
    color: '#9d9c9b',
  },
  dropfiles: {
    marginTop: 6,
    backgroundColor: '#f8fafc',
    padding: 50,
    borderRadius: 6,
    borderStyle: 'dashed',
    borderColor: '#e2e8f0',
    borderWidth: 1,
  },
  dragtxt: {
    textAlign: 'center',
    color: '#9d9c9b',
    fontWeight: 600,
  },
  uri: {
    textAlign: 'center',
    color: '#dc2626',
    fontWeight: 600,
    marginBottom: 10,
    marginTop: 10,
  },
  upload: {
    color: '#16a34a',
  },
});
