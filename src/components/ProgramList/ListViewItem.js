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
    return (
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
      passProps: {program}
    })
  }
}

const styles = StyleSheet.create({
  programContainer: {
    flex: 1,
    borderRadius: 8,
    flexDirection: 'row',
    padding: 22,
    marginBottom: 20,
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
  editContainer: {
    flex: 1
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
})

module.exports = ListViewItem
