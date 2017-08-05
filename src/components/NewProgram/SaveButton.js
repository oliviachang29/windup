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
          style={[GlobalStyles.thickUnderline, styles.saveProgramButtonView, styles.saveProgramButtonEnabledView, this.props.viewStyle]}
          onPress={() => this.props.saveProgram()}>
          <Text style={[styles.saveProgramButton, styles.saveProgramButtonEnabledText, this.props.textStyle]}>Save</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <View style={[GlobalStyles.thickUnderline, styles.saveProgramButtonView, styles.saveProgramButtonDisabledView, this.props.viewStyle]}>
          <Text style={[styles.saveProgramButton, styles.saveProgramButtonDisabledText, this.props.textStyle]}>Save</Text>
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
    borderBottomWidth: 2
  },
  saveProgramButtonView: {
    marginTop: 50,
    width: 50,
    alignSelf: 'center'
  },
  saveProgramButtonEnabledView: {
    borderBottomColor: '#000000'
  },
  saveProgramButtonEnabledText: {
    color: '#000000'
  },
  saveProgramButtonDisabledView: {
    borderBottomColor: '#D8D8D8'
  },
  saveProgramButtonDisabledText: {
    color: '#D8D8D8'
  }
})

module.exports = SaveButton
