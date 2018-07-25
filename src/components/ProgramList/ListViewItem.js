import React, {Component} from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native'
import GlobalStyles from '../../GlobalStyles'
import Ovals from '../Shared/Ovals.js'
import Swipeout from 'react-native-swipeout'
var RNFS = require('react-native-fs')
import realm from '../../realm'

class ListViewItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      program: this.props.program
    }
  }

  componentWillReceiveProps (props) {
    this.setState({
      program: props.program
    })
  }

  renderEdit (program) {
    if (this.props.canEdit) {
      return (
        <View style={styles.editContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => this.gotoEditProgram(program)}>
            <Text allowFontScaling={false} style={[GlobalStyles.span, styles.edit]}>Edit</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render () {
    let program = this.state.program
    var swipeoutBtns = [
      {
        component: 
          <View style={[styles.buttonContainer, styles.editContainer]}>
            <Text style={[GlobalStyles.text, styles.swipeoutText]}>Edit</Text>
          </View>
        ,
        onPress: () => this.gotoEditProgram(program)
      },
      {
        component: 
          <View style={[styles.buttonContainer, styles.deleteContainer]}>
            <Text style={[GlobalStyles.text, styles.swipeoutText]}>Delete</Text>
          </View>
        ,
        onPress: () => this.deleteProgram(program)
      }
    ]
    return (
      <Swipeout right={swipeoutBtns} backgroundColor='white' style={styles.swipeout}>
        <TouchableOpacity
          onPress={() => this.onPress()}
          style={[styles.programContainer, GlobalStyles.shadow, {backgroundColor: program.color, shadowColor: program.color}]}>
            <View style={styles.textView}>
              <Text allowFontScaling={false} style={[GlobalStyles.title, styles.programType]}>{program.programType}</Text>
              <Text allowFontScaling={false} style={[GlobalStyles.text, styles.musicName]}>{program.musicName}</Text>
            </View>
            {/*{this.renderEdit(program)}*/}
            <Ovals />
        </TouchableOpacity>
      </Swipeout>
    )
  }

  onPress () {
    var program = this.state.program
    this.props.canEdit ? this.gotoEditProgram(program) : this.gotoPlayProgram(program)
  }

  gotoPlayProgram (program) {
    if (!this.props.canEdit) {
      this.props.navigator.showModal({
        screen: 'app.PlayProgram',
        passProps: {id: program.id}
      })
    }
  }

  gotoEditProgram (program) {
    this.props.navigator.showModal({
      screen: 'app.EditProgram',
      passProps: {id: program.id}
    })
  }

  deleteProgram (program) {
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
}

const styles = StyleSheet.create({
  swipeout: {
    marginBottom: 20,
  },
  programContainer: {
    flex: 1,
    borderRadius: 8,
    flexDirection: 'row',
    padding: 22,
    overflow: 'hidden'
  },
  programType: {
    color: 'white',
    fontSize: 20,
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    zIndex: 100,
  },
  musicName: {
    marginTop: 5,
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 17,
    zIndex: 100,
  },
  color: {
    width: 15,
    height: 15,
    alignSelf: 'center',
    borderRadius: 15,
    marginRight: 20
  },
  tinyBurger: {
    alignSelf: 'center',
    marginRight: 20
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    width: 100
  },
  editContainer: {
    backgroundColor: '#ACABFF'
  },
  deleteContainer: {
    backgroundColor: '#FF7A72'
  },
  editButton: {
    width: 30,
    height: 30,
    marginLeft: 'auto',
  },
  edit: {
    marginTop: 15,
    color: 'white',
    backgroundColor: 'transparent',
  },
   swipeoutText: {
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Circular-Medium',
  },
})

module.exports = ListViewItem
