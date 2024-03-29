
import React from 'react'
import codePush from 'react-native-code-push'

let codePushOptions = { installMode: codePush.InstallMode.ON_NEXT_RESUME, checkFrequency: codePush.CheckFrequency.ON_APP_RESUME }

export class CodePushComponent extends React.Component {
	componentDidMount() {
		codePush.sync()
	}

  render () {
    return null
  }
}

CodePushComponent = codePush(codePushOptions)(CodePushComponent)

module.exports = CodePushComponent