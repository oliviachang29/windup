import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

class Message extends Component {
  render () {
    var textStyle = [this.props.type === 'error' ? styles.errorText : styles.successText, styles.text]
    if (this.props.message) {
      return (
        <Text style={[textStyle, this.props.style]}>{this.props.message}</Text>
      )
    } else {
      return (
        <View>{/* return nothing */}</View>
      )
    }
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: 'Circular-Book'
  },
  errorText: {
    color: '#D93858'
  },
  successText: {
    color: '#86CB92'
  }
})

module.exports = Message
