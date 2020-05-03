import React, { Component } from 'react'
import { Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const styles = {
    scrollViewStyle: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#005cb2'
    },

    textTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        paddingTop: 16,
        paddingBottom: 5,
        color: 'white'
    },
    textTitleSecond: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        paddingBottom: 16,
        color: 'white'
    },
    textTitle1: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'black'
    },
    cardView: {
        width: deviceWidth - 32,
        height: deviceHeight / 2,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: 'white'
    },
    scanCardView: {
        width: deviceWidth - 32,
        height: deviceHeight / 2,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: 'white'
    },
    buttonScan: {
        width: 42,

    },
    descText: {
        padding: 16,
        textAlign: 'justify',
        fontSize: 16
    },


    highlight: {
        fontWeight: '700',
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
    buttonTouchable: {
        fontSize: 21,
        backgroundColor: '#6ab7ff',
        marginTop: 30,
        width: deviceWidth - 62,
        justifyContent: 'center',
        alignItems: 'center',
        height: 44
    },
    buttonTouchable2: {
        fontSize: 21,
        backgroundColor: '#6ab7ff',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        width: 85,
        marginHorizontal: 10
    },
    buttonTextStyle: {
        color: 'white',
        fontWeight: 'bold',
    },
    GenerateContainer: {
        width: deviceWidth - 32,
        height: deviceHeight / 2,
        alignSelf: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: 'white',
        margin: 10,
        paddingTop: 15,
        flex: 1
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
}
export default styles;