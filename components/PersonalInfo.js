import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {
  Layout,
  Select,
  SelectItem,
  IndexPath,
  Input,
  Datepicker,
  Icon,
  Button,
} from '@ui-kitten/components';
import {useMainContext} from '../context/Main';
// import firebase from "react-native"
import firestore from '@react-native-firebase/firestore';
// import {Icon} from 'react-native-vector-icons/dist/FontAwesome';

export default function PersonalInfo() {
  const [selectedIndex, setSelectedIndex] = React.useState('Gender');
  const [defaultSingle, setDefaultSingle] = React.useState('Single');
  const [value, setValue] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [state, setState] = useState({
    name: '',
    gender: '',
    age: '',
    date: new Date(),
    noOfChildren: '',
    ageOfChildren: '',
    livingWith: '',
    height: '',
    complexion: '',
    cast: '',
    sect: '',
    nationality: '',
  });

  const {func} = useMainContext();
  const onSubmit = () => {
    func.Form(state);
  };
  const CalendarIcon = props => <Icon {...props} name="calendar" />;
  return (
    <ScrollView>
      <Layout style={styles.container} level="1">
        <Text style={styles.mainHead}>Personal Information</Text>
        <View style={styles.border}></View>
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
            placeholder="Place your Text"
            value={state.name}
            onChangeText={nextValue => setState({...state, name: nextValue})}
          />
          <Datepicker
            style={styles.input}
            label="Date of Birth"
            caption="Caption"
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
            value={
              defaultSingle === 0
                ? 'Divorced'
                : 'Married'
                ? 'Single'
                : 'Marital Status'
            }
            onSelect={index => setDefaultSingle(index.row)}
            style={{marginTop: 20}}>
            <SelectItem title="Single" />
            <SelectItem title="Married" />
            <SelectItem title="Divorced" />
            <SelectItem title="Marital Status" />
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
            onChangeText={nextValue => setState({...state, height: nextValue})}
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
            onChangeText={nextValue => setState({...state, cast: nextValue})}
          />
          <Input
            label="Sect"
            style={styles.input}
            value={state.sect}
            onChangeText={nextValue => setState({...state, sect: nextValue})}
          />
          <Input
            label="Nationality"
            style={styles.nationality}
            value={state.sect}
            onChangeText={nextValue =>
              setState({...state, nationality: nextValue})
            }
          />
        </View>

        <Text style={styles.mainHead}>EDUCATION & OCCUPATION DETAILS</Text>
        <View style={styles.border}></View>
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
            placeholder="Place your Text"
            value={state.name}
            onChangeText={nextValue => setState({...state, name: nextValue})}
          />
          <Datepicker
            style={styles.input}
            label="Date of Birth"
            caption="Caption"
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
            value={
              defaultSingle === 0
                ? 'Divorced'
                : 'Married'
                ? 'Single'
                : 'Marital Status'
            }
            onSelect={index => setDefaultSingle(index.row)}
            style={{marginTop: 20}}>
            <SelectItem title="Single" />
            <SelectItem title="Married" />
            <SelectItem title="Divorced" />
            <SelectItem title="Marital Status" />
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
            onChangeText={nextValue => setState({...state, height: nextValue})}
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
            onChangeText={nextValue => setState({...state, cast: nextValue})}
          />
          <Input
            label="Sect"
            style={styles.input}
            value={state.sect}
            onChangeText={nextValue => setState({...state, sect: nextValue})}
          />
          <Input
            label="Nationality"
            style={styles.nationality}
            value={state.sect}
            onChangeText={nextValue =>
              setState({...state, nationality: nextValue})
            }
          />
          <Button style={styles.input} onPress={onSubmit}>
            submit
          </Button>
        </View>
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
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
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});
