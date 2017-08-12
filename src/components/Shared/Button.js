import React, {Component} from 'react'
import {
  Text,
  TouchableOpacity
} from 'react-native'

import GlobalStyles from '../../GlobalStyles'

class Button extends Component {
  render () {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress()}
        disabled={this.props.disabled}
        style={this.props.viewStyle}>
        <Text allowFontScaling={false} style={[!this.props.disabled ? GlobalStyles.title : GlobalStyles.text, this.props.textStyle]}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}

module.exports = Button
