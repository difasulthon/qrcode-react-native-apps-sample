//This is an example code to generate QR code//
import React, { Component } from 'react';
//import react in our code.
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ToastAndroid
} from 'react-native';
// import all basic components
import QRCode from 'react-native-qrcode-svg';
import CameraRoll from "@react-native-community/cameraroll";
import RNFS from "react-native-fs";

class App extends Component {
  svg;
  constructor() {
    super();
    this.state = {
      inputValue: '',
      // Default Value of the TextInput
      valueForQRCode: '',
      // Default value for the QR Code
    };
  }
  getTextInputValue = () => {
    // Function to get the value from input
    // and Setting the value to the QRCode
    this.setState({ inputValue: ''})
    this.setState({ valueForQRCode: this.state.inputValue });
  };
  saveQrToDisk = () => {
    this.svg.toDataURL((data) => {
      RNFS.writeFile(RNFS.CachesDirectoryPath+"/some-name.png", data, 'base64')
        .then((success) => {
          return CameraRoll.saveToCameraRoll(RNFS.CachesDirectoryPath+"/some-name.png", 'photo')
        })
        .then(() => {
          // this.setState({ busy: false, imageSaved: true  })
          ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)
        })
    })
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={{paddingBottom: 25, alignContent: 'center'}}>
          <Text style={styles.TextTitle}>This Generate QR Code React-Native Apps</Text>
        </View>
        <TouchableOpacity onPress={this.saveQrToDisk}>
          <QRCode
            //QR code value
            value={this.state.valueForQRCode ? this.state.valueForQRCode : 'NA'}
            //size of QR Code
            size={250}
            //Color of the QR Code (Optional)
            color="black"
            //Background Color of the QR Code (Optional)
            backgroundColor="white"
            getRef={(ref) => (this.svg = ref)}
            //Logo of in the center of QR Code (Optional)
            // logo={{
            //   uri:
            //     'https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png',
            // }}
            //Center Logo size  (Optional)
            // logoSize={30}
            //Center Logo margin (Optional)
            // logoMargin={2}
            //Center Logo radius (Optional)
            // logoBorderRadius={15}
            //Center Logo background (Optional)
            // logoBackgroundColor="yellow"
          ></QRCode>
        </TouchableOpacity>
        
        <TextInput
          // Input to get the value to set on QRCode
          style={styles.TextInputStyle}
          onChangeText={text => this.setState({ inputValue: text })}
          underlineColorAndroid="transparent"
          placeholder="Enter text to Generate QR Code"
        />
        <TouchableOpacity
          onPress={this.getTextInputValue}
          activeOpacity={0.7}
          style={styles.button}>
          <Text style={styles.TextStyle}> Generate QR Code </Text>
        </TouchableOpacity>
        <Text style={{color: 'black', paddingTop: 20, fontSize: 15, textAlign: "left"}}>Click the QR Code for save image to Gallery</Text>
      </View>
    );
  }
}
export default App;
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    paddingTop: 15,
  },
  TextInputStyle: {
    width: '100%',
    height: 40,
    marginTop: 20,
    borderWidth: 1,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    paddingTop: 8,
    marginTop: 10,
    paddingBottom: 8,
    backgroundColor: '#005cb2',
    marginBottom: 20,
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  TextTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  }
});
