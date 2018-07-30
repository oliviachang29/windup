'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableOpacity,
  findNodeHandle,
  Alert,
  ScrollView,
  TextInput
} from 'react-native'

import Heading from '../components/Shared/Heading'
import Button from '../components/Shared/Button'
import AudioImport from '../components/Shared/AudioImport'
import realm from '../realm'
import GlobalStyles from '../GlobalStyles'
import Utils from '../Utils'
var RNFS = require('react-native-fs')

export default class EditProgram extends Component {
  static navigatorStyle = Utils.navStyle()

  constructor (props) {
    super(props)
    var program = realm.objects('Program').filtered('id = $0', this.props.id)[0]
    this.state = {
      program: program,
      programType: program.programType,
      musicName: program.musicName,
      message: ''
    }
  }

  submitEditing () {
    Keyboard.dismiss()
    this.refs.scrollView.scrollTo({x: 0, y: 0, animated: true})
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

  onChangeText (value, type) {
    console.log('text is changing')
    this.setState({message: ''})
    if (type === 'programType') {
      this.setState({programType: value})
    } else if (type === 'musicName') {
      this.setState({musicName: value})
    }
  }

  updateProgram () {
    console.log('program is updating')
    // tell user that their changes were saved
    this.props.navigator.showInAppNotification({
      screen: 'app.Notification',
      passProps: {
        title: '✓ All changes saved.',
        type: 'success'
      }
    })

    realm.write(() => {
      this.state.program.programType = this.state.programType
      this.state.program.musicName = this.state.musicName
    })

    this.props.navigator.dismissModal();
  }

  raiseAlertForDelete (program) {
    Alert.alert(
      'Are you sure you want to delete this program?',
      '',
      [
        {text: 'Delete', onPress: () => this.deleteProgram(program), style: 'destructive'},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
      ],
      { cancelable: true }
    )
  }

  deleteProgram (program) {
    this.props.navigator.dismissAllModals()

    console.log('deleting program')
    // create a path you want to delete
    if (program.fileName !== '') {
      var path = RNFS.DocumentDirectoryPath + '/' + program.fileName

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
    realm.write(() => {
      realm.delete(program)
    })

    this.props.navigator.showInAppNotification({
        screen: 'app.Notification',
        passProps: {
          title: '✓ Your program was deleted.',
          type: 'success'
        }
      })
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
          <Heading heading='Edit Program' onPressX={() => this.props.navigator.dismissModal()} />
          {/* Had to make it custom because I couldn't pass refs to child */}
          <View style={[GlobalStyles.thinUnderline, styles.textInputContainer]}>
            <TextInput
              style={styles.textInput}
              value={this.state.programType}
              onChangeText={(value) => this.onChangeText(value, 'programType')}
              onSubmitEditing={() => this.submitEditing()}
              ref='programType'
              onFocus={this.inputFocused.bind(this, 'programType')}
              // onEndEditing={() => console.log('hi')}
              autoCapitalize='words'
              returnKeyType='done'
              clearButtonMode="while-editing"
                />
          </View>
          <Text allowFontScaling={false} style={[GlobalStyles.span, styles.inputExampleText]}>Program type or level</Text>

          <View style={[GlobalStyles.thinUnderline, styles.textInputContainer]}>
            <TextInput
              value={this.state.musicName}
              style={styles.textInput}
              ref='musicName'
              onFocus={this.inputFocused.bind(this, 'musicName')}
              onChangeText={(value) => this.onChangeText(value, 'musicName')}
              onSubmitEditing={() => this.submitEditing()}
              autoCapitalize='words'
              returnKeyType='done'
              clearButtonMode="while-editing"
                />
          </View>
          <Text allowFontScaling={false} style={[GlobalStyles.span, styles.inputExampleText]}>Name of music or artist</Text>
          <Button
            color="#ACABFF"
            viewStyle={[styles.button]}
            text='Save'
            onPress={() => this.updateProgram(this.state.program)} />
          <Button
            color="#FF7A72"
            viewStyle={[styles.button]}
            text='Delete'
            onPress={() =>this.raiseAlertForDelete(this.state.program)} />
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  textInputContainer: {
    borderBottomColor: '#808080'
  },
  textInput: {
    height: 40,
    fontSize: 20,
    color: '#404040',
    fontFamily: 'Circular-Book'
  },
  inputExampleText: {
    marginTop: 5.5,
    marginBottom: 36,
  },
  button: {
    marginTop: 20,
    alignItems: 'center'
  }
})

module.exports = EditProgram
