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

import SlidingUpPanel from 'rn-sliding-up-panel'
import GlobalStyles from '../../GlobalStyles'
import realm from '../../realm'
import Button from '../Shared/Button'
import Heading from '../Shared/Heading'
import store from 'react-native-simple-store'

const {height} = Dimensions.get('window')

class ProgramSlidingUpPanel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      canAddNewProgram: false
    }
  }

  componentWillMount () {
    store.get('user')
      .then(result => {
        var canAddNewProgram = result.hasSharedApp || realm.objects('Program').length === 0
        console.log('canAddNewProgram: ' + canAddNewProgram)
        this.setState({canAddNewProgram: canAddNewProgram})
        console.log('user exists')
      })
      .catch(error => {
        // if user is opening app for first time
        console.log(error)
        store
          .update('user', {
            hasSharedApp: false
          })
        this.setState({canAddNewProgram: realm.objects('Program').length === 0})
      })
  }

  renderAddNewProgramText () {
    if (!this.state.canAddNewProgram) {
      return (
        <TouchableOpacity onPress={() => this.shareApp()}>
          <Text style={[GlobalStyles.span, styles.lightSpan, styles.addNewProgramText]}>You are limited to 1 program.
          <Text style={styles.darkSpan}> Share this app with a friend </Text>
          to upload unlimited programs.</Text>
        </TouchableOpacity>
      )
    }
  }

  renderEditAndDeleteButton () {
    if (realm.objects('Program') === 0) {
      return (
        <TouchableOpacity
          style={styles.touchableOpacityView}
          onPress={() => this.editDeletePrograms()}>
          <View style={[styles.icon, styles.tinyBurgerContainer]}>
            <View style={[styles.burgerRectangle, styles.topBurgerRectangle]}>{/* Small rectangle underneath heading */}</View>
            <View style={[styles.burgerRectangle, styles.topBurgerRectangle]}>{/* Small rectangle underneath heading */}</View>
            <View style={styles.burgerRectangle}>{/* Small rectangle underneath heading */}</View>
          </View>
          <Text style={[GlobalStyles.title, styles.buttonText]}>Edit & delete programs</Text>
        </TouchableOpacity>
      )
    }
  }

  render () {
    var date = new Date()
    var year = date.getFullYear()
    var version = 0.01

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
            <Text style={[GlobalStyles.title, styles.buttonText]}>Tell a friend</Text>
          </TouchableOpacity>

          <View style={styles.versionAndCopyright}>
            <Text style={[GlobalStyles.span, styles.versionText]}>Windup v{version}</Text>
            <Text style={styles.copyright}>(c) {year} Olivia Chang. All Rights Reserved.</Text>
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
      url: 'https://windup.top',
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

  editDeletePrograms () {
    this._panel.transitionTo(0)
    this.props.toggleEdit()
  }

  gotoNewProgram () {
    console.log('went to new program from sliding up panel')
    this._panel.transitionTo(0)
    this.props.navigator.showModal({
      screen: 'app.NewProgram'
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
