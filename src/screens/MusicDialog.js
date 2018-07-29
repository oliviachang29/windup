import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native'
import Button from '../components/Shared/Button'
import Heading from '../components/Shared/Heading'
import ScrollViewTitle from '../components/Shared/ScrollViewTitle'
import GlobalStyles from '../GlobalStyles'
import Utils from '../Utils'
import store from 'react-native-simple-store'
import realm from '../realm'

class MusicDialog extends Component {
  static navigatorStyle = Utils.scrollViewTitleNavStyle()

  gotoNewProgram () {
    this.props.navigator.showModal({
      screen: 'app.NewProgram',
      title: 'New Program',
      passProps: {
        receiveFile: false
      }
    })
  }

  openHelp () {
    this.props.navigator.showModal({
      screen: 'app.Help',
      title: 'Help',
      passProps: {
        helpWithImporting: true,
        onYourPhone: true
      }
    })
  }

  render () {
    return (
      <ScrollViewTitle
        navigator={this.props.navigator}
        items={
          <View style={[GlobalStyles.container, GlobalStyles.innerContainer]}>
            <Heading heading='New Program' onPressX={() => this.props.navigator.dismissModal()} />
            <Image source={require('../assets/images/music-dialog.png')} style={GlobalStyles.image} resizeMode="contain"/>
            <Text style={[GlobalStyles.title, styles.title]}>Where is your music stored?</Text>
            <Button
              color="#FF7A72"
              viewStyle={GlobalStyles.buttonView}
              onPress={() => this.gotoNewProgram()}
              text='In a file sharing app'
              miniText='iCloud Drive, Google Drive, OneDrive' />
            <Button
              color="#ACABFF"
              viewStyle={GlobalStyles.buttonView}
              onPress={() => this.openHelp()}
              text='Somewhere else'
              miniText="Email, Notes, Safari, Voice Memos" />
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
