import {Platform} from 'react-native'
import {Navigation} from 'react-native-navigation'
import registerScreens from './screens'
import codePush from 'react-native-code-push'
import { Sentry } from 'react-native-sentry'

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

if (!__DEV__) {
  Sentry.config('https://58aa46d2e869409b8a80da18099d7223:58d703284c654c718d9df1ca4020b25b@sentry.io/193664').install()
  codePush.getUpdateMetadata().then((update) => {
    if (update) {
      Sentry.setVersion('codepush:' + update.label);
    }
  })
}

codePush.notifyAppReady()
