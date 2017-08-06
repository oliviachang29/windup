import React, {Component} from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native'
import GlobalStyles from '../../GlobalStyles'
import Swipeout from 'react-native-swipeout'

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
            <Text style={[GlobalStyles.span, styles.edit]}>Edit</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render () {
    let program = this.state.program
    var swipeoutBtns = [
      {
        backgroundColor: '#808080',
        component: <Text style={styles.swipeoutText}>Edit</Text>,
        onPress: () => this.gotoEditProgram(program)
      }
    ]

    return (
      <Swipeout right={swipeoutBtns} backgroundColor='white' style={styles.swipeout} disabled={this.props.canEdit}>
        <TouchableOpacity
          onPress={() => this.onPress()}
          onLongPress={() => this.toggleEdit()}
          style={styles.programContainer}>
          <View style={[styles.color, {backgroundColor: program.color}]} />
          <View style={styles.textView}>
            <Text style={GlobalStyles.title}>{program.programType}</Text>
            <Text style={[GlobalStyles.text, styles.musicName]}>{program.musicName}</Text>
          </View>
          {this.renderEdit(program)}
        </TouchableOpacity>
      </Swipeout>
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
        passProps: {program}
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
  swipeout: {
    marginBottom: 49
  },
  programContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  musicName: {
    marginTop: 7
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
  swipeoutText: {
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Circular-Medium',
    marginTop: 18
  },
  editContainer: {
    flex: 1
  },
  editButton: {
    width: 30,
    height: 30,
    marginLeft: 'auto'
  },
  edit: {
    marginTop: 15
  }
})

module.exports = ListViewItem
