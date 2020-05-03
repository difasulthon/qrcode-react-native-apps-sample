import React, { Component, Fragment } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './scanStyle'
import {
    TouchableOpacity,
    Text,
    StatusBar,
    Linking,
    View,
    TextInput,
    ToastAndroid,
    PermissionsAndroid,
    Platform
} from 'react-native';

import {
    Header,
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import QRCode from 'react-native-qrcode-svg';
import CameraRoll from "@react-native-community/cameraroll";
import RNFS from "react-native-fs";
import Share from 'react-native-share';

class Scan extends Component {
    svg;
    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null,
            generate: false,
            valueForQRCode: '',
            inputValue: '',
            menu: true
        };
    }

    onSuccess = (e) => {
        const check = e.data.substring(0, 4);
        console.log('scanned data' + check);
        this.setState({
            result: e,
            scan: false,
            ScanResult: true
        })
        if (check === 'http') {
            Linking
                .openURL(e.data)
                .catch(err => console.error('An error occured', err));


        } else {
            this.setState({
                result: e,
                scan: false,
                ScanResult: true
            })
        }

    }

    activeQR = () => {
        this.setState({
            scan: true
        })
    }
    activeGenerate = () => {
        this.setState({
            generate: true,
            menu: false
        })
    }
    activeMenu = () => {
        this.setState({
            generate: false,
            scan: false,
            menu: true,
            ScanResult: false
        })
    }
    scanAgain = () => {
        this.setState({
            scan: true,
            ScanResult: false
        })
    }
    getTextInputValue = () => {
        // Function to get the value from input
        // and Setting the value to the QRCode
        this.setState({ inputValue: ''})
        this.setState({ valueForQRCode: this.state.inputValue });
      };
    checkAndroidPermission = async () => {
        try {
          const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
          await PermissionsAndroid.request(permission);
          Promise.resolve();
        } catch (error) {
          Promise.reject(error);
        }
    };  
    saveQrToDisk = async () => {
        if (Platform.OS === 'android'){
            await this.checkAndroidPermission();
        }
        this.svg.toDataURL((data) => {
          RNFS.writeFile(RNFS.CachesDirectoryPath+"/some-name.png", data, 'base64')
            .then((success) => {  
            return CameraRoll.saveToCameraRoll(RNFS.CachesDirectoryPath+"/some-name.png", 'photo')
            })
            .then(() => {
              // this.setState({ busy: false, imageSaved: true  })
              ToastAndroid.show('Saved to gallery', ToastAndroid.SHORT)
            })
        })
    }
    shareQR = () => {
        this.svg.toDataURL((data) => {
          const shareImageBase64 = {
            title: "QR",
            message: "Ehi, this is my QR code",
            url: `data:image/png;base64,${data}`
          };
          Share.open(shareImageBase64);
        });
      }
    render() {
        const { scan, ScanResult, result, generate, inputValue, valueForQRCode, menu } = this.state
        const desccription = ''
        return (
            <View style={styles.scrollViewStyle}>
                <Fragment>
                    <StatusBar barStyle="dark-content" />
                    <Text style={styles.textTitle}>This Is React-Native QR Code Apps</Text>
                    <Text style={styles.textTitle}>Made by Difa Sulthon</Text>

                    {!scan && !ScanResult && !generate && menu &&
                        <View style={styles.cardView} >
                            <TouchableOpacity onPress={this.activeGenerate} style={styles.buttonTouchable}>
                                <Text style={styles.buttonTextStyle}>Click to Generate !</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.activeQR} style={styles.buttonTouchable}>
                                <Text style={styles.buttonTextStyle}>Click to Scan !</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    {ScanResult &&
                        <Fragment>
                            <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                                <Text style={{textAlign: "center"}}>{result.data}</Text>
                                {/* <Text>Result : {result.data}</Text>
                                <Text numberOfLines={1}>RawData: {result.rawData}</Text> */}
                                <TouchableOpacity onPress={this.scanAgain} style={styles.buttonTouchable}>
                                    <Text style={styles.buttonTextStyle}>Click to Scan again!</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.activeMenu} style={styles.buttonTouchable}>
                                    <Text style={styles.buttonTextStyle}>Back to Menu</Text>
                                </TouchableOpacity>
                            </View>
                        </Fragment>
                    }

                    {scan &&
                        <QRCodeScanner
                            reactivate={true}
                            showMarker={true}
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                            topContent={
                                <Text style={styles.centerText}>
                                </Text>
                            }
                            bottomContent={
                                <View>
                                    {/* <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.scanner.reactivate()}>
                                        <Text style={styles.buttonTextStyle}>OK. Got it!</Text>
                                    </TouchableOpacity> */}
                                    <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.setState({ scan: false })}>
                                        <Text style={styles.buttonTextStyle}>Stop Scan</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                    }

                    {generate &&
                        <View style={styles.GenerateContainer}>
                            <TouchableOpacity>
                                <QRCode
                                    value={this.state.valueForQRCode ? this.state.valueForQRCode : 'NA'}
                                    size={175}
                                    color="black"
                                    backgroundColor="white"
                                    getRef={(ref) => (this.svg = ref)}
                                >
                                </QRCode>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.TextInputStyle}
                                onChangeText={text => this.setState({ inputValue: text })}
                                underlineColorAndroid="transparent"
                                placeholder="Enter text to Generate QR Code"
                            />
                            <TouchableOpacity
                                onPress={this.getTextInputValue}
                                activeOpacity={0.7}
                                style={styles.buttonTouchable}>
                            <Text style={styles.buttonTextStyle}> Generate QR Code </Text>
                            </TouchableOpacity>
                            <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                                <TouchableOpacity
                                    onPress={this.saveQrToDisk}
                                    activeOpacity={0.7}
                                    style={styles.buttonTouchable2}>
                                    <Text style={styles.buttonTextStyle}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this.shareQR}
                                    activeOpacity={0.7}
                                    style={styles.buttonTouchable2}>
                                    <Text style={styles.buttonTextStyle}>Share</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this.activeMenu}
                                    activeOpacity={0.7}
                                    style={styles.buttonTouchable2}>
                                    <Text style={styles.buttonTextStyle}> Back to Menu </Text>
                                </TouchableOpacity>
                            </View>
                            {/* <Text style={{color: 'black', paddingTop: 20, fontSize: 15, textAlign: "left"}}>Click the QR Code for share image</Text> */}
                        </View>
                    }
                </Fragment>
            </View>

        );
    }
}



export default Scan;