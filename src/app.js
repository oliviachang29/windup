import {Platform} from 'react-native'
import {Navigation} from 'react-native-navigation'
import registerScreens from './screens'
import codePush from 'react-native-code-push'
import Utils from './Utils'

registerScreens()

Navigation.startSingleScreenApp({
  screen: {
    screen: 'app.ProgramList',
    title: 'Programs',
  },
  navigatorStyle: Utils.navStyle(),
  animationType: 'fade'
})

codePush.notifyAppReady()