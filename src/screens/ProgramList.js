
import React, { Component } from 'react'
import { View } from 'react-native'

import Heading from '../components/Shared/Heading'
import CodePushComponent from '../components/Shared/CodePushComponent'
import ProgramListView from '../components/ProgramList/ProgramListView'
import ProgramSlidingUpPanel from '../components/ProgramList/ProgramSlidingUpPanel'
import GlobalStyles from '../GlobalStyles'
import realm from '../realm'
var RNFS = require('react-native-fs')

export default class ProgramList extends Component {
  constructor (props) {
    super(props)
    this.props.navigator.setStyle({
      navBarHidden: true
    })
    console.log(RNFS.DocumentDirectoryPath)
    this.state = {
      canEdit: this.props.canEdit || false,
      visible: false
    }
  }

  renderHeading () {
    if (this.state.canEdit) {
      return (<Heading heading='Programs' onPressX={() => this.setState({canEdit: !this.state.canEdit})} />)
    } else {
      return (<Heading heading='Programs' onPressBurger={() => this.setState({ visible: !this.state.visible })} />)
    }
  }

  render () {
    return (
      <View style={GlobalStyles.container}>
        <CodePushComponent />
        <View style={GlobalStyles.innerContainer}>
          {this.renderHeading()}
          <ProgramListView
            programs={this.props.programs}
            navigator={this.props.navigator}
            canEdit={this.state.canEdit}
            toggleEdit={() => this.setState({ canEdit: true })} />
        </View>
        <ProgramSlidingUpPanel
          navigator={this.props.navigator}
          onChangeVisibility={(change) => this.setState({ visible: change })}
          visible={this.state.visible}
          toggleEdit={() => this.setState({ canEdit: true })}
        />
      </View>
    )
  }

}

module.exports = ProgramList
