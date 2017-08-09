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
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'

class Heading extends Component {
  constructor (props) {
    super(props)
    this.state = {
      programTypeIsTextInput: false,
      programType: this.props.programType,
      musicNameIsTextInput: false,
      musicName: this.props.musicName,
    }
  }

  renderProgramType () {
    if (this.state.programTypeIsTextInput) {
      return (
        <TextInput
          maxLength={22}
          style={[styles.heading, styles.headingTextInput]}
          onChangeText={(text) => this.setState({programType: text})}
          value={this.state.programType}
          onEndEditing={() => this.endEditing('programType')}
          onSubmitEditing={() => Keyboard.dismiss()}
          ref={(ref) => { this.programTypeTextInput = ref }}
          returnKeyType='done'
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
          maxLength={22}
          style={[styles.subheading, styles.musicNameTextInput]}
          onChangeText={(text) => this.setState({musicName: text})}
          value={this.state.musicName}
          onEndEditing={() => this.endEditing('musicName')}
          onSubmitEditing={() => Keyboard.dismiss()}
          ref={(ref) => { this.musicNameTextInput = ref }}
          returnKeyType='done'
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

  endEditing (textInputToChange) {
    console.log('end editing')
    if (textInputToChange === 'programType') {
      this.setState({programTypeIsTextInput: false})
      this.props.changeProgramType(this.state.programType)
    } else if (textInputToChange === 'musicName') {
      this.setState({musicNameIsTextInput: false})
      this.props.changeMusicName(this.state.musicName)
    }
    this.props.navigator.showInAppNotification({
      screen: 'app.Notification',
      passProps: {
        title: '✓ All changes saved.',
        type: 'success'
      }
    })
  }
}

const styles = StyleSheet.create({
  nav: {
    flex: 1.5,
    flexDirection: 'row'
  },
  headingCol: {
    flex: 200
  },
  xCol: {
    marginLeft: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-end'
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
    fontFamily: 'Circular-Book',
    height: 30
    // flex: 1
  },
  length: {
    flex: 1
  },
  musicNameTextInput: {
    height: 30,
    flex: 1,
    fontFamily: 'Circular-Book'
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
