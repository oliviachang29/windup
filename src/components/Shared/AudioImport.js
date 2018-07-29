
import React, { Component } from 'react'
import uuid from 'uuid'
import {Navigation} from 'react-native-navigation'
import AppStateListener from "react-native-appstate-listener";

var RNFS = require('react-native-fs')

export default class AudioImport extends Component { 

  handleActive() {
    this.checkForNewAudio()
  }

  copyFile(result) {
    var url = result[0]["path"]
    console.log(url)
    var fileName = url.replace(/^.*[\\\/]/, '') // ex: prejuv dramatic.mp3
    var extension = fileName.split('.').pop()
    var randomNum = uuid.v4()
    var generatedFileName = randomNum + '.' + extension
    var destPath = RNFS.DocumentDirectoryPath + '/' + generatedFileName
    RNFS.moveFile(url, destPath)
      .then((success) => {
        console.log('successfully moved!')
        this.props.navigator.showInAppNotification({
          screen: 'app.Notification',
          passProps: {
            title: '✓ Music imported successfully.',
            type: 'success'
          }
        })
        this.props.navigator.showModal({
          screen: 'app.NewProgram',
          passProps: {
            receiveFile: true,
            fileName: fileName,
            generatedFileName: generatedFileName
          }
        })
      })
    .catch((err) => {
        console.log(err.message)
      })
  }

  checkForNewAudio() {
    RNFS.readDir(RNFS.DocumentDirectoryPath + "/Inbox")
      .then((result) => {
        if (result.length > 0) {
          this.copyFile(result)
        }
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });

     RNFS.readDir(RNFS.TemporaryDirectoryPath + "/top.windup.app-Inbox") // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then((result) => {
        if (result.length > 0) {
          this.copyFile(result)
        }
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
  }

  render () {
    return (
      <AppStateListener
        onActive={() => this.handleActive()}
      />
    )
  }

}


module.exports = AudioImport
