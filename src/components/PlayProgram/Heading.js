// IncrementControl.js
// Used in PlayProgram.js
import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'

class Heading extends Component {
  constructor (props) {
    super(props)
    this.state = {
      programTypeIsTextInput: false,
      programType: this.props.programType,
      previousProgramType: '',
      musicNameIsTextInput: false,
      musicName: this.props.musicName,
      previousMusicName: ''
    }
  }

  renderProgramType () {
    if (this.state.programTypeIsTextInput) {
      return (
        <TextInput
          maxValue={20}
          style={[styles.heading, styles.headingTextInput]}
          onChangeText={(text) => this.setState({previousProgramType: this.state.programType, programType: text})}
          value={this.state.programType}
          onEndEditing={() => this.checkIfNewValueIsValid('programType')}
          ref={(ref) => { this.programTypeTextInput = ref }}
         />
      )
    } else {
      return (
        <TouchableWithoutFeedback onLongPress={() => this.openTextInput('programType')}>
          <View>
            <Text style={styles.heading}>{this.state.programType}</Text>
          </View>
        </TouchableWithoutFeedback>
      )
    }
  }

  renderMusicName () {
    if (this.state.musicNameIsTextInput) {
      return (
        <TextInput
          maxValue={15}
          style={[styles.subheading, styles.musicNameTextInput]}
          onChangeText={(text) => this.setState({previousMusicName: this.state.musicName, musicName: text})}
          value={this.state.musicName}
          onEndEditing={() => this.checkIfNewValueIsValid('musicName')}
          ref={(ref) => { this.musicNameTextInput = ref }}
         />
      )
    } else {
      return (
        <TouchableWithoutFeedback onLongPress={() => this.openTextInput('musicName')}>
          <View style={styles.musicNameView}>
            <Text style={styles.subheading}>{this.state.musicName}</Text>
          </View>
        </TouchableWithoutFeedback>
      )
    }
  }

  render () {
    return (
      <View style={styles.nav}>
        <View style={styles.headingCol}>
          {this.renderProgramType()}
          <View style={styles.subheadingView}>
            {this.renderMusicName()}
            <Text style={[styles.subheading, styles.length]}> • {this.props.length}</Text>
          </View>
          <View style={styles.whiteRectangle}>{/* Small rectangle underneath heading */}</View>
        </View>
        <TouchableOpacity onPress={() => this.props.gotoProgramList()} style={styles.xCol}>
          <Image source={require('../../assets/images/white-x.png')} style={styles.x} />
        </TouchableOpacity>
      </View>
    )
  }

  openTextInput (textInputToChange) {
    if (textInputToChange === 'programType') {
      this.setState({programTypeIsTextInput: true})
      this.programTypeTextInput.focus()
    } else if (textInputToChange === 'musicName') {
      this.setState({musicNameIsTextInput: true})
      this.musicNameTextInput.focus()
    }
  }

  checkIfNewValueIsValid (textInputToChange) {
    if (textInputToChange === 'programType') {
      // Check if it is only made of spaces
      if (!this.state.programType.replace(/\s/g, '')) {
        // If so, then set back to the last letter
        this.setState({programType: this.state.previousProgramType})
      }
      this.setState({programTypeIsTextInput: false})
      this.props.changeProgramType(this.state.programType)
    } else if (textInputToChange === 'musicName') {
      if (!this.state.musicName.replace(/\s/g, '')) {
        this.setState({musicName: this.state.previousMusicName})
      }
      this.setState({musicNameIsTextInput: false})
      this.props.changeMusicName(this.state.musicName)
    }
  }
}

const styles = StyleSheet.create({
  nav: {
    flex: 1.5,
    flexDirection: 'row'
  },
  headingCol: {
    flex: 7
  },
  xCol: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 20,
    alignItems: 'flex-end'
  },
  heading: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: 'Circular-Bold'
  },
  headingTextInput: {
    height: 30,
    fontFamily: 'Circular-Bold'
  },
  subheadingView: {
    flexDirection: 'row',
    marginTop: 6
  },
  subheading: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: 'Circular-Book'
    // flex: 1
  },
  length: {
    flex: 1
  },
  musicNameTextInput: {
    height: 30,
    flex: 1,
    fontFamily: 'Circular-Bold'
  },
  whiteRectangle: {
    width: 42,
    height: 4,
    backgroundColor: '#FFF',
    borderRadius: 100,
    marginTop: 26
  }
})

module.exports = Heading
