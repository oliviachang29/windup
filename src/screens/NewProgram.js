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
  Dimensions,
  Keyboard
} from 'react-native'

import uuid from 'uuid'
import realm from '../realm'
import GlobalStyles from '../GlobalStyles'
import Heading from '../components/Shared/Heading'
import Message from '../components/Shared/Message'
import FancyTextInput from '../components/Shared/FancyTextInput'
import SaveButton from '../components/NewProgram/SaveButton'

const DocumentPicker = require('react-native').NativeModules.RNDocumentPicker
const Sound = require('react-native-sound')
var RNFS = require('react-native-fs')

var {height} = Dimensions.get('window')
var music
var id

export default class NewProgram extends Component {
  constructor (props) {
    super(props)
    this.props.navigator.setStyle({
      navBarHidden: true
    })
    this.state = {
      programType: '',
      musicName: '',
      fileName: '', // TODO: set fileName property (using split)
      fileSelected: false,
      messageType: '',
      message: '',
      shouldDeleteUploadedMusic: true
    }

    this.addError = this.addError.bind(this)
    this.removeMessage = this.removeMessage.bind(this)
    this.saveAudio = this.saveAudio.bind(this)
    this.saveProgram = this.saveProgram.bind(this)

  }

  componentWillUnmount () {
    if (this.state.shouldDeleteUploadedMusic && this.state.fileSelected) {
      var path = RNFS.DocumentDirectoryPath + '/' + this.state.fileName
      this.deleteUploadedMusic(path)
    }
  }

  renderImportButton () {
    if (this.state.fileSelected) {
      return (
        <View>
          <Text style={[GlobalStyles.text, styles.fileNameText]}>{this.state.fileMusicName}</Text>
          <TouchableOpacity
            style={[GlobalStyles.thinUnderline, styles.uploadDifferentMusicView]}
            onPress={() => this.uploadDifferentMusic()}>
            <Text style={[GlobalStyles.span, styles.uploadDifferentMusicText]}>Upload different music</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View>
          <TouchableOpacity style={styles.importMusicButtonContainer} onPress={() => this.openDocumentPicker()}>
            <Text style={GlobalStyles.title}>🎶  Import Music</Text>
          </TouchableOpacity>
          <Text style={[GlobalStyles.span, styles.fileTypesSupportedText]}>Choose an audio file (.aac, .mp3, .wav)</Text>
          <View style={[GlobalStyles.thinUnderline, styles.helpWithImportingView]}>
            <Text style={[GlobalStyles.span, styles.helpWithImporting]} onPress={() => this.openHelp()}>> Need help with importing?</Text>
          </View>
        </View>
      )
    }
  }

  render () {
    return (
      <View style={GlobalStyles.container}>
        <View style={GlobalStyles.innerContainer} >

          <Heading heading='New Program' onPressX={() => this.gotoProgramList()} />

          <ScrollView ref='scrollView' style={styles.scrollView} keyboardDismissMode='interactive' showsVerticalScrollIndicator={false}>

            <Message type={this.state.messageType} message={this.state.message} />
            {this.renderImportButton()}

            {/* Had to make it custom because I couldn't pass refs to child */}
            <View style={[GlobalStyles.thinUnderline, styles.textInputContainer]}>
              <TextInput
                style={styles.textInput}
                placeholder='Program level or type'
                placeholderTextColor='#D8D8D8'
                maxLength={22}
                onChangeText={(programType) => this.setState({programType})}
                ref='programType'
                returnKeyType='next'
                onFocus={this.inputFocused.bind(this, 'programType')}
                onSubmitEditing={(event) => { this.refs.musicName.focus() }}
                // onEndEditing={() => console.log('hi')}
                autoCapitalize='words'
                  />
            </View>
            <Text style={[GlobalStyles.span, styles.inputExampleText]}>short, long, technical, artistic</Text>

            <View style={[GlobalStyles.thinUnderline, styles.textInputContainer]}>
              <TextInput
                style={styles.textInput}
                placeholder='Name of music or artist'
                placeholderTextColor='#D8D8D8'
                maxLength={22}
                onChangeText={(musicName) => this.setState({musicName})}
                ref='musicName'
                onFocus={this.inputFocused.bind(this, 'musicName')}
                onSubmitEditing={() => this.musicNameSubmitEditing()}
                autoCapitalize='words'
                  />
            </View>
            <Text style={[GlobalStyles.span, styles.inputExampleText]}>bolero, jupiter, john williams, etc.</Text>

            <SaveButton
              viewStyle={styles.saveButton}
              canSave={this.state.programType && this.state.musicName && this.state.fileName && this.state.fileSelected}
              saveProgram={this.saveProgram} />

          </ScrollView>

        </View>
      </View>
    )
  }

  addError (err) {
    console.log('Error: ' + err.msg)
    this.setState({
      message: '✕ An error occured while importing.',
      messageType: 'error'
    })
  }

  removeMessage () {
    console.log('Cleared out errors')
    this.setState({ message: '', messageType: '' })
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
    this.setState({ fileSelected: false, fileName: '', fileLength: '' })
    this.removeMessage()
  }

  openDocumentPicker () {
    DocumentPicker.show({
      filetype: ['public.audio']
    }, (error, url) => {
      console.log(url)
      this.saveAudio(url)
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
        console.log('file copied!')

        this.setState({
          fileMusicName: url.fileName, // ex: prejuv dramatic.mp3
          fileName: generatedFileName, // ex: 03c2e834-c3df-43c4-8013-ac2a91ff4da5.mp3
          fileSelected: true,
          message: '✓ Music imported successfully.',
          messageType: 'success',
        })
      })
      .catch((err) => {
        this.addError(err)
        console.log(err.message)
      })
  }

  saveProgram () {
    if (this.state.programType && this.state.musicName && this.state.fileName && this.state.fileSelected) {
      // Get a random color
      const colors = ['#FF708D', '#DE9796', '#F4A04F', '#B3CB86', '#86CB92', '#3BC1A5', '#5EBCD0', '#64B0D6', '#4E8794', '#6A78B7', '#B58CBE', '#C493BB']
      var randomNum = Math.floor(Math.random() * (11 - 0 + 1)) + 0;
      var randomColor = colors[randomNum]
      console.log('color: ' + randomNum + " - " + randomColor)

      realm.write(() => {
        realm.create('Program', {
          id: realm.objects('Program').length + 1,
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
      this.gotoProgramList()
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
      passProps: {
        helpWithImporting: true
      }
    })
  }

  gotoProgramList () {
    this.props.navigator.dismissAllModals()
  }
}

const styles = StyleSheet.create({
  scrollView: {
    // flex: 10
    // opacity: 0.1
    height: height
  },
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
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E6E6E6',
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 1
  },
  importMusicButton: {
    color: '#808080'
  },
  fileTypesSupportedText: {
    marginTop: 10,
    alignSelf: 'center'
  },
  fileNameText: {
    marginTop: 15
  },
  uploadDifferentMusicView: {
    width: 156
  },
  uploadDifferentMusicText: {
    borderBottomColor: '#95989A',
    borderBottomWidth: 1,
    color: '#808080',
    marginTop: 22,
    marginBottom: 5
  },
  helpWithImportingView: {
    width: 195,
    alignSelf: 'center'
  },
  helpWithImporting: {
    marginTop: 20,
    paddingBottom: 7
  },
  saveButton: {
    marginBottom: 200
  }
})


module.exports = NewProgram
