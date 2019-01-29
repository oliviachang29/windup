import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Share
} from 'react-native'
import Button from '../components/Shared/Button'
import ShareWindup from '../components/Shared/ShareWindup'
import GlobalStyles from '../GlobalStyles'
import Utils from '../Utils'
import store from 'react-native-simple-store'
import realm from '../realm'

class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      canAddNewProgram: true
    }
  }
  
  componentDidMount () {
     store.get('user') 
      .then(result => { 
        var canAddNewProgram = result.hasSharedApp || realm.objects('Program').length === 0 
        this.setState({canAddNewProgram: canAddNewProgram}) 
      }) 
      .catch(error => { 
        console.log(error) 
        store 
          .update('user', { 
            hasSharedApp: false 
          }) 
        this.setState({canAddNewProgram: realm.objects('Program').length === 0}) 
      }) 
  }

  // I know it's disgusting, exact same code as ShareWindup, but I couldn't get it to work
  shareApp() {
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
                                  'com.apple.UIKit.activity.AirDrop']
        })
      .then(result => {
        if (result.action === 'sharedAction') {
          store.save('user', {
            hasSharedApp: true
          })
          Utils.trackEvent(screen, "shared windup")
          this.setState({canAddNewProgram: true})
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  gotoMusicDialog () {
    Utils.trackEvent("app.Menu", "opened app.NewProgram from app.Menu")
    this.props.navigator.dismissLightBox()
    this.props.navigator.showModal({
      screen: 'app.MusicDialog',
      title: 'New Program'
    })
  }

  gotoHelp () {
    Utils.trackEvent("app.Menu", "opened app.Help from app.Menu")
    this.props.navigator.dismissLightBox()
    this.props.navigator.showModal({
      screen: 'app.Help',
      title: 'Help'
    })
  }

  render () {
    return (
      <View style={GlobalStyles.menu}>
        <View style={styles.addNewProgramView}>
          <Button
            color="#FF7A72"
            disabled={!this.state.canAddNewProgram}
            viewStyle={GlobalStyles.buttonView}
            onPress={() => this.gotoMusicDialog()}
            text='New program' />
          <ShareWindup
            show={!this.state.canAddNewProgram}
            screen="app.Menu"
            canAddNewProgram={() => this.setState({canAddNewProgram: true})} />
        </View>
        <Button
          color="#ACABFF"
          viewStyle={GlobalStyles.buttonView}
          onPress={() => this.shareApp()}
          text='Tell a friend' />
        <Button
          color="#48C6EF"
          viewStyle={GlobalStyles.buttonView}
          onPress={() => this.gotoHelp()}
          text='Help' />
        <Button
          color="#566270"
          viewStyle={GlobalStyles.buttonView}
          onPress={() => this.props.navigator.dismissLightBox()}
          text='Close menu' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  addNewProgramView: {
    flexDirection: 'column'
  },
})

module.exports = Menu
