import {View, Text, StyleSheet} from 'react-native';

export default function Dashboard() {
  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
      backgroundColor: 'white',
      height: '100%',
      width: '100%',
    },
    mainHead: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#334155',
      textAlign: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.mainHead}>Jori No.1</Text>
    </View>
  );
}
