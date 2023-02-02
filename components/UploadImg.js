import React, {useState} from 'react';
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

export default function UploadImg() {
  const [photo, setPhoto] = useState('');
  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };
  const handleChoose = async () => {
    const result = await ImagePicker.launchImageLibrary(options);
    setPhoto(result.assets[0].uri);
  };
  return (
    <View>
      <Text style={styles.filesText}>2 Latest Pictures</Text>
      <View style={styles.dropfiles}>
        <Text style={styles.dragtxt}>Drop Files here or</Text>
        {photo ? (
          <Image style={{width: 300, height: 300}} source={{uri: photo}} />
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
