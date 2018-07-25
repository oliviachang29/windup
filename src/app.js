import {Platform} from 'react-native'
import {Navigation} from 'react-native-navigation'
import registerScreens from './screens'
registerScreens()

Navigation.startSingleScreenApp({
  screen: {
    screen: 'app.ProgramList',
    title: 'Programs',
    navigatorStyle: {
      navBarHidden: true,
      navBarTextFontFamily: 'Circular-Medium',
    }
  }
})