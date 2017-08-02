// IncrementControl.js
// Used in PlayProgram.js
import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

class BoolControl extends Component {
  constructor (props) {
    super(props)
    this.state = {
      enabled: this.props.enabled
    }
    this.onPress = this.onPress.bind(this)
  }

  onPress () {
    this.setState({enabled: !this.state.enabled})
    this.props.onPress()
  }

  render () {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={() => this.onPress()}>
        <View>
          <Text style={styles.amount}>{this.state.amount}{this.state.enabled ? '✓' : '✕'}</Text>
          <Text style={styles.caption}>{this.props.caption}</Text>
        </View>
      </TouchableOpacity>

    )
  }
}

const styles = StyleSheet.create({
  amount: {
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
    alignSelf: 'center',
    fontFamily: 'Circular-Medium'
  },
  caption: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'normal',
    alignSelf: 'center',
    fontFamily: 'Circular-Book'
  }
})

module.exports = BoolControl
