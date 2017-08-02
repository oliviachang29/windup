import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native'

import GlobalStyles from '../../GlobalStyles'

class FancyTextInput extends Component {
  render () {
    return (
      <View>
        <View style={[GlobalStyles.thinUnderline, styles.textInputContainer, this.props.viewStyle]}>
          <TextInput
            autoCapitalize='words'
            clearButtonMode={this.props.clearButtonMode}
            maxLength={this.props.maxLength}
            placeholder={this.props.placeholder}
            placeholderTextColor='#D8D8D8'
            onChangeText={this.props.onChangeText}
            onEndEditing={this.props.onEndEditing}
            onFocus={this.props.onFocus}
            onSubmitEditing={(event) => this.props.onSubmitEditing}
            ref={this.props.ref}
            returnKeyType={this.props.returnKeyType}
            style={[styles.textInput, this.props.textInputStyle]}
            value={this.props.value}
            />
          {/* Don't place anything inside this view. The view adds an underline to the Textinput. */}
        </View>
        <Text style={[GlobalStyles.span, styles.inputExampleText, this.props.exampleStyle]}>{this.props.example}</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  textInputContainer: {
    marginTop: 36,
    borderBottomColor: '#808080'
  },
  textInput: {
    height: 40,
    fontSize: 20,
    color: '#404040',
    fontFamily: 'Circular-Book'
  },
  inputExampleText: {
    marginTop: 5.5
  }
})

module.exports = FancyTextInput
