import React from 'react'
import codePush from 'react-native-code-push'

let codePushOptions = { installMode: codePush.InstallMode.ON_NEXT_RESUME, checkFrequency: codePush.CheckFrequency.ON_APP_RESUME }
codePush(codePushOptions)(CodePushComponent)

export class CodePushComponent extends React.Component {
  render () {
    return null
  }
}

module.exports = CodePushComponent
