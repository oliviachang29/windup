import React, {Component} from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native'

import GlobalStyles from '../../GlobalStyles'
import Ovals from './Ovals.js'

class Button extends Component {
  render () {
    var viewStyle = this.props.disabled ? styles.disabledContainer : [styles.enabledContainer, this.props.enabledViewStyle]
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress()}
        disabled={this.props.disabled}
        style={[
          styles.container, 
          GlobalStyles.shadow,
          (this.props.disabled ? {backgroundColor: this.props.color + "25"} : {backgroundColor: this.props.color}),
          {shadowColor: this.props.color},
          this.props.viewStyle,
          ]}>
        {!this.props.icon ? null : this.props.icon}
        <Text allowFontScaling={false} style={[!this.props.disabled ? GlobalStyles.title : GlobalStyles.text, styles.text, this.props.textStyle]}>{this.props.text}</Text>
        {!this.props.miniText ? null :
          <Text allowFontScaling={false} style={[!this.props.disabled ? GlobalStyles.title : GlobalStyles.text, styles.text, styles.miniText, this.props.miniTextStyle]}>{this.props.miniText}</Text>
        }
        <Ovals />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'white'
  },
  container: {
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden'
  },
  disabledContainer: {
    opacity: 0.2
  },
  enabledContainer: {
    opacity: 1,
  },
  miniText: {
    fontSize: 15,
    marginTop: 5
  }
})

module.exports = Button
