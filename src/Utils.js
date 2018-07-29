import {
  Share
} from 'react-native'
import store from 'react-native-simple-store'
import realm from './realm'

let Utils = {
  colors() {
    return ['#FF708D', '#F4A04F', '#3BC1A5', '#64B0D6', '#4E8794', '#6A78B7', '#B58CBE', '#C493BB', '#9013FE', "#EE7785", "#84B1ED", "#60c5ba", "#9013FE", "#6a60a9"]
  },
  secondsToTime (seconds) {
    var secNum = parseInt(seconds, 10) // don't forget the second param
    var hours = Math.floor(secNum / 3600)
    var minutes = Math.floor((secNum - (hours * 3600)) / 60)
    var newSeconds = secNum - (hours * 3600) - (minutes * 60)

    if (newSeconds < 10) { newSeconds = '0' + newSeconds }
    return minutes + ':' + newSeconds
  },
  scrollViewTitleNavStyle() {
  	return {
  		navBarHidden: false,
  		navBarTextColor: "#00000000",
  		navBarTransparent: true,
  		navBarTextFontFamily: 'Circular-Medium',
      navBarNoBorder: true
	  }
  },
  // For the fading title animation
  handleScroll (event, navigator) {
     var offset = event.nativeEvent.contentOffset.y
     if (offset > 50) {
      // show
      navigator.setStyle({
        navBarTextColor: "#000000",
        navBarTransparent: false,
      })
    } else if (offset > 1) {
      // opacity transition
      navigator.setStyle({
        navBarTextColor: "#000000" + Math.round((event.nativeEvent.contentOffset.y / 50)*100),
        navBarTransparent: true,
      })
    } else {
      // hide
      navigator.setStyle({
        navBarTextColor: "#00000000",
        navBarTransparent: true,
      })
     }
  },
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
}

module.exports = Utils
