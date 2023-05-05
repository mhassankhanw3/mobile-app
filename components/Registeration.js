import React, {useState, useRef, useEffect} from 'react';
import emailjs from 'emailjs-com';
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
  Layout,
  Select,
  SelectItem,
  IndexPath,
  Input,
  Datepicker,
  Icon,
  Button,
  Spinner,
  Card,
  Avatar,
  Modal,
} from '@ui-kitten/components';
import moment from 'moment';
import {useMainContext} from '../context/Main';
import firestore from '@react-native-firebase/firestore';
import UploadImg from './UploadImg';
import data from '../country.json';
import {Note} from './Note';
import UploadFile from './UploadFile';
import ScreenNavigator from './ScreenNavigator';
import {NavigationContainer} from '@react-navigation/native';
import UploadDocument from './UploadDocument';
const imageUrl =
  'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg';
export default function Registeration() {
  const [selectedIndex, setSelectedIndex] = React.useState('Gender');
  const [defaultSingle, setDefaultSingle] = React.useState('Single');
  const [requirGender, setRequirGender] = React.useState('Gender');
  const [value, setValue] = React.useState('');
  const [selectedCountry, setSelectedCountry] = useState('Pakistan');
  const [selectedHouse, setSelectedHouse] = useState('Select');
  const [selectedRent, setSelectedRent] = useState('Select');
  const [requrHearAbout, setRequrHearAbout] = useState('Newspaper Ad');
  const [fileUrlResponse, setFileUrlResponse] = useState('');
  const [documentUrlResponse, setDocumentUrlResponse] = useState('');
  const [imgUrlResponse, setImgUrlResponse] = useState('');
  const [newImgUrlResponse, setNewImgUrlResponse] = useState('');
  const [isNotDisabled, setIsNotDisabled] = useState(true);

  // const [requrHearAbout, setRequrHearAbout] = useState('Newspaper Ad');
  // const [date, setDate] = React.useState(new Date());
  const [state, setState] = useState({
    name: '',
    selectedIndex: '',
    date: new Date(),
    age: '',
    defaultSingle: '',
    noOfChildren: '',
    ageOfChildren: '',
    livingWith: '',
    height: '',
    complexion: '',
    cast: '',
    sect: '',
    education: '',
    institute: '',
    occupation: '',
    companyName: '',
    salary: '',
    fatherName: '',
    fatherOrigin: '',
    fatherOccupations: '',
    motherName: '',
    motherOrigin: '',
    motherOccupation: '',
    noOfBrothers: '',
    noOfMarriedBrothers: '',
    noOfSisters: '',
    noOfMarriedSisters: '',
    streetaddress: '',
    addressLineTwo: '',
    city: '',
    region: '',
    postalCode: '',
    selectedCountry: '',
    selectedHouse: '',
    yards: '',
    selectedRent: '',
    phoneNumber: '',
    mobileNumber: '',
    email: '',
    nationality: '',
    familyStatus: '',
    requirAge: '',
    requirHeight: '',
    requirStatus: '',
    requirChild: '',
    requirComplexion: '',
    requirEducation: '',
    requireCast: '',
    requirSect: '',
    requirArea: '',
    requirFamilyStatus: '',
    requirAnyOtherRequir: '',
    requrHearAbout: '',
  });

  const {
    func,
    pageLoading,
    setPageLoading,
    signUpLoading,
    setSignUpLoading,
    loading,
    setLoading,
    message,
    setMessage,
  } = useMainContext();

  const onSubmit = () => {
    // setLoading(true);

    func.Form(state, fileUrlResponse, documentUrlResponse, imgUrlResponse);
    sendEmail();
  };

  function sendEmail() {
    const emailData = {
      from_name: 'info.perfectjodi@gmail.com',
      to_email: 'LKperfectjodi@gmail.com',
      message: `name: ${state.name},
      selectedIndex: ${state.selectedIndex},
      date: ${state.date},
      age: ${state.age},
      defaultSingle: ${state.defaultSingle},
      noOfChildren: ${state.noOfChildren},
      ageOfChildren: ${state.ageOfChildren},
      livingWith: ${state.livingWith},
      height: ${state.height},
      complexion: ${state.complexion},
      cast: ${state.cast},
      sect: ${state.sect},
      education: ${state.education},
      institute: ${state.institute},
      companyName: ${state.companyName},
      salary: ${state.salary},
      fatherName: ${state.fatherName},
      fatherOrigin: ${state.fatherOrigin},
      fatherOccupations: ${state.fatherOccupations},
      motherName: ${state.motherName},
      motherOrigin: ${state.motherOrigin},
      motherOccupation: ${state.motherOccupation},
      noOfBrothers: ${state.noOfBrothers},
      noOfMarriedBrothers: ${state.noOfMarriedBrothers},
      noOfSisters: ${state.noOfSisters},
      noOfMarriedSisters: ${state.noOfMarriedSisters},
      streetaddress: ${state.streetaddress},
      addressLineTwo: ${state.addressLineTwo},
      city: ${state.city},
      region: ${state.region},
      postalCode: ${state.postalCode},
      selectedCountry: ${state.selectedCountry},
      selectedHouse: ${state.selectedHouse},
      selectedRent: ${state.selectedRent},
      yards: ${state.yards},
      phoneNumber: ${state.phoneNumber},
      mobileNumber: ${state.mobileNumber},
      email: ${state.email},
      nationality: ${state.nationality},
      familyStatus: ${state.familyStatus},
      requirAge: ${state.requirAge},
      requirHeight: ${state.requirHeight},
      requirStatus: ${state.requirStatus},
      requirChild: ${state.requirChild},
      requirComplexion: ${state.requirComplexion},
      requirEducation: ${state.requirEducation},
      requireCast: ${state.requireCast},
      requirSect: ${state.requirSect},
      requirArea: ${state.requirArea},
      requirFamilyStatus: ${state.requirFamilyStatus},
      requirAnyOtherRequir: ${state.requirAnyOtherRequir},
      requrHearAbout: ${state.requrHearAbout},
      imgUrlResponse: ${imgUrlResponse},
      fileUrlResponse: ${fileUrlResponse},
      documentUrlResponse: ${documentUrlResponse}
      `,
    };
    try {
      emailjs
        .send(
          'service_nbl5wjp',
          'template_dvkllfe',
          emailData,
          'jNjVjRXmxUbcbWpkB',
        )
        .then(
          result => {
            console.log(result, 'result');
            console.log(result.text);
          },
          error => {
            console.log(error.text);
          },
        );
    } catch (err) {
      console.log(err, 'catch error');
    }
  }
  const logout = navigation => {
    func.Logout(navigation);
  };
  const CalendarIcon = props => <Icon {...props} name="calendar" />;
  const referenceData = [
    'Newspaer Ad',
    'Social Media',
    'SMS',
    'Google Seacrh',
    'Reference',
  ];
  const marriredStatus = ['Single', 'Married', 'Divorced'];

  // const form = useRef();
  // const sendEmailemail = () => {

  // };

  return (
    <>
      <ScreenNavigator>
        <ScrollView>
          <Layout style={styles.container} level="1">
            <View
              style={{
                width: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 30,
              }}>
              <Image
                style={{
                  width: 300,
                  height: 160,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 10,
                }}
                source={{
                  uri: 'https://d21b0h47110qhi.cloudfront.net/image/logo-copy-0jik8m8VSXvJcvH.png',
                }}
              />
            </View>
            <View style={styles.heading}>
              <Text style={styles.headText}>Fill up the</Text>
              <Text style={styles.headregister}>REGISTRATION FORM</Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  marginTop: 10,
                }}>
                <Text>
                  "<Text style={{color: '#c02b0a', fontSize: 10}}>+</Text>"
                </Text>
                <Text style={{marginLeft: 2}}>indicates required fields</Text>
              </View>
            </View>
            <View>
              <Text style={styles.mainHead}>PERSONAL INFORMATION</Text>
              <View style={styles.border}></View>
            </View>

            <View>
              <Select
                label="Gender *"
                value={
                  selectedIndex === 'Gender'
                    ? 'Gender'
                    : selectedIndex === 0
                    ? 'Male'
                    : 'Female'
                }
                onSelect={index => setSelectedIndex(index.row)}
                style={{marginTop: 20}}>
                <SelectItem title="Male" />
                <SelectItem title="Female" />
              </Select>
              <Input
                label="Name"
                style={styles.input}
                placeholder="Enter your Name"
                value={state.name}
                onChangeText={nextValue =>
                  setState({...state, name: nextValue})
                }
              />
              <Datepicker
                // max={moment().subtract(18, 'years')}
                min={new Date(1970, 0, 0)}
                max={new Date(2005, 0, 0)}
                style={styles.input}
                label="Date of Birth"
                placeholder="Pick Date"
                date={state.date}
                onSelect={nextDate => setState({...state, date: nextDate})}
                accessoryRight={CalendarIcon}
              />
              <Input
                label="Age"
                style={styles.input}
                placeholder="Age"
                value={state.age}
                onChangeText={nextValue => setState({...state, age: nextValue})}
              />
              <Select
                label="Marital Status *"
                placeholder="Single"
                value={marriredStatus[defaultSingle]}
                onSelect={index => setDefaultSingle(index.row)}
                style={{marginTop: 20}}>
                {marriredStatus.map(i => (
                  <SelectItem key={i} title={i} />
                ))}
              </Select>
              <Input
                label="Number of Children"
                style={styles.input}
                value={state.noOfChildren}
                onChangeText={nextValue =>
                  setState({...state, noOfChildren: nextValue})
                }
              />
              <Input
                label="Age of Children"
                style={styles.input}
                value={state.ageOfChildren}
                onChangeText={nextValue =>
                  setState({...state, ageOfChildren: nextValue})
                }
              />
              <Input
                label="Living With"
                style={styles.input}
                value={state.livingWith}
                onChangeText={nextValue =>
                  setState({...state, livingWith: nextValue})
                }
              />
              <Input
                label="Height"
                style={styles.input}
                value={state.height}
                onChangeText={nextValue =>
                  setState({...state, height: nextValue})
                }
              />
              <Input
                label="Complexion"
                style={styles.input}
                value={state.complexion}
                onChangeText={nextValue =>
                  setState({...state, complexion: nextValue})
                }
              />
              <Input
                label="Cast"
                style={styles.input}
                value={state.cast}
                onChangeText={nextValue =>
                  setState({...state, cast: nextValue})
                }
              />
              <Input
                label="Sect"
                style={styles.input}
                value={state.sect}
                onChangeText={nextValue =>
                  setState({...state, sect: nextValue})
                }
              />
              <Input
                label="Nationality"
                style={styles.nationality}
                value={state.nationality}
                onChangeText={nextValue =>
                  setState({...state, nationality: nextValue})
                }
              />
            </View>

            <View>
              <Text style={styles.mainHead}>
                EDUCATION & OCCUPATION DETAILS
              </Text>
              <View style={styles.border}></View>
              <View>
                <Input
                  label="Education"
                  style={styles.input}
                  value={state.education}
                  onChangeText={nextValue =>
                    setState({...state, education: nextValue})
                  }
                />
                <Input
                  label="Institute"
                  style={styles.input}
                  value={state.institute}
                  onChangeText={nextValue =>
                    setState({...state, institute: nextValue})
                  }
                />
                <Input
                  label="Occupation"
                  style={styles.input}
                  value={state.occupation}
                  onChangeText={nextValue =>
                    setState({...state, occupation: nextValue})
                  }
                />
                <Input
                  label="Company Name"
                  style={styles.input}
                  value={state.companyName}
                  onChangeText={nextValue =>
                    setState({...state, companyName: nextValue})
                  }
                />
                <Input
                  label="Salary"
                  style={styles.input}
                  value={state.salary}
                  onChangeText={nextValue =>
                    setState({...state, salary: nextValue})
                  }
                />
              </View>
            </View>

            <View>
              <Text style={styles.mainHead}>Family DETAILS</Text>
              <View style={styles.border}></View>
              <View>
                <Input
                  label="Father's Name"
                  style={styles.input}
                  value={state.fatherName}
                  onChangeText={nextValue =>
                    setState({...state, fatherName: nextValue})
                  }
                />
                <Input
                  label="Father's Origin"
                  style={styles.input}
                  value={state.fatherOrigin}
                  onChangeText={nextValue =>
                    setState({...state, fatherOrigin: nextValue})
                  }
                />
                <Input
                  label="Father Occupations"
                  style={styles.input}
                  value={state.fatherOccupations}
                  onChangeText={nextValue =>
                    setState({...state, fatherOccupations: nextValue})
                  }
                />
                <Input
                  label="Mother's Name"
                  style={styles.input}
                  value={state.motherName}
                  onChangeText={nextValue =>
                    setState({...state, motherName: nextValue})
                  }
                />
                <Input
                  label="Mother's Origin"
                  style={styles.input}
                  value={state.motherOrigin}
                  onChangeText={nextValue =>
                    setState({...state, motherOrigin: nextValue})
                  }
                />
                <Input
                  label="Mother Occupations"
                  style={styles.input}
                  value={state.motherOccupation}
                  onChangeText={nextValue =>
                    setState({...state, motherOccupation: nextValue})
                  }
                />
                <Input
                  label="Number of Brothers"
                  style={styles.input}
                  value={state.noOfBrothers}
                  onChangeText={nextValue =>
                    setState({...state, noOfBrothers: nextValue})
                  }
                />
                <Input
                  label="Number of Married Brothers"
                  style={styles.input}
                  value={state.noOfMarriedBrothers}
                  onChangeText={nextValue =>
                    setState({...state, noOfMarriedBrothers: nextValue})
                  }
                />
                <Input
                  label="Number of Sisters"
                  style={styles.input}
                  value={state.noOfSisters}
                  onChangeText={nextValue =>
                    setState({...state, noOfSisters: nextValue})
                  }
                />
                <Input
                  label="Number of Married Sisters"
                  style={styles.input}
                  value={state.noOfMarriedSisters}
                  onChangeText={nextValue =>
                    setState({...state, noOfMarriedSisters: nextValue})
                  }
                />
                <Input
                  label="Family Status"
                  style={styles.nationality}
                  value={state.familyStatus}
                  onChangeText={nextValue =>
                    setState({...state, familyStatus: nextValue})
                  }
                />
              </View>
            </View>

            <View>
              <Text style={styles.mainHead}>RESIDENTIAL DETAILS</Text>
              <View style={styles.border}></View>
              <View>
                <Input
                  label="Street Address"
                  style={styles.input}
                  value={state.streetaddress}
                  onChangeText={nextValue =>
                    setState({...state, streetaddress: nextValue})
                  }
                />
                <Input
                  label="Address Line 2"
                  style={styles.input}
                  value={state.addressLineTwo}
                  onChangeText={nextValue =>
                    setState({...state, addressLineTwo: nextValue})
                  }
                />
                <Input
                  label="City"
                  style={styles.input}
                  value={state.city}
                  onChangeText={nextValue =>
                    setState({...state, city: nextValue})
                  }
                />
                <Input
                  label="State / Province / Region"
                  style={styles.input}
                  value={state.region}
                  onChangeText={nextValue =>
                    setState({...state, region: nextValue})
                  }
                />
                <Input
                  label="ZIP Postal Code"
                  style={styles.input}
                  value={state.postalCode}
                  onChangeText={nextValue =>
                    setState({...state, postalCode: nextValue})
                  }
                />
                <Select
                  label="Country *"
                  value={
                    selectedCountry === 'United States'
                      ? 'United States'
                      : data[selectedCountry]
                  }
                  onSelect={index => setSelectedCountry(index.row)}
                  style={{marginTop: 20}}>
                  {data.map(i => (
                    <SelectItem key={i} title={i} />
                  ))}
                </Select>
                <Select
                  label="Flat or House *"
                  value={
                    selectedHouse === 'Select'
                      ? 'Select'
                      : selectedHouse === 0
                      ? 'Flat'
                      : 'House'
                  }
                  onSelect={index => setSelectedHouse(index.row)}
                  style={{marginTop: 20}}>
                  <SelectItem title="Flat" />
                  <SelectItem title="House" />
                </Select>
                <Input
                  label="Yards"
                  style={styles.input}
                  value={state.yards}
                  onChangeText={nextValue =>
                    setState({...state, yards: nextValue})
                  }
                />
                <Select
                  label="Rent or Own *"
                  value={
                    selectedRent === 'Select'
                      ? 'Select'
                      : selectedRent === 0
                      ? 'Rent'
                      : 'Own'
                  }
                  onSelect={index => setSelectedRent(index.row)}
                  style={{marginTop: 20}}>
                  <SelectItem title="Rent" />
                  <SelectItem title="own" />
                </Select>
                <Input
                  label="Phone Number"
                  style={styles.input}
                  value={state.phoneNumber}
                  onChangeText={nextValue =>
                    setState({...state, phoneNumber: nextValue})
                  }
                />
                <Input
                  label="Mobile Number"
                  style={styles.input}
                  value={state.mobileNumber}
                  onChangeText={nextValue =>
                    setState({...state, mobileNumber: nextValue})
                  }
                />
                <Input
                  label="Email"
                  placeholder="abc@abc.com"
                  style={styles.input}
                  value={state.email}
                  onChangeText={nextValue =>
                    setState({...state, email: nextValue})
                  }
                />
              </View>
            </View>

            <View>
              <Text style={styles.mainHead}>PARTNER REQUIRMENTS</Text>
              <View style={styles.border}></View>
              <View>
                <Select
                  label="Gender *"
                  value={
                    requirGender === 'Gender'
                      ? 'Gender'
                      : requirGender === 0
                      ? 'Male'
                      : 'Female'
                  }
                  onSelect={index => setRequirGender(index.row)}
                  style={{marginTop: 20}}>
                  <SelectItem title="Male" />
                  <SelectItem title="Female" />
                </Select>
                <Input
                  label="Age"
                  style={styles.input}
                  value={state.requirAge}
                  onChangeText={nextValue =>
                    setState({...state, requirAge: nextValue})
                  }
                />
                <Input
                  label="Height"
                  style={styles.input}
                  value={state.requirHeight}
                  onChangeText={nextValue =>
                    setState({...state, requirHeight: nextValue})
                  }
                />
                <Input
                  label="Would you accept child"
                  style={styles.input}
                  value={state.requirChild}
                  onChangeText={nextValue =>
                    setState({...state, requirChild: nextValue})
                  }
                />
                <Input
                  label="Complexion"
                  style={styles.input}
                  value={state.requirComplexion}
                  onChangeText={nextValue =>
                    setState({...state, requirComplexion: nextValue})
                  }
                />
                <Input
                  label="Education"
                  style={styles.input}
                  value={state.requirEducation}
                  onChangeText={nextValue =>
                    setState({...state, requirEducation: nextValue})
                  }
                />
                <Input
                  label="Cast"
                  style={styles.input}
                  value={state.requireCast}
                  onChangeText={nextValue =>
                    setState({...state, requireCast: nextValue})
                  }
                />
                <Input
                  label="Sect"
                  style={styles.input}
                  value={state.requirSect}
                  onChangeText={nextValue =>
                    setState({...state, requirSect: nextValue})
                  }
                />
                <Input
                  label="Area"
                  style={styles.input}
                  value={state.requirArea}
                  onChangeText={nextValue =>
                    setState({...state, requirArea: nextValue})
                  }
                />
                <Input
                  label="Family Status"
                  style={styles.input}
                  value={state.requirStatus}
                  onChangeText={nextValue =>
                    setState({...state, requirStatus: nextValue})
                  }
                />
                <Input
                  label="ANY OTHER REQUIRMENT"
                  style={styles.input}
                  value={state.requirAnyOtherRequir}
                  onChangeText={nextValue =>
                    setState({...state, requirAnyOtherRequir: nextValue})
                  }
                />
                <Select
                  label="How did you hear about us?"
                  placeholder="Newspaper Ad"
                  value={referenceData[requrHearAbout]}
                  onSelect={index => setRequrHearAbout(index.row)}
                  style={{marginTop: 20}}>
                  {referenceData.map(i => (
                    <SelectItem key={i} title={i} />
                  ))}
                </Select>
              </View>
            </View>

            <View style={{marginTop: 20}}>
              <Text style={styles.head}>NOTE:</Text>
              <View style={styles.textflex}>
                <View style={styles.textNew}></View>
                <View>
                  <Text style={styles.text}>
                    You need to provide us your 2 latest pictures.[1 Half & 1
                    Full Length] Selfie is not acceptable.
                  </Text>
                </View>
              </View>
              <View style={styles.textflex}>
                <View style={styles.textNew}></View>
                <Text style={styles.text}>CNIC copy or birth certificate,</Text>
              </View>
              <View style={styles.textflex}>
                <View style={styles.textNew}></View>
                <Text style={styles.text}>
                  Copy of pay slip and visiting card.
                </Text>
              </View>
              <View style={styles.textflex}>
                <View style={styles.textNew}></View>
                <Text style={styles.text}>
                  If divorce copy of divorce papers.{' '}
                </Text>
              </View>
              <View style={styles.textflex}>
                <View style={styles.textNew}></View>
                <Text style={styles.text}>
                  Remember if any of the details found false we will cancel your
                  registration same time.{' '}
                </Text>
              </View>
              <View style={styles.textflex}>
                <View style={styles.textNew}></View>
                <Text style={styles.text}>
                  This fee is nonrefundable and nontransferable. You need pay
                  the rest fee after any kind of
                </Text>
              </View>
            </View>

            <View>
              <Text style={styles.mainHead}>DOCUMENT(S)</Text>
              <View style={styles.border}></View>
            </View>

            <View style={styles.compoCall}>
              <UploadImg
                imgUrlResponse={imgUrlResponse}
                setImgUrlResponse={setImgUrlResponse}
                newImgUrlResponse={newImgUrlResponse}
                setNewImgUrlResponse={setNewImgUrlResponse}
                // setState={setState}
                // state={state}
              />
            </View>
            <View>
              <Text
                style={{
                  color: '#9d9c9b',
                  fontWeight: 500,
                  marginTop: 6,
                  fontSize: 15,
                }}>
                Accepted file types: jpg, gif, png, Max. file size: 5 MB, Max.
                files: 2.
              </Text>
              <Text
                style={{
                  color: '#9d9c9b',
                  fontWeight: 500,
                  marginTop: 6,
                  fontSize: 15,
                }}>
                Accepted file types: jpg, gif, png, Max. file size: 5 MB, Max.
                files: 2.
              </Text>
            </View>
            <View>
              <UploadFile
                title="CNIC or Birth Certificate "
                // setState={setState}
                // state={state}
                fileUrlResponse={fileUrlResponse}
                setFileUrlResponse={setFileUrlResponse}
              />
            </View>
            <View>
              <Text
                style={{
                  color: '#9d9c9b',
                  fontWeight: 500,
                  marginTop: 6,
                  fontSize: 15,
                }}>
                Accepted file types: jpg, gif, png, Max. file size: 5 MB, Max.
                files: 2.
              </Text>
              <Text
                style={{
                  color: '#9d9c9b',
                  fontWeight: 500,
                  marginTop: 6,
                  fontSize: 15,
                }}>
                You need to provide us your CNIC or Birth Certificate
                pictures.[Front & Back - CNIC]
              </Text>
            </View>
            <View>
              <UploadDocument
                title="Pay Slip and Visiting Card"
                documentUrlResponse={documentUrlResponse}
                setDocumentUrlResponse={setDocumentUrlResponse}
                // setState={setState}
                // state={state}
              />
            </View>
            <View>
              <Text
                style={{
                  color: '#9d9c9b',
                  fontWeight: 500,
                  marginTop: 6,
                  fontSize: 15,
                }}>
                Accepted file types: jpg, gif, png, Max. file size: 5 MB, Max.
                files: 2.
              </Text>
              <Text
                style={{
                  color: '#9d9c9b',
                  fontWeight: 500,
                  marginTop: 6,
                  fontSize: 15,
                }}>
                You need to provide us your latest Pay Slip and Visiting Card.
              </Text>
            </View>
            <Pressable
              disabled={
                imgUrlResponse && fileUrlResponse && documentUrlResponse
                  ? false
                  : isNotDisabled
              }
              style={styles.button}
              onPress={onSubmit}>
              <Text style={styles.textBtn}>Submit</Text>
            </Pressable>
            {/* <Pressable style={styles.button} onPress={sendEmailemail}>
              <Text style={styles.textBtn}>email</Text>
            </Pressable> */}
            {loading && (
              <Modal
                visible={loading}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setLoading(false)}>
                <View style={styles.controlContainer}>
                  <Spinner status="control" size="giant" />
                </View>
              </Modal>
            )}
          </Layout>
        </ScrollView>
      </ScreenNavigator>
    </>
  );
}

const styles = StyleSheet.create({
  controlContainer: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#ffd909',
  },
  cross: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
  },
  heading: {
    textAlign: 'center',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headText: {
    color: '#2b2b2b',
    fontSize: 20,
    fontStyle: 'italic',
  },
  headregister: {
    color: '#ff5f6a',
    fontSize: 28,
    fontWeight: 900,
  },
  select: {
    backgroundColor: 'black',
    marginTop: 20,
    // backgroundColor: 'transparent',
  },
  input: {
    marginTop: 20,
  },
  dateFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
  },
  nationality: {
    marginTop: 20,
    width: '50%',
  },
  border: {
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 50,
    height: 1,
  },
  mainHead: {
    color: '#2b2b2b',
    fontSize: 32,
    fontWeight: 800,
    marginTop: 20,
    marginBottom: 30,
  },
  compoCall: {
    marginTop: 30,
    marginBottom: 30,
  },
  head: {
    fontSize: 30,
    fontWeight: 900,
    color: 'black',
  },
  textflex: {
    marginTop: 6,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent: '',
    // borderColor: 'black',
    // borderWidth: 1,
  },
  text: {
    color: '#9d9c9b',
    marginLeft: 6,
    fontWeight: 600,
  },
  textNew: {
    marginTop: 7,
    backgroundColor: '#9d9c9b',
    width: 6,
    height: 6,
    borderRadius: 50,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 50,
    elevation: 1,
    backgroundColor: '#ffd909',
    width: '100%',
    marginTop: 40,
    textAlign: 'center',
  },
  textBtn: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
