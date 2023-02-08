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
import {Spinner} from '@ui-kitten/components';
import * as ImagePicker from 'react-native-image-crop-picker';
export default function UploadImg({
  imgUrlResponse,
  setImgUrlResponse,
  newImgUrlResponse,
  setNewImgUrlResponse,
}) {
  const [photo, setPhoto] = useState('');
  const [newPhoto, setNewPhoto] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChoose = async () => {
    let imageList = [];
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: true,
      includeExif: true,
      forceJpg: true,
      compressImageQuality: 0.8,
      maxFiles: 2,
      mediaType: 'photo',
      includeBase64: true,
    }).then(async response => {
      console.log(response, 'response');
      response.map(async image => {
        // imageList.push({
        //   path: image.path,
        // });
        setPhoto(image.path);
        console.log(image.path, 'image.path');
        setLoading(true);
        const reference = storage().ref(image.path);
        reference.writeToFile(image.path);
        await reference.putFile(image.path);
        const url = await reference.getDownloadURL();
        setImgUrlResponse(url);
        setTimeout(() => {
          setImgUrlResponse(url);
          setLoading(false);
        }, 1000);
      });
    });
    // ImagePicker.openPicker({
    //   multiple: true,
    //   waitAnimationEnd: true,
    //   includeExif: true,
    //   forceJpg: true,
    //   compressImageQuality: 0.8,
    //   maxFiles: 10,
    //   mediaType: 'photo',
    //   includeBase64: true,
    // })
    //   .then(response => {
    //     console.log(response, 'response');
    //     response.map(image => {
    //       setPhoto(image.path, image.path);
    //     });
    //   })
    //   .catch(e => {
    //     console.log('Error', e.message, e);
    //   });

    //   .then(async res => {
    //     // setImgUrlResponse(res);
    //     setPhoto(res.path);
    //     setLoading(true);
    //     const reference = storage().ref(res.path);
    //     const url = await reference.putFile(res.path);
    //     // const url = await reference.getDownloadURL();
    //     setImgUrlResponse(url);
    //     setTimeout(() => {
    //       setImgUrlResponse(url);
    //       setLoading(false);
    //     }, 1000);
    //     console.log(result);
    //     console.log(url);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // ImagePicker.openPicker({
    //   multiple: true,
    // }).then(images => {
    //   console.log(images);
    // });
    // const newImgResult = await ImagePicker.launchImageLibrary(options);
    // setNewPhoto(newImgResult.assets[0].uri);
    // setLoading(true);
    // const newImgReference = storage().ref(result.assets[0].fileName);
    // await newImgReference.putFile(newImgResult.assets[0].uri);
    // const newImgurl = await newImgReference.getDownloadURL();
    // setNewImgUrlResponse(newImgurl);
    // setTimeout(() => {
    //   setNewImgUrlResponse(newImgurl);
    //   setLoading(false);
    // }, 1000);
    // console.log(newImgResult);
    // console.log(newImgurl);
  };

  return (
    <View>
      <Text style={styles.filesText}>2 Latest Pictures</Text>
      <View style={styles.dropfiles}>
        <Text style={styles.dragtxt}>Drop Files here or</Text>
        {/* <Text style={{textAlign: 'center', fontSize: 12, color: '#dc2626'}}>
          {newImgUrl}
        </Text> */}
        {/* {newImgUrl
          ?  */}
        {loading ? (
          <View
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <Spinner size="small" status="warning" />
          </View>
        ) : (
          imgUrlResponse &&
          photo && (
            <View
              key={photo.toString()}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}>
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
            </View>
          )
        )}

        {/* <Pressable style={styles.button} onPress={handleChoose}>
          <Text style={styles.text}>Select Files</Text>
        </Pressable> */}
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
