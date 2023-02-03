import React, {useState} from 'react';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  Pressable,
  Layout,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

export default function UploadImg({state, setState}) {
  const [photo, setPhoto] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };
  const handleChoose = async () => {
    const result = await ImagePicker.launchImageLibrary(options);
    setPhoto(result.assets[0].uri);
    const reference = storage().ref(result.assets[0].fileName);
    // const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;
    await reference.putFile(result.assets[0].uri);
    const url = await reference.getDownloadURL();
    setNewImgUrl(url);
    setState({...state, imgUrl: url});
    console.log(result);
    console.log(url);
  };

  return (
    <View>
      <Text style={styles.filesText}>2 Latest Pictures</Text>
      <View style={styles.dropfiles}>
        <Text style={styles.dragtxt}>Drop Files here or</Text>
        <Text style={{textAlign: 'center', fontSize: 12, color: '#dc2626'}}>
          {newImgUrl}
        </Text>
        {photo ? (
          <Image
            style={{
              width: 200,
              height: 200,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 10,
            }}
            source={{uri: photo}}
          />
        ) : (
          ''
        )}
        <Pressable style={styles.button} onPress={handleChoose}>
          <Text style={styles.text}>Select Files</Text>
        </Pressable>
      </View>
    </View>
  );
}

// onPress={async () => {
//   // path to existing file on filesystem
//   const pathToFile = ${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png;
//   // uploads file
//   await reference.putFile(pathToFile);
// }}

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
});
