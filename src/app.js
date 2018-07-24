import {Platform} from 'react-native'
import {Navigation} from 'react-native-navigation'
import registerScreens from './screens'
// screen related book keeping
registerScreens()

Navigation.startSingleScreenApp({
  screen: {
    screen: 'app.ProgramList',
    title: 'Programs',
    navigatorStyle: {
      navBarHidden: true,
      statusBarBlur: true
    }
  },
  animationType: 'fade'
})