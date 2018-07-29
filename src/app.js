import {Platform} from 'react-native'
import {Navigation} from 'react-native-navigation'
import registerScreens from './screens'
// import codePush from 'react-native-code-push'
registerScreens()

Navigation.startSingleScreenApp({
  screen: {
    screen: 'app.ProgramList',
    title: 'Programs',
  },
  navigatorStyle: { 
	  navBarHidden: false, 
	  navBarTextFontFamily: 'Circular-Medium'
  } 
})

// codePush.notifyAppReady()