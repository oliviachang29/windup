import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

import GlobalStyles from '../../GlobalStyles'

class SaveButton extends Component {
  render () {
    if (this.props.canSave) {
      return (
        <TouchableOpacity
          style={[GlobalStyles.shadow, styles.saveProgramButtonView, styles.saveProgramButtonEnabledView, this.props.viewStyle]}
          onPress={() => this.props.saveProgram()}>
          <Text allowFontScaling={false} style={[styles.saveProgramButton, styles.saveProgramButtonEnabledText, this.props.textStyle]}>Save</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <View style={[styles.saveProgramButtonView, styles.saveProgramButtonDisabledView, this.props.viewStyle]}>
          <Text allowFontScaling={false} style={[styles.saveProgramButton, styles.saveProgramButtonDisabledText, this.props.textStyle]}>Save</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  saveProgramButton: {
    fontSize: 20,
    fontFamily: 'Circular-Bold',
    alignSelf: 'center',
    color: 'white'
  },
  saveProgramButtonView: {
    width: '100%',
    marginTop: 50,
    padding: 15,
    paddingLeft: 100,
    paddingRight: 100,
    alignSelf: 'center',
    backgroundColor: '#ACABFF',
    shadowColor: '#ACABFF',
    borderRadius: 8
  },
  saveProgramButtonEnabledView: {
    opacity: 1
  },
  saveProgramButtonDisabledView: {
    opacity: 0.2
  },
})

module.exports = SaveButton
