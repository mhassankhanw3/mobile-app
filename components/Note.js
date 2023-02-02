// import { Layout } from '@ui-kitten/components';
import React, {useState} from 'react';
import {text, View, StyleSheet, Layout} from 'react-native';

export default function Note() {
  return (
    <Layout>
      <Text style={styles.head}>NOTE</Text>
      <View>
        <View style={styles.textflex}>
          <Text style={styles.text}>.</Text>
          <Text style={styles.text}>
            You need to provide us your 2 latest pictures.[1 Half & 1 Full
            Length] Selfie is not acceptable.
          </Text>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  head: {
    fontSize: 34,
    fontWeight: 700,
  },
  textflex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#9d9c9b',
  },
});
