import {
  Share
} from 'react-native'
import store from 'react-native-simple-store'
import realm from './realm'
import {GoogleAnalyticsTracker} from "react-native-google-analytics-bridge";

let tracker = new GoogleAnalyticsTracker("UA-75863150-7");

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

  // NAVIGATION
  navStyle() {
  	return {
  		navBarHidden: false,
  		navBarTextColor: "#00000000",
  		navBarTransparent: true,
  		navBarTextFontFamily: 'Circular-Medium',
      navBarNoBorder: true
	  }
  },
  navButtons() {
    return {
      rightButtons: [{
        title: 'Close',
        id: 'close',
        buttonColor: 'black',
        buttonFontSize: 14,
        buttonFontFamily: 'Circular-Medium'
      }]
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
  // Google analytics
  createSession(screenName) {
    console.log("Google Analytics: created Session with name " + screenName);
    tracker.createNewSession("ProgramList");
  },
  trackScreen(screenName) {
    console.log("Google Analytics: tracked screen with name " + screenName);
    tracker.trackScreenView(screenName);
  },
  trackEvent(screenName, eventName) {
    console.log("Google Analytics: tracked event with name " + eventName + " from screen " + screenName);
    tracker.trackEvent(screenName, eventName);
  }
}

module.exports = Utils
