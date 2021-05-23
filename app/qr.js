/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * https://github.com/didinj/react-native-qrcode-scanner-example  
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import QRCodeScanner from 'react-native-qrcode-scanner';

const qr = () => {
  const API_URL = 'https://work--force-api.herokuapp.com'
  const [scan, setScan] = useState(false)
  const [result, setResult] = useState()


  // WORKING
  const authenticate = async () => {

    try {
      // Get output in json
      await fetch(`${API_URL}/api/authenticate?username=ceo&password=ceo`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
        })

      // // Get output in string
      // await fetch(`${API_URL}/api/authenticate?username=ceo&password=ceo`, {
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   },
      //   method: "POST"
      //   }).then(function (body) {
      //     return body.text(); // <--- REF: https://stackoverflow.com/a/45427456
      //   }).then(function (data) {
      //     var json = JSON.stringify(data)
      //     console.log('json:' + json);
      //     console.log('data:' + data);
      //   });

      // // Check if API is working or now
      // await fetch(`${API_URL}`)
      //   .then(function (body) {
      //     return body.text();
      //   }).then(function (data) {
      //     console.log(data);
      //   });

    } catch (error) {
      console.error('error: qr.js Line 76:' + error);
    }
  };

  // REDUNDANT
  async function update() {

    let response = await fetch('https://work--force-api.herokuapp.com/api/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        username: 'ceo',
        password: 'ceo'
      })
    });

    console.log(response);
    setResult('updated');

    // await fetch('https://work--force-api.herokuapp.com/api/update/jack/21/forklift/haha/abbba').then((response) => response.json()).then((responseJson) => {
    //   // return responseJson.movies;
    //   setResult('updated');

    // })
    //   .catch((error) => {
    //     setResult(error);
    //     // console.error(error);
    //   });
  }

  onSuccess = (e) => {
    // update()
    setResult(e.data)
    console.log(authenticate())
    setScan(false)
  }

  startScan = () => {
    setScan(true)
    setResult()
  }



  return (
    <>
      <StatusBar barStyle="dark-content" />

      if (true) {
        
      }

      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View style={styles.body}>
            {result &&
              <View style={styles.sectionContainer}>
                <Text style={styles.centerText}>{result}</Text>
              </View>
            }
            {!scan &&
              <View style={styles.sectionContainer}>
                <Button
                  title="Start Scaner"
                  color="#f194ff"
                  onPress={this.startScan}
                />
              </View>
            }
            {scan &&
              <View style={styles.sectionContainer}>
                <QRCodeScanner
                  reactivate={true}
                  showMarker={true}
                  ref={(node) => { this.scanner = node }}
                  onRead={this.onSuccess}
                  topContent={
                    <Text style={styles.centerText}>
                      Scan your QRCode!
                    </Text>
                  }
                  bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable} onPress={() => setScan(false)}>
                      <Text style={styles.buttonText}>Cancel Scan</Text>
                    </TouchableOpacity>
                  }
                />
              </View>
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default qr;
