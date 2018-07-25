import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Share,
  Dimensions
} from 'react-native'
import Button from '../components/Shared/Button'
import GlobalStyles from '../GlobalStyles'
const height = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
class Menu extends Component {
  shareApp () {
    // TODO: change
    Share.share({
      message: 'Hey! I just found this super cool app for playing figure skating, gymnastics, and dance routines. You should download it too!',
      url: 'https://appsto.re/us/0S1Llb.i'
    },
      {
        excludedActivityTypes: ['com.apple.reminders.RemindersEditorExtension',
                                'com.apple.mobilenotes.SharingExtension',
                                'com.apple.mobileslideshow.StreamShareService',
                                'com.apple.UIKit.activity.CopyToPasteboard',
                                'com.apple.UIKit.activity.Print',
                                'com.apple.UIKit.activity.AddToReadingList',
                                'com.apple.UIKit.activity.Aidrop']
      })
  }

  gotoNewProgram () {
    this.props.navigator.showModal({
      screen: 'app.NewProgram'
    })
  }

  gotoHelp () {
    this.props.navigator.showModal({
      screen: 'app.Help'
    })
  }

  render () {
    return (
      <View style={styles.container}>
          <Button
            color="#FF7A72"
            viewStyle={styles.buttonView}
            onPress={() => this.gotoNewProgram()}
            text='New program' />
          <Button
            color="#ACABFF"
            viewStyle={styles.buttonView}
            onPress={() => this.shareApp()}
            // icon={<Image source={require('../assets/images/share.png')} style={styles.icon}/>}
            text='Tell a friend' />
          <Button
            color="#48C6EF"
            viewStyle={styles.buttonView}
            onPress={() => this.gotoHelp()}
            text='Help' />
          <TouchableOpacity onPress={() => this.props.navigator.dismissLightBox()} style={styles.xContainer}>
            <Image source={require('../assets/images/gray-x.png')} style={styles.x} />
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 45,
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderRadius: 8,
    width: deviceWidth * .9
  },
  lightSpan: {
    color: '#B7B7B7'
  },
  darkSpan: {
    color: '#808080'
  },
  buttonView: {
    flexDirection: 'row',
    marginBottom: 20
  },
  icon: {
    marginRight: 15,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  x: {
    marginTop: 15,
    alignSelf: 'center'
  }
})

module.exports = Menu
