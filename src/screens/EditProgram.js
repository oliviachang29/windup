'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native'

import Heading from '../components/Shared/Heading'
import Message from '../components/Shared/Message'

import realm from '../realm'
import GlobalStyles from '../GlobalStyles'
var RNFS = require('react-native-fs')

import FancyTextInput from '../components/Shared/FancyTextInput'

export default class NewProgram extends Component {
  constructor (props) {
    super(props)
    this.props.navigator.setStyle({
      navBarHidden: true
    })
    this.state = {
      programType: this.props.program.programType,
      musicName: this.props.program.musicName,
      message: ''
    }
  }

  render () {
    return (
      <View style={GlobalStyles.container}>
        <View style={GlobalStyles.innerContainer}>
          <Heading heading='Edit Program' onPressX={() => this.gotoProgramList()} />

          <Message message={this.state.message} type='success' />

          <FancyTextInput
            value={this.state.programType}
            maxLength={20}
            example='program type'
            onChangeText={(value) => this.onChangeText(value, 'programType')}
            onEndEditing={() => this.updateProgram()}
            autoFocus
            viewStyle={styles.programTypeView}
              />

          <FancyTextInput
              // TODO: set character limit
            value={this.state.musicName}
            example='name of music or artist'
            onChangeText={(value) => this.onChangeText(value, 'musicName')}
            onEndEditing={() => this.updateProgram()}
              />

          <TouchableOpacity
            onPress={() => this.raiseAlertForDelete(this.props.program)}
            style={[GlobalStyles.thickUnderline, styles.deleteView]}>
            <Text style={[GlobalStyles.title, styles.deleteText]}>Delete Program</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
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
    this.setState({message: '✓ All changes saved.'})
    realm.write(() => {
      this.props.program.programType = this.state.programType
      this.props.program.musicName = this.state.musicName
    })
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

    this.gotoProgramList(false)
  }

  gotoProgramList () {
    this.props.navigator.dismissModal({})
  }
}

const styles = StyleSheet.create({
  programTypeView: {
  },
  deleteView: {
    borderBottomColor: '#D93858',
    paddingBottom: 6,
    width: 145,
    marginTop: 50
  },
  deleteText: {
    color: '#D93858'
  }
})

module.exports = NewProgram
