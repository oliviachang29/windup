import React, {Component} from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native'

import GlobalStyles from '../../GlobalStyles'
import Utils from '../../Utils'

class ShareWindup extends Component {
  render () {
    if (this.props.show) {
      return (
        <TouchableOpacity style={this.props.viewStyle} onPress={() => Utils.shareApp()}>
          <Text allowFontScaling={false} style={[GlobalStyles.span, styles.lightSpan, styles.addNewProgramText]}>You are limited to 1 program.
          <Text allowFontScaling={false} style={GlobalStyles.bold}> Share this app with a friend </Text>
          to upload unlimited programs.</Text>
        </TouchableOpacity>
      )
    } else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  addNewProgramText: {
    marginBottom: 30
  },
})

module.exports = ShareWindup
