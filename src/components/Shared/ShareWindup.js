import React, {Component} from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Share
} from 'react-native'

import store from 'react-native-simple-store'
import GlobalStyles from '../../GlobalStyles'

class ShareWindup extends Component {
  shareApp () {
    // TODO: change
    Share.share({
      message: 'Hey! I just found a great app for delaying and repeating figure skating music. You should download it too!',
      url: 'https://appsto.re/us/0S1Llb.i'
    },
      {
        excludedActivityTypes: ['com.apple.reminders.RemindersEditorExtension',
                                'com.apple.mobilenotes.SharingExtension',
                                'com.apple.mobileslideshow.StreamShareService',
                                'com.apple.UIKit.activity.CopyToPasteboard',
                                'com.apple.UIKit.activity.Print',
                                'com.apple.UIKit.activity.AddToReadingList',
                                'com.apple.UIKit.activity.Airdrop']
      })
    .then(result => {
      if (result.action === 'sharedAction') {
        store.save('user', {
          hasSharedApp: true
        })
        this.props.canAddNewProgram()
      }
    })
    .catch(err => console.log(err))
  }

  render () {
    if (this.props.show) {
      return (
        <TouchableOpacity style={this.props.viewStyle} onPress={() => this.shareApp()}>
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
