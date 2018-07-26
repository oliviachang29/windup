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
import store from 'react-native-simple-store'
import realm from '../realm'

const height = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

class Menu extends Component {
  constructor (props) {
    super(props)
    this.checkIfCanAddNewProgram = this.checkIfCanAddNewProgram.bind(this)
    this.state = {
      canAddNewProgram: false
    }
  }
  componentWillMount () {
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

  checkIfCanAddNewProgram () {
    /*
    Used to be that it would only reload canAddNewProgram after the user closed/opened
    the app, but now it checks on every render (). It doesn't slow down performance too much as
    it only calls store if both these conditions are met.
    */

    if (this.state.canAddNewProgram && realm.objects('Program').length > 0) {
      store.get('user')
        .then(result => {
          if (!result.hasSharedApp) {
            this.setState({canAddNewProgram: false})
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  renderAddNewProgramText () {
    if (!this.state.canAddNewProgram) {
      return (
        <TouchableOpacity onPress={() => this.shareApp()}>
          <Text allowFontScaling={false} style={[GlobalStyles.span, styles.lightSpan, styles.addNewProgramText]}>You are limited to 1 program.
          <Text allowFontScaling={false} style={GlobalStyles.bold}> Share this app with a friend </Text>
          to upload unlimited programs.</Text>
        </TouchableOpacity>
      )
    }
  }

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
                                'com.apple.UIKit.activity.Aidrop']
      })
    .then(result => {
      if (result.action === 'sharedAction') {
        store.save('user', {
          hasSharedApp: true
        })
        this.setState({canAddNewProgram: true})
      }
    })
    .catch(err => console.log(err))
  }

  gotoNewProgram () {
    this.props.navigator.dismissLightBox()
    this.props.navigator.showModal({
      screen: 'app.NewProgram'
    })
  }

  gotoHelp () {
    this.props.navigator.dismissLightBox()
    this.props.navigator.showModal({
      screen: 'app.Help'
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.addNewProgramView}>
          <Button
            color="#FF7A72"
            disabled={!this.state.canAddNewProgram}
            viewStyle={styles.buttonView}
            onPress={() => this.gotoNewProgram()}
            text='New program' />
          {this.renderAddNewProgramText()}
        </View>
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
  addNewProgramView: {
    flexDirection: 'column'
  },
  addNewProgramText: {
    marginBottom: 30
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
