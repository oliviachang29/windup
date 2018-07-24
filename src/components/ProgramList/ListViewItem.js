import React, {Component} from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native'
import GlobalStyles from '../../GlobalStyles'
import LinearGradient from 'react-native-linear-gradient'

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
          onLongPress={() => this.toggleEdit()}
          style={[styles.programContainer, styles.shadow, {shadowColor: program.color1}]}>
          <LinearGradient 
            colors={[program.color1, program.color2]} 
            style={styles.linearGradient}
            start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}>
          <View style={styles.textView}>
              <Text allowFontScaling={false} style={[GlobalStyles.title, styles.programType]}>{program.programType}</Text>
              <Text allowFontScaling={false} style={[GlobalStyles.text, styles.musicName]}>{program.musicName}</Text>
            </View>
            {this.renderEdit(program)}
          </LinearGradient>
        </TouchableOpacity>
    )
  }

  onPress () {
    var program = this.state.program
    this.props.canEdit ? this.gotoEditProgram(program) : this.gotoPlayProgram(program)
  }

  toggleEdit () {
    if (!this.props.canEdit) {
      this.props.toggleEdit()
    }
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
  linearGradient: {
    flex: 1,
    padding: 22,
    borderRadius: 8,
    flexDirection: 'row',
  },
  shadow: {
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 10,
    shadowOpacity: 0.3
  },
  programContainer: {
    flex: 1,
    borderRadius: 8,
    flexDirection: 'row',
    // marginTop: 20,
    marginBottom: 20
    // backgroundColor: 'white'
  },
  programType: {
    color: 'white',
    fontSize: 20,
    backgroundColor: 'transparent',
    fontWeight: 'bold'
  },
  musicName: {
    marginTop: 5,
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 14
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
  }
})

module.exports = ListViewItem
