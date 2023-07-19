import React from 'react';
import { Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

import logo from './assets/logo.png';

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  text: {
    marginBottom: 10,
  },
});

const Receipt = () => (
  <Page size="A4">
    <View style={styles.container}>
      <Image style={styles.logo} src={logo} />

      <Text style={styles.title}>Booking Confirmation</Text>

      <Text style={styles.text}>Hotel Name: Hotel ABC</Text>
      <Text style={styles.text}>Address: XYZ Street, 123</Text>
      <Text style={styles.text}>City: City ABC</Text>
      

     
    

      <Text style={styles.text}>Payment Method: Credit Card</Text>

      <Text style={styles.text}>Thank you for choosing our hotel!</Text>
    </View>
  </Page>
);

export default Receipt;
