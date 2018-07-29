'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  findNodeHandle,
  Keyboard
} from 'react-native'

import uuid from 'uuid'
import realm from '../realm'
import GlobalStyles from '../GlobalStyles'
import Utils from '../Utils'
import Heading from '../components/Shared/Heading'
import AudioImport from '../components/Shared/AudioImport'
import Button from '../components/Shared/Button'
import ShareWindup from '../components/Shared/ShareWindup'
import store from 'react-native-simple-store'

const DocumentPicker = require('react-native').NativeModules.RNDocumentPicker
var RNFS = require('react-native-fs')

export default class NewProgram extends Component {
  static navigatorStyle = Utils.scrollViewTitleNavStyle()
  constructor (props) {
    super(props)
    this.state = {
      programType: '', // ex: Short Program
      musicName: '', // ex: Bolero
      fileMusicName: '', // ex: prejuv.mp3
      fileName: '', // xxxx-xxxx-xxxx-xxxx.mp3
      fileSelected: false,
      messageType: '',
      message: '',
      shouldDeleteUploadedMusic: true,
      canAddNewProgram: true
    }

    console.log(RNFS.DocumentDirectoryPath)

    this.saveAudio = this.saveAudio.bind(this)
    this.saveProgram = this.saveProgram.bind(this)
  }

  componentDidMount() {
   store.get('user') 
    .then(result => { 
      var canAddNewProgram = result.hasSharedApp || realm.objects('Program').length === 0 
      this.setState({canAddNewProgram: canAddNewProgram}) 
    }) 
    .catch(error => { 
      console.log(error) 
      store 
        .update('user', { 
          hasSharedApp: false 
        }) 
      this.setState({canAddNewProgram: realm.objects('Program').length === 0}) 
    }) 
    if (this.props.receiveFile) {
      this.receiveAudio()
    }
  }

  componentWillUnmount () {
    if (this.state.shouldDeleteUploadedMusic && this.state.fileSelected) {
      var path = RNFS.DocumentDirectoryPath + '/' + this.state.fileName
      this.deleteUploadedMusic(path)
    }
  }

  musicNameSubmitEditing () {
    console.log('keyboard dismiss')
    this.refs.scrollView.scrollTo({x: 0, y: 0, animated: true})
    Keyboard.dismiss()
    this.saveProgram()
  }

  inputFocused (refName) {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder()
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(this.refs[refName]),
        250, // additionalOffset
        true
      )
    }, 100)
  }

  uploadDifferentMusic () {
    // TODO: toggle fileSelected, remove fileName
    // RNFS. // delete file that has been copied
    var path = RNFS.DocumentDirectoryPath + '/' + this.state.fileName
    this.deleteUploadedMusic(path)
    if (this.state.fileMusicName.split('.')[0] == this.state.programType) {
      this.setState({programType: ''})
    }
    this.setState({ fileSelected: false, fileName: '', fileLength: '' })
  }

  openDocumentPicker () {
    DocumentPicker.show({
      filetype: ['public.audio']
    }, (error, url) => {
      console.log(url)
      this.saveAudio(url)
    })
  }

  receiveAudio() {
    if (this.state.programType == '') {
      this.setState({programType: this.props.fileName.split('.')[0]})
    }

    this.setState({
      fileMusicName: this.props.fileName, // ex: prejuv dramatic.mp3
      fileName: this.props.generatedFileName, // ex: 03c2e834-c3df-43c4-8013-ac2a91ff4da5.mp3
      fileSelected: true,
    })
  }

  // TODO: show a loading wheel while this is importing (for longer files)
  saveAudio (url) {
    var extension = url.fileName.split('.').pop()
    var randomNum = uuid.v4()
    var generatedFileName = randomNum + '.' + extension
    var decodedURL = decodeURIComponent(url.uri) // in case there are spaces in file name
    var destPath = RNFS.DocumentDirectoryPath + '/' + generatedFileName

    // move the file
    RNFS.moveFile(decodedURL, destPath)
      .then((success) => {
        if (this.state.programType == '') {
          this.setState({programType: url.fileName.split('.')[0]})
        }

        this.setState({
          fileMusicName: url.fileName, // ex: prejuv dramatic.mp3
          fileName: generatedFileName, // ex: 03c2e834-c3df-43c4-8013-ac2a91ff4da5.mp3
          fileSelected: true,
        })

        this.props.navigator.showInAppNotification({
          screen: 'app.Notification',
          passProps: {
            title: '✓ Music imported successfully.',
            type: 'success'
          }
        })
      })
      .catch((err) => {
        this.props.navigator.showInAppNotification({
          screen: 'app.Notification',
          passProps: {
            title: '✕ An error occured while importing.',
            type: 'error'
          }
        })
        console.log(err.message)
      })
  }

  // called by pressing "Save" button
  // Or pressing "Done" from Keyboard
  saveProgram () {
    // Since saveProgram() might be called by pressing "Done" on the keyboard, before any music
    // is uploaded, this if statement needs to stay here.
    if (this.state.fileName && this.state.fileSelected && this.state.canAddNewProgram) {
      const colors = Utils.colors()
      // Get a random color
      var randomColor = colors[Math.floor(Math.random() * colors.length)]

      realm.write(() => {
        realm.create('Program', {
          id: Math.floor(Math.random() * 10000000)*10000 + realm.objects('Program').length + 1,
          createdAt: new Date(),
          programType: this.state.programType,
          musicName: this.state.musicName,
          fileName: this.state.fileName,
          delayAmount: 0,
          repeat: true,
          currentTime: 0,
          color: randomColor })
      })
      this.setState({shouldDeleteUploadedMusic: false})
      this.closeNewProgram()
      this.props.navigator.showInAppNotification({
        screen: 'app.Notification',
        passProps: {
          title: '✓ Your program was created.',
          type: 'success'
        }
      })
    }
  }

  deleteUploadedMusic (path) {
    RNFS.unlink(path)
      .then(() => {
        console.log('program file deleted')
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch((err) => {
        console.log(err.message)
        // TODO: handle error
      })
  }

  openHelp () {
    this.props.navigator.showModal({
      screen: 'app.Help',
      title: 'Help',
      passProps: {
        helpWithImporting: true
      }
    })
  }

  closeNewProgram () {
    this.props.navigator.dismissModal()
  }

  renderImportButton () {
    if (this.state.fileSelected) {
      return (
        <View>
          <TouchableOpacity style={styles.importMusicButtonContainer} onPress={() => this.uploadDifferentMusic()}>
            <Text allowFontScaling={false} style={[GlobalStyles.title, styles.fileNameText]}>{this.state.fileMusicName}</Text>
            <Text allowFontScaling={false} style={[GlobalStyles.span, styles.uploadDifferentMusicText]}>Upload different music</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View>
          <TouchableOpacity style={styles.importMusicButtonContainer} onPress={() => this.openDocumentPicker()}>
            <Text allowFontScaling={false} style={GlobalStyles.title}>🎶  Import Music</Text>
          </TouchableOpacity>
          <Text allowFontScaling={false} style={[GlobalStyles.span, styles.fileTypesSupportedText]}>Choose an audio file (.aac, .mp3, .wav)</Text>
          <Button
              color="#48C6EF"
              viewStyle={styles.helpWithImportingContainer}
              onPress={() => this.openHelp()}
              text="Need help with importing?"
              textStyle={styles.helpWithImportingText} />
        </View>
      )
    }
  }

  render () {

    return (
        <ScrollView 
          ref='scrollView' 
          style={[GlobalStyles.container, GlobalStyles.innerContainer]}
          keyboardDismissMode='interactive' 
          showsVerticalScrollIndicator={false}
          onScroll={(event) => Utils.handleScroll(event, this.props.navigator)}
          scrollEventThrottle={16}>
          <AudioImport navigator={this.props.navigator} />
          <Heading heading='New Program' onPressX={() => this.closeNewProgram()} />
            {this.renderImportButton()}

            {/* Had to make it custom because I couldn't pass refs to child */}
            <View style={[GlobalStyles.thinUnderline, styles.textInputContainer]}>
              <TextInput
                style={styles.textInput}
                placeholder='Program level or type'
                placeholderTextColor='#D8D8D8'
                maxLength={22}
                value={this.state.programType}
                onChangeText={(programType) => this.setState({programType})}
                ref='programType'
                returnKeyType='next'
                onFocus={this.inputFocused.bind(this, 'programType')}
                onSubmitEditing={(event) => { this.refs.musicName.focus() }}
                // onEndEditing={() => console.log('hi')}
                autoCapitalize='words'
                clearButtonMode="while-editing"
                  />
            </View>
            <Text allowFontScaling={false} style={[GlobalStyles.span, styles.inputExampleText]}>free skate, short, long, technical, artistic</Text>

            <View style={[GlobalStyles.thinUnderline, styles.textInputContainer]}>
              <TextInput
                style={styles.textInput}
                placeholder='Name of music or artist'
                placeholderTextColor='#D8D8D8'
                maxLength={22}
                value={this.state.musicName}
                onChangeText={(musicName) => this.setState({musicName})}
                ref='musicName'
                returnKeyType='done'
                onFocus={this.inputFocused.bind(this, 'musicName')}
                onSubmitEditing={() => this.musicNameSubmitEditing()}
                autoCapitalize='words'
                clearButtonMode="while-editing"
                  />
            </View>
            <Text allowFontScaling={false} style={[GlobalStyles.span, styles.inputExampleText, styles.musicNameExampleText]}>carmen, bolero, mozart, the firebird</Text>
            
            <ShareWindup
              viewStyle={styles.shareWindup}
              show={!this.state.canAddNewProgram}
              canAddNewProgram={() => this.setState({canAddNewProgram: true})} />
            <Button
              text="Save"
              color="#ACABFF"
              disabled={!(this.state.fileName && this.state.fileSelected && this.state.canAddNewProgram)}
              onPress={() => this.saveProgram()}
              viewStyle={styles.saveButton}
              textStyle={styles.saveButtonText} />
          </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  textInputContainer: {
    borderBottomColor: '#808080'
  },
  textInput: {
    marginTop: 36,
    height: 40,
    fontSize: 20,
    color: '#404040',
    fontFamily: 'Circular-Book'
  },
  inputExampleText: {
    marginTop: 5.5
  },
  // Import Music Button
  importMusicButtonContainer: {
    width: '100%',
    padding: 20,
    minHeight: 88,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E6E6E6',
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 1
  },
  fileTypesSupportedText: {
    marginTop: 10,
    alignSelf: 'center'
  },
  fileNameText: {
    textAlign: 'center',
    marginBottom: 20
  },
  helpWithImportingContainer: {
    marginTop: 20,
    padding: 13,
  },
  helpWithImportingText: {
    alignSelf: 'center',
    fontSize: 15,
    fontFamily: 'Circular-Book'
  },
  saveButton: {
    justifyContent: 'center',
    marginBottom: 40
  },
  saveButtonText: {
    alignSelf: 'center'
  },
  musicNameExampleText: {
    marginBottom: 40
  },
})


module.exports = NewProgram
