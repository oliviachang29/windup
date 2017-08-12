import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Share
} from 'react-native'

import SlidingUpPanel from '../rn-sliding-up-panel/SlidingUpPanel.js'
import GlobalStyles from '../../GlobalStyles'
import realm from '../../realm'
import Button from '../Shared/Button'
import store from 'react-native-simple-store'

const {height} = Dimensions.get('window')

class ProgramSlidingUpPanel extends Component {
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
          <Text allowFontScaling={false} style={styles.darkSpan}> Share this app with a friend </Text>
          to upload unlimited programs.</Text>
        </TouchableOpacity>
      )
    }
  }

  renderEditAndDeleteButton () {
    if (realm.objects('Program').length >  0) {
      return (
        <TouchableOpacity
          style={styles.touchableOpacityView}
          onPress={() => this.editDeletePrograms()}>
          <View style={[styles.icon, styles.tinyBurgerContainer]}>
            <View style={[styles.burgerRectangle, styles.topBurgerRectangle]}>{/* Small rectangle underneath heading */}</View>
            <View style={[styles.burgerRectangle, styles.topBurgerRectangle]}>{/* Small rectangle underneath heading */}</View>
            <View style={styles.burgerRectangle}>{/* Small rectangle underneath heading */}</View>
          </View>
          <Text allowFontScaling={false} style={[GlobalStyles.title, styles.buttonText]}>Edit programs</Text>
        </TouchableOpacity>
      )
    }
  }

  render () {
    var date = new Date()
    var year = date.getFullYear()
    var version = "1.0.1"

    this.checkIfCanAddNewProgram()

    return (
      <SlidingUpPanel
        ref={c => this._panel = c}
        visible={this.props.visible}
        allowDragging
        draggableRange={{top: height, bottom: height - 100}}
        onDragEnd={() => this.onDragEnd()}
        onRequestClose={() => this.props.onChangeVisibility(false)}>
        <View style={styles.panel}>

          <TouchableOpacity onPress={() => this._panel.transitionTo(0)}>
            <View style={styles.closeRectangle}>
              <View style={styles.smallRectangle}>{/* Small rectangle */}</View>
            </View>
          </TouchableOpacity>

          <View style={[styles.touchableOpacityView, styles.addNewProgramView]}>
            <Button
              onPress={() => this.gotoNewProgram()}
              disabled={!this.state.canAddNewProgram}
              text='+ Add new program' />
            {this.renderAddNewProgramText()}
          </View>

          {this.renderEditAndDeleteButton()}

          <TouchableOpacity
            style={styles.touchableOpacityView}
            onPress={() => this.shareApp()}>
            <Image source={require('../../assets/images/share.png')} style={styles.icon} />
            <Text allowFontScaling={false} style={[GlobalStyles.title, styles.buttonText]}>Tell a friend</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchableOpacityView}
            onPress={() => this.gotoHelp()}>
            <View style={[styles.icon, styles.helpIcon]}>
              <Text allowFontScaling={false} style={styles.helpIconText}>?</Text>
            </View>
            <Text allowFontScaling={false} style={[GlobalStyles.title, styles.buttonText]}>Help</Text>
          </TouchableOpacity>

          <View style={styles.versionAndCopyright}>
            <Text allowFontScaling={false} style={styles.copyright}>Windup v{version}</Text>
            <Text allowFontScaling={false} style={styles.copyright}>(c) {year} Olivia Chang</Text>
          </View>
        </View>
      </SlidingUpPanel>
    )
  }

  onDragEnd () {
    if (this.props.visible) {
      this._panel.transitionTo(height)
    }
  }

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

  reviewInAppStore () {
    AppStoreReview.requestReview('1268210484')
  }

  editDeletePrograms () {
    this._panel.transitionTo(0)
    this.props.toggleEdit()
  }

  gotoNewProgram () {
    this._panel.transitionTo(0)
    this.props.navigator.showModal({
      screen: 'app.NewProgram'
    })
  }

  gotoHelp () {
    this._panel.transitionTo(0)
    this.props.navigator.showModal({
      screen: 'app.Help'
    })
  }
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: 'white',
    borderTopColor: '#95989A',
    borderTopWidth: 2,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 50,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.26,
    shadowRadius: 20
  },
  smallRectangle: {
    alignSelf: 'center',
    backgroundColor: '#E6E6E6',
    height: 4,
    width: 42,
    borderRadius: 100,
    shadowColor: '#000'
  },
  closeRectangle: {
    alignSelf: 'center',
    paddingTop: 20,
    paddingLeft: 200,
    paddingRight: 200,
    paddingBottom: 40
  },
  addNewProgramView: {
    flexDirection: 'column'
  },
  addNewProgramText: {
    marginTop: 20
  },
  lightSpan: {
    color: '#B7B7B7'
  },
  darkSpan: {
    color: '#808080'
  },
  touchableOpacityView: {
    flexDirection: 'row',
    marginBottom: 30
  },
  icon: {
    marginRight: 15,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  burgerRectangle: {
    backgroundColor: '#95989A',
    height: 2,
    width: 12.46,
    borderRadius: 100
  },
  topBurgerRectangle: {
    marginBottom: 2.5
  },
  helpIcon: {
    width: 25,
    height: 25,
    borderColor: '#95989A',
    borderWidth: 1.5,
    borderRadius: 100,
    alignItems: 'center'
  },
  helpIconText: {
    color: '#95989A',
    fontFamily: 'Circular-Bold'
  },
  buttonText: {
    flex: 10
  },
  buttonText: {
    flex: 10
  },
  versionAndCopyright: {
    // alignItems: 'center',
    marginTop: 25
  },
  copyright: {
    color: '#808080',
    fontFamily: 'Circular-Book',
    fontSize: 10,
    marginTop: 10,
    marginBottom: 0
  }
})

module.exports = ProgramSlidingUpPanel
