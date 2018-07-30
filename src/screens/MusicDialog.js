import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Share,
  Platform
} from 'react-native'
import Button from '../components/Shared/Button'
import Heading from '../components/Shared/Heading'
import ScrollViewTitle from '../components/Shared/ScrollViewTitle'
import GlobalStyles from '../GlobalStyles'
import Utils from '../Utils'
import store from 'react-native-simple-store'
import realm from '../realm'
import FastImage from 'react-native-fast-image'

const majorVersionIOS = parseInt(Platform.Version, 10);
const aboveiOS11 = majorVersionIOS >= 11
const fileStorageText = "In a file storage app"

class MusicDialog extends Component {
  static navigatorStyle = Utils.navStyle()

  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  gotoNewProgram () {
    this.props.navigator.showModal({
      screen: 'app.NewProgram',
      title: 'New Program',
      passProps: {
        receiveFile: false
      }
    })
  }

  openHelp (props) {
    this.props.navigator.showModal({
      screen: 'app.Help',
      title: 'Help',
      passProps: props
    })
  }

  render () {
    return (
      <ScrollViewTitle
        navigator={this.props.navigator}
        items={
          <View style={[GlobalStyles.container, GlobalStyles.innerContainer]}>
            <Heading heading='New Program' onPressX={() => this.props.navigator.dismissModal()} />
            <FastImage source={require('../assets/images/music-dialog.png')} style={GlobalStyles.image} resizeMode={FastImage.resizeMode.contain}/>
            <Text style={[GlobalStyles.title, styles.title]}>Where is your music stored?</Text>
            <Button
              color="#FF7A72"
              viewStyle={GlobalStyles.buttonView}
              onPress={() => this.gotoNewProgram()}
              text={aboveiOS11 ? "In the Files app" : fileStorageText}
              miniText={aboveiOS11 ? "iCloud Drive, and other file storage apps if you've enabled them" : "iCloud Drive, Google Drive, Dropbox"} />
            {!aboveiOS11 ? null : 
              <Button
              color="#ACABFF"
              viewStyle={GlobalStyles.buttonView}
              onPress={() => this.openHelp({fileStorageApp: true})}
              text={fileStorageText}
              miniText={"Google Drive, Dropbox, OneDrive"} />
            }
            <Button
              color="#48C6EF"
              viewStyle={GlobalStyles.buttonView}
              onPress={() => this.openHelp({somewhereElse: true})}
              text='Somewhere else'
              miniText="Email, Notes, Voice Memos" />
          </View>
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 30,
    textAlign: 'center'
  }
})

module.exports = MusicDialog
